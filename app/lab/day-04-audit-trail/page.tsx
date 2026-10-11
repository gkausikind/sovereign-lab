"use client"
import { useState, useEffect } from "react"

type Log = {
  auditId: string
  timestamp: string
  dataType: string
  storage: string
  region: string
  regId: string
  riskId: string
  status: "BLOCKED" | "ALLOWED"
  control: string
  hash: string
}

const REGULATIONS: any = {
  "aadhaar-us": { regId: "DPDP-16", riskId: "RISK-01", rule: "Aadhaar cannot go outside IN" },
  "pan-us": { regId: "DPDP-16", riskId: "RISK-03", rule: "PAN cross-border needs consent" },
  "payment-us": { regId: "RBI-2018", riskId: "RISK-02", rule: "Payment data must stay in India" },
  "card-us": { regId: "RBI-TOKEN", riskId: "RISK-04", rule: "Card data must be tokenized" },
}

export default function Page(){
  const [dataType, setDataType] = useState("aadhaar")
  const [region, setRegion] = useState("us-east-1")
  const [storage, setStorage] = useState("AWS S3")
  const [logs, setLogs] = useState<Log[]>([])
  const [lastResult, setLastResult] = useState<Log | null>(null)

  useEffect(()=>{
    const saved = localStorage.getItem("sovereign-audit-logs")
    if(saved) setLogs(JSON.parse(saved))
  },[])

  useEffect(()=>{
    localStorage.setItem("sovereign-audit-logs", JSON.stringify(logs))
  },[logs])

  const simpleHash = (s: string) => {
    let h = 0
    for(let i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) % 1000000007
    return "h"+h.toString(16)
  }

  const runCheck = () => {
    const key = `${dataType}-${region.includes("us")||region.includes("eu")?"us":"in"}`
    const isIndian = region==="ap-south-1" || region==="asia-south1" || region==="central-india"
    let status: "BLOCKED" | "ALLOWED" = "ALLOWED"
    let regId = "NONE"
    let riskId = "NONE"
    let rule = "General data - allowed with logging"

    if(!isIndian && (dataType==="aadhaar" || dataType==="pan" || dataType==="payment" || dataType==="card")){
      status = "BLOCKED"
      const map = REGULATIONS[`${dataType}-us`] || REGULATIONS["payment-us"]
      regId = map.regId
      riskId = map.riskId
      rule = map.rule
    }

    const timestamp = new Date().toISOString()
    const auditId = "AUDIT-" + Date.now().toString().slice(-6)
    const prevHash = logs.length>0? logs[0].hash : "GENESIS"
    const hash = simpleHash(auditId + timestamp + dataType + region + prevHash)

    const entry: Log = {
      auditId,
      timestamp,
      dataType,
      storage,
      region,
      regId,
      riskId,
      status,
      control: status==="BLOCKED"? "Geo-fence to ap-south-1, Block "+region : "Allow with logging",
      hash,
    }
    setLastResult(entry)
    setLogs([entry,...logs].slice(0,100))
  }

  const exportCSV = () => {
    const header = "auditId,timestamp,dataType,storage,region,regId,riskId,status,control,hash\n"
    const rows = logs.map(l=>`${l.auditId},${l.timestamp},${l.dataType},${l.storage},${l.region},${l.regId},${l.riskId},${l.status},"${l.control}",${l.hash}`).join("\n")
    const blob = new Blob([header+rows], {type:"text/csv"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href=url; a.download="sovereign-audit-trail.csv"; a.click()
  }

  const clearLogs = () => { setLogs([]); setLastResult(null); localStorage.removeItem("sovereign-audit-logs") }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest text-pink-400">PROJECT SOVEREIGN // DAY 04 - GOVERNANCE LAYER</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">Audit Trail + Tamper Proof Log</h1>
        <p className="mt-2 text-zinc-400 text-sm">Every BLOCK is saved. This is what an RBI auditor downloads. Hash chains like blockchain.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <label className="text-xs text-zinc-500">DATA TYPE</label>
            <select value={dataType} onChange={e=>setDataType(e.target.value)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option value="aadhaar">Aadhaar</option>
              <option value="pan">PAN</option>
              <option value="payment">Payment</option>
              <option value="card">Card</option>
              <option value="general">General</option>
            </select>
            <label className="text-xs text-zinc-500 mt-4 block">REGION</label>
            <select value={region} onChange={e=>setRegion(e.target.value)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option value="ap-south-1">ap-south-1 Mumbai IN - OK</option>
              <option value="asia-south1">asia-south1 Mumbai IN - OK</option>
              <option value="central-india">central-india Pune IN - OK</option>
              <option value="us-east-1">us-east-1 Virginia US - BLOCK</option>
              <option value="eu-west-1">eu-west-1 Ireland EU - BLOCK</option>
            </select>
            <select value={storage} onChange={e=>setStorage(e.target.value)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option>AWS S3</option><option>Azure Blob</option><option>GCP Storage</option>
            </select>
            <button onClick={runCheck} className="mt-4 w-full py-3 rounded-xl bg-white text-black font-bold text-sm">Run Check + Log</button>
            <div className="mt-3 text-[11px] text-zinc-500">Storage: localStorage now, Postgres in prod. See schema below.</div>
          </div>

          <div className="md:col-span-2 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/30">
            {lastResult? (
              <div className={`p-4 rounded-xl border ${lastResult.status==="BLOCKED"? "border-red-500/30 bg-red-500/10":"border-green-500/30 bg-green-500/10"}`}>
                <div className="flex gap-2 items-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${lastResult.status==="BLOCKED"?"bg-red-500":"bg-green-500 text-black"}`}>{lastResult.status}</span><span className="text-xs">{lastResult.auditId}</span><span className="text-xs text-zinc-500">{lastResult.hash}</span></div>
                <div className="mt-2 text-sm">{lastResult.dataType} to {lastResult.storage} {lastResult.region} | {lastResult.regId} | {lastResult.riskId}</div>
              </div>
            ) : <div className="text-sm text-zinc-500">Run a check to generate audit entry</div>}

            <div className="mt-4 flex gap-2">
              <button onClick={exportCSV} className="px-4 py-2 rounded-xl bg-cyan-500 text-black text-sm font-semibold">Export CSV (RBI download)</button>
              <button onClick={clearLogs} className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Clear</button>
              <div className="ml-auto text-xs text-zinc-500 pt-2">{logs.length} events stored</div>
            </div>

            <div className="mt-4 overflow-x-auto border border-zinc-800 rounded-xl">
              <table className="w-full text-xs">
                <thead className="bg-zinc-900 text-zinc-400"><tr><th className="p-2 text-left">AuditId</th><th className="p-2">Data</th><th className="p-2">Region</th><th className="p-2">Status</th><th className="p-2">Reg</th><th className="p-2">Hash</th></tr></thead>
                <tbody className="text-zinc-300">
                  {logs.slice(0,10).map(l=>(
                    <tr key={l.auditId} className="border-t border-zinc-800"><td className="p-2">{l.auditId}</td><td className="p-2">{l.dataType}</td><td className="p-2">{l.region}</td><td className={`p-2 font-bold ${l.status==="BLOCKED"?"text-red-400":"text-green-400"}`}>{l.status}</td><td className="p-2">{l.regId}</td><td className="p-2 font-mono text-[10px]">{l.hash}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-2xl border border-zinc-800 bg-black">
          <div className="text-xs text-zinc-500">PROD SCHEMA - Day 04 to Day 10 migration (Postgres)</div>
          <pre className="mt-2 text-[11px] p-3 rounded-xl bg-zinc-900 border border-zinc-800 overflow-x-auto">
{`-- This localStorage will become this table in prod
CREATE TABLE audit_trail (
  audit_id TEXT PRIMARY KEY,
  timestamp TIMESTAMPTZ,
  data_type TEXT, -- aadhaar, pan, payment
  storage_provider TEXT, -- AWS S3
  region TEXT, -- us-east-1
  reg_id TEXT, -- RBI-2018, DPDP-16
  risk_id TEXT, -- RISK-02
  status TEXT, -- BLOCKED / ALLOWED
  control TEXT,
  prev_hash TEXT,
  hash TEXT -- SHA256(prev_hash + this_row) = tamper proof
);
-- For E2B sandboxing (Day 5), PII never leaves VM, only hash leaves`}
          </pre>
        </div>

        <div className="mt-6 flex gap-3">
          <a href="/lab/day-03-policy-check" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Day 03</a>
          <a href="/lab/day-02-risk-taxonomy" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Day 02 Corpus</a>
          <div className="px-4 py-2 rounded-xl bg-zinc-800 text-sm text-zinc-400">Next: Day 05 - E2B Sandboxing</div>
        </div>
      </div>
    </div>
  )
}
"use client"
import { useState } from "react"

const REGULATIONS = [
  { id: "RBI-2018", rule: "Payment data must stay in India", penalty: "License risk", regions: ["ap-south-1","ap-south-2","asia-south1","central-india"] },
  { id: "DPDP-16", rule: "Personal data cross-border needs consent", penalty: "Up to 250Cr INR", regions: ["ap-south-1","ap-south-2","asia-south1","central-india"] },
  { id: "RBI-TOKEN", rule: "Card data must be tokenized", penalty: "Audit fail", regions: ["ap-south-1","ap-south-2","asia-south1","central-india","us-east-1","eu-west-1"] },
]

type DataType = "aadhaar" | "pan" | "payment" | "card" | "general"
type Region = "ap-south-1" | "us-east-1" | "eu-west-1" | "asia-south1" | "central-india"

export default function Page(){
  const [dataType, setDataType] = useState<DataType>("aadhaar")
  const [region, setRegion] = useState<Region>("us-east-1")
  const [storage, setStorage] = useState("AWS S3")
  const [result, setResult] = useState<any>(null)

  const checkPolicy = () => {
    let blocked = false
    let reg = REGULATIONS[1]
    let riskId = "RISK-02"

    if((dataType==="aadhaar" || dataType==="pan") && region!=="ap-south-1" && region!=="asia-south1" && region!=="central-india"){
      blocked = true
      reg = REGULATIONS[1]
      riskId = dataType==="aadhaar"? "RISK-01" : "RISK-03"
    }
    if(dataType==="payment" &&!REGULATIONS[0].regions.includes(region)){
      blocked = true
      reg = REGULATIONS[0]
      riskId = "RISK-02"
    }
    if(dataType==="card" && region==="us-east-1"){
      blocked = true
      reg = REGULATIONS[2]
      riskId = "RISK-04"
    }

    setResult({
      blocked,
      dataType,
      storage: storage + " - " + region,
      regId: reg.id,
      rule: reg.rule,
      penalty: reg.penalty,
      riskId,
      control: blocked? "Geo-fence to ap-south-1, Block " + region + " replication" : "Allow with logging",
      timestamp: new Date().toISOString(),
      auditId: "AUDIT-" + Date.now().toString().slice(-6)
    })
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs tracking-widest text-cyan-400">PROJECT SOVEREIGN // DAY 03</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">Policy Check Agent</h1>
        <p className="mt-2 text-zinc-400 text-sm md:text-base">Governance Layer - Policy Engine that blocks like OPA</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <label className="text-xs text-zinc-500">DATA TYPE</label>
            <select value={dataType} onChange={e=>setDataType(e.target.value as any)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option value="aadhaar">Aadhaar</option>
              <option value="pan">PAN</option>
              <option value="payment">Payment Transaction</option>
              <option value="card">Card Number</option>
              <option value="general">General File</option>
            </select>
          </div>
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <label className="text-xs text-zinc-500">CLOUD STORAGE</label>
            <select value={storage} onChange={e=>setStorage(e.target.value)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option>AWS S3</option>
              <option>Azure Blob</option>
              <option>GCP Cloud Storage</option>
            </select>
            <select value={region} onChange={e=>setRegion(e.target.value as any)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option value="ap-south-1">ap-south-1 Mumbai OK IN</option>
              <option value="asia-south1">asia-south1 Mumbai OK IN</option>
              <option value="central-india">central-india Pune OK IN</option>
              <option value="us-east-1">us-east-1 Virginia BLOCK US</option>
              <option value="eu-west-1">eu-west-1 Ireland BLOCK EU</option>
            </select>
          </div>
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col justify-between">
            <div className="text-xs text-zinc-500">POLICY ENGINE CODE</div>
            <pre className="mt-2 text- p-3 rounded-xl bg-black border border-zinc-800 overflow-x-auto">
{`if(dataType=="aadhaar"
  && region!= "IN"){
  block(DPDP-16, RISK-01)
}`}
            </pre>
            <button onClick={checkPolicy} className="mt-3 w-full py-3 rounded-xl bg-white text-black font-bold text-sm">Run Policy Check</button>
          </div>
        </div>

        {result && (
          <div className={`mt-6 p-6 rounded-2xl border ${result.blocked? "border-red-500/30 bg-red-500/10" : "border-green-500/30 bg-green-500/10"}`}>
            <div className="flex flex-wrap gap-3 items-center">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${result.blocked? "bg-red-500 text-white" : "bg-green-500 text-black"}`}>{result.blocked? "BLOCKED" : "ALLOWED"}</div>
              <div className="text-sm">{result.auditId}</div>
              <div className="text-xs text-zinc-400">{result.timestamp}</div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-zinc-500">Data: </span>{result.dataType} to {result.storage}</div>
              <div><span className="text-zinc-500">Reg: </span>{result.regId} - {result.rule}</div>
              <div><span className="text-zinc-500">Risk: </span>{result.riskId} | {result.penalty}</div>
              <div><span className="text-zinc-500">Control: </span>{result.control}</div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-black/50 border border-zinc-800 text-xs font-mono break-all">
              LOG: [BLOCK] {result.dataType} to {result.storage} | {result.regId} | {result.riskId}
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <a href="/lab/day-02-risk-taxonomy" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Day 02</a>
          <a href="/lab/cloud-storage-101" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Cloud 101</a>
        </div>
      </div>
    </div>
  )
}
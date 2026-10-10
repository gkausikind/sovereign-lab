"use client"
import risks from "@/data/risk-taxonomy.json"
import { useState } from "react"

export default function Page(){
  const [downloading, setDownloading] = useState(false)
  const download = () => {
    setDownloading(true)
    const headers = ["Risk ID","Family","Description","Reg Ref","Likelihood","Impact","Control","Owner","RAG","Mitigation Status"]
    const rows = risks.map((r:any)=>[r.id,r.family,r.desc,r.reg_id,r.likelihood,r.impact,r.control,"","","Open"])
    const csv = [headers,...rows].map(r=>r.map((c:string)=>`"${c}"`).join(",")).join("\n")
    const blob = new Blob([csv], {type:"text/csv"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href=url; a.download="Risk_Register_CRO_Template.csv"; a.click()
    setTimeout(()=>setDownloading(false),1000)
  }
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest text-cyan-400">PROJECT SOVEREIGN // DAY 02</div>
        <h1 className="mt-2 text-4xl font-bold">Risk Taxonomy + Risk Register</h1>
        <p className="mt-2 text-zinc-400">Every regulation from Day 01 mapped to a CRO-trackable risk. Download = Excel-ready CSV.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={download} className="px-5 py-3 rounded-xl bg-white text-black font-semibold">{downloading? "Downloading..." : "Download Risk Register Excel"}</button>
          <a href="/lab/day-01-regulations" className="px-5 py-3 rounded-xl border border-zinc-700">← Day 01 Corpus</a>
        </div>
        <div className="mt-8 grid gap-3">
          {risks.map((r:any)=>(
            <div key={r.id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50">
              <div className="flex justify-between"><span className="text-xs text-cyan-400">{r.id} • {r.family} → {r.reg_id}</span><span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300">{r.impact}</span></div>
              <div className="font-semibold mt-2">{r.desc}</div>
              <div className="text-xs text-zinc-500 mt-1">Control: {r.control} | Likelihood: {r.likelihood}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
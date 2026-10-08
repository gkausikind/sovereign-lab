"use client"
import { useState } from "react"
import regs from "@/data/regulations.json"

export default function RegulationSearch() {
  const [q, setQ] = useState("")
  const filtered = regs.filter(r => 
    `${r.title} ${r.rule} ${r.keywords.join(" ")} ${r.act}`.toLowerCase().includes(q.toLowerCase())
  )
  return (
    <div>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search: Can I store Aadhaar in US? Is payment data transfer allowed?"
        className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white"
      />
      <div className="mt-6 grid gap-4">
        {filtered.map(r => (
          <div key={r.id} className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50">
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-300">{r.act}</span>
              <span className="px-2 py-1 rounded bg-zinc-800">{r.id}</span>
              <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300">Penalty: {r.penalty}</span>
            </div>
            <h3 className="mt-3 font-semibold text-white">{r.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{r.rule}</p>
            <p className="mt-2 text-xs text-zinc-500">Applies to: {r.applies_to}</p>
            <p className="mt-1 text-xs text-zinc-500">Allowed: {r.allowed_regions.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
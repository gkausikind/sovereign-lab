export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-xs tracking-[0.3em] text-zinc-500">GHOSHK.COM</div>
          <a href="https://github.com/gkausikind/sovereign-lab" target="_blank" className="text-xs text-zinc-500 hover:text-white">【entity-GitHub¦canonical_name=GitHub】 →</a>
        </div>

        <div className="mt-16">
          <div className="text-xs tracking-widest text-cyan-400">PROJECT SOVEREIGN // 30 DAY LAB</div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">Data Sovereignty Control Plane for Banks in India</h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Building the Mike Ross of AI for BFSI. RBI + DPDP Act 2023 + GDPR. No hallucinations. 
            Every day ships a tangible artifact live on ghoshk.com/lab.
          </p>
        </div>

        {/* Lab Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* DAY 01 */}
          <a href="/lab/day-01-regulations" className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-cyan-500/30 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/20">LIVE</span>
              <span className="text-xs text-zinc-500">DAY 01</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-cyan-400 transition">Regulatory Corpus</h3>
            <p className="mt-2 text-sm text-zinc-400">RBI + DPDP Act 2023 + GDPR Art 44-49. Searchable source of truth for all future agents.</p>
            <div className="mt-4 text-xs text-zinc-500">ghoshk.com/lab/day-01-regulations →</div>
          </a>

          {/* DAY 02 */}
          <a href="/lab/day-02-risk-taxonomy" className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-cyan-500/30 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/20">LIVE</span>
              <span className="text-xs text-zinc-500">DAY 02</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-cyan-400 transition">Risk Taxonomy + Risk Register</h3>
            <p className="mt-2 text-sm text-zinc-400">8 risks mapped to Day 01 regs. Downloadable CSV that a bank CRO can actually open.</p>
            <div className="mt-4 text-xs text-zinc-500">ghoshk.com/lab/day-02-risk-taxonomy →</div>
          </a>

          {/* DAY 03 LOCKED */}
          <div className="p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 opacity-60">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-500">NEXT</span>
              <span className="text-xs text-zinc-600">DAY 03</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-zinc-500">Policy Check Agent</h3>
            <p className="mt-2 text-sm text-zinc-600">First agent that auto-blocks "Aadhaar in US S3" using Day 01 + Day 02.</p>
          </div>

          <div className="p-6 rounded-2xl border border-dashed border-zinc-800 bg-transparent">
            <div className="text-xs text-zinc-600">DAY 04 — 30</div>
            <p className="mt-2 text-sm text-zinc-600">Data Lineage → Consent Ledger → Audit Trail → Control Plane. One per day.</p>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-600">
          Built in public at G:\dev\sovereign-lab → 【entity-GitHub¦canonical_name=GitHub】 → Vercel → ghoshk.com. $0 stack. No hallucinations.
        </div>

      </div>
    </div>
  )
}
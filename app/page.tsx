export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-xs tracking-[0.3em] text-zinc-500">GHOSHK.COM</div>
          <a href="https://github.com/gkausikind/sovereign-lab" target="_blank" className="text-xs text-zinc-500 hover:text-white">GitHub →</a>
        </div>

        <div className="mt-16">
          <div className="text-xs tracking-widest text-cyan-400">PROJECT SOVEREIGN // 30 DAY LAB</div>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">Data Sovereignty Control Plane for Banks in India</h1>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Building the EASY COMPLIANCE check framework! RBI + DPDP Act 2023 + GDPR. No hallucinations. 
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

          {/* DAY 03 - LIVE NOW */}
          <a href="/lab/day-03-policy-check" className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-cyan-500/30 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/20">LIVE</span>
              <span className="text-xs text-zinc-500">DAY 03 • GOVERNANCE LAYER</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-cyan-400 transition">Policy Check Agent</h3>
            <p className="mt-2 text-sm text-zinc-400">TS function that blocks Aadhaar/PAN/Payment to us-east-1/eu-west-1. Maps to RBI-2018 + DPDP-16 + RISK-02. OPA-like engine.</p>
            <div className="mt-4 text-xs text-zinc-500">ghoshk.com/lab/day-03-policy-check →</div>
          </a>

          {/* DAY 04 - LIVE NOW */}
          <a href="/lab/day-04-audit-trail" className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-pink-500/30 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/20">LIVE</span>
              <span className="text-xs text-zinc-500">DAY 04 • GOVERNANCE LAYER</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-pink-400 transition">Audit Trail & Tamper-Proof Log</h3>
            <p className="mt-2 text-sm text-zinc-400">Every BLOCK saved with auditId, timestamp, regId, riskId, hash chain. Export CSV for RBI auditor.</p>
            <div className="mt-4 text-xs text-zinc-500">ghoshk.com/lab/day-04-audit-trail →</div>
          </a>

          {/* DAY 05 - LIVE NOW */}
          <a href="/lab/day-05-sandboxing" className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-orange-500/30 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/20">LIVE</span>
              <span className="text-xs text-zinc-500">DAY 05 • SANDBOXING LAYER</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-orange-400 transition">E2B Sandboxing - Firecracker microVMs</h3>
            <p className="mt-2 text-sm text-zinc-400">PII never leaves VM. Blocks fetch, fs, console.log(data). Only hash leaves.</p>
            <div className="mt-4 text-xs text-zinc-500">ghoshk.com/lab/day-05-sandboxing →</div>
          </a>


          {/* CONCEPT LAB */}
          <a href="/lab/cloud-storage-101" className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 hover:border-zinc-700 transition">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">CONCEPT</span>
              <span className="text-xs text-zinc-500">DATA LAYER</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-blue-400 transition">Cloud Storage 101</h3>
            <p className="mt-2 text-sm text-zinc-400">S3 vs GCS vs Azure Blob. ap-south-1 vs us-east-1. Where bank data physically lives.</p>
            <div className="mt-4 text-xs text-zinc-500">ghoshk.com/lab/cloud-storage-101 →</div>
          </a>

         

        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 text-xs text-zinc-600">
          Built in public at G:\dev\sovereign-lab → GitHub → Vercel → ghoshk.com. $0 stack. No hallucinations.
        </div>

      </div>
    </div>
  )
}
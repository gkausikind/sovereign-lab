import RegulationSearch from "@/components/RegulationSearch"

export default function Day01() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <span className="text-xs text-cyan-400 tracking-widest">PROJECT SOVEREIGN // DAY 01</span>
          <h1 className="mt-2 text-4xl font-bold text-white">Regulatory Corpus</h1>
          <p className="mt-2 text-zinc-400">RBI + DPDP Act 2023 + GDPR Art 44-49. Searchable. No hallucinations. Source of truth for all future agents.</p>
        </div>
        <RegulationSearch />
        <div className="mt-12 p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-500">
          Tangible Outcome: 10 curated rules, searchable, deployed. Tomorrow this becomes the knowledge base for our Data Sovereignty Guard agent.
        </div>
      </div>
    </div>
  )
}
export default function Page(){
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-widest text-cyan-400">PROJECT SOVEREIGN // CONCEPT LAB</div>
        <h1 className="mt-2 text-4xl font-bold">Cloud Storage 101 — What banks actually use</h1>
        <p className="mt-3 text-zinc-400 max-w-3xl">S3 is not "【entity-AWS¦canonical_name=AWS】". It's one type of storage. Banks use 4 types across 3 clouds. You use them daily without knowing.</p>

        {/* Diagram 1 - Types */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="text-xs text-amber-300">OBJECT STORAGE</div>
            <div className="mt-2 font-bold">S3 / Blob / GCS</div>
            <div className="mt-2 text-sm text-zinc-400">Files as objects. Unlimited. Cheapest. For data lakes, backups, Aadhaar scans, statements.</div>
            <div className="mt-3 text-xs text-zinc-500">When: Bank stores 10Cr customer KYC images<br/>Region matters: ap-south-1 = India</div>
          </div>
          <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="text-xs text-cyan-300">BLOCK STORAGE</div>
            <div className="mt-2 font-bold">EBS / 【entity-Azure¦canonical_name=Azure】 Disk</div>
            <div className="mt-2 text-sm text-zinc-400">Hard disk attached to a server. Fast. For databases.</div>
            <div className="mt-3 text-xs text-zinc-500">When: Core Banking DB runs on it<br/>You never see it</div>
          </div>
          <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/50">
            <div className="text-xs text-emerald-300">FILE STORAGE</div>
            <div className="mt-2 font-bold">EFS / 【entity-Azure¦canonical_name=Azure】 Files</div>
            <div className="mt-2 text-sm text-zinc-400">Shared folder for many servers. For shared reports.</div>
            <div className="mt-3 text-xs text-zinc-500">When: 10 risk apps read same file</div>
          </div>
        </div>

        {/* Comparison */}
        <h2 className="mt-12 text-2xl font-bold">【entity-AWS¦canonical_name=AWS】 vs 【entity-Azure¦canonical_name=Azure】 vs GCP — Same thing, different name</h2>
        <div className="mt-4 overflow-x-auto border border-zinc-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900 text-zinc-400 text-xs"><tr><th className="p-3 text-left">Type</th><th className="p-3">【entity-AWS¦canonical_name=AWS】</th><th className="p-3">【entity-Azure¦canonical_name=Azure】</th><th className="p-3">Google</th><th className="p-3">Others</th></tr></thead>
            <tbody className="text-zinc-300">
              <tr className="border-t border-zinc-800"><td className="p-3 font-semibold">Object (your focus)</td><td className="p-3 text-center">S3</td><td className="p-3 text-center">Blob Storage</td><td className="p-3 text-center">Cloud Storage</td><td className="p-3 text-center">【entity-IBM¦canonical_name=IBM】, 【entity-Oracle¦canonical_name=Oracle】</td></tr>
              <tr className="border-t border-zinc-800"><td className="p-3">Block</td><td className="p-3 text-center">EBS</td><td className="p-3 text-center">Managed Disks</td><td className="p-3 text-center">Persistent Disk</td><td className="p-3 text-center">-</td></tr>
              <tr className="border-t border-zinc-800"><td className="p-3">Archive (cheap, slow)</td><td className="p-3 text-center">Glacier</td><td className="p-3 text-center">Archive</td><td className="p-3 text-center">Archive</td><td className="p-3 text-center">-</td></tr>
              <tr className="border-t border-zinc-800"><td className="p-3">Region example IN</td><td className="p-3 text-center text-cyan-400">ap-south-1 Mumbai</td><td className="p-3 text-center text-cyan-400">Central India Pune</td><td className="p-3 text-center text-cyan-400">asia-south1 Mumbai</td><td className="p-3 text-center">-</td></tr>
            </tbody>
          </table>
        </div>

        {/* Who uses knowingly vs unknowingly */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
            <div className="text-sm font-bold text-green-300">Uses KNOWINGLY — Developer / Bank IT</div>
            <ul className="mt-3 text-sm text-zinc-300 list-disc ml-5 space-y-1">
              <li>CTO: "Store KYC in S3 ap-south-1, block cross-region replication"</li>
              <li>Data Engineer: "Data lake on S3 for 5 years of transactions"</li>
              <li>DevOps: "Backup DB daily to Glacier"</li>
              <li>App Team: "Host ghoshk.com images on S3 + CloudFront"</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
            <div className="text-sm font-bold text-red-300">Uses UNKNOWINGLY — You, Me, Customer</div>
            <ul className="mt-3 text-sm text-zinc-300 list-disc ml-5 space-y-1">
              <li>You upload PAN to Jupiter app → it goes to S3 Mumbai</li>
              <li>You watch 【entity-Netflix¦canonical_name=Netflix】 → video served from S3 + CloudFront</li>
              <li>You get HDFC statement PDF → generated from S3</li>
              <li>WhatsApp backup → S3 / GCS behind the scenes</li>
            </ul>
            <div className="mt-3 text-xs text-zinc-500">Risk: Customer thinks data is "in app", but it's in us-east-1.</div>
          </div>
        </div>

        {/* Flow diagram */}
        <h2 className="mt-12 text-2xl font-bold">Simple flow — where your Aadhaar goes</h2>
        <div className="mt-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 font-mono text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded bg-zinc-800">User uploads in App</span>
            <span>→</span>
            <span className="px-3 py-1 rounded bg-cyan-900/50 border border-cyan-700">API in Mumbai</span>
            <span>→</span>
            <span className="px-3 py-1 rounded bg-amber-900/50 border border-amber-700">S3 Bucket ap-south-1 ✅ RBI OK</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 opacity-60">
            <span className="px-3 py-1 rounded bg-zinc-800">Same upload</span>
            <span>→</span>
            <span className="px-3 py-1 rounded bg-cyan-900/50 border border-cyan-700">API</span>
            <span>→</span>
            <span className="px-3 py-1 rounded bg-red-900/50 border border-red-700">S3 Bucket us-east-1 ❌ Blocked by your RISK-02</span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <a href="/lab/day-01-regulations" className="px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold">Day 01 Corpus</a>
          <a href="/lab/day-02-risk-taxonomy" className="px-4 py-2 rounded-xl border border-zinc-700 text-sm">Day 02 Risks</a>
          <span className="px-4 py-2 rounded-xl border border-dashed border-zinc-700 text-sm text-zinc-500">Next: You will map workflows to these buckets</span>
        </div>
      </div>
    </div>
  )
}
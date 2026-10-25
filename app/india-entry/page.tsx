
"use client";
import { useState } from "react";
import compliance from "@/data/compliance.json";

const qaSteps = [
  { id: 1, title: "Entry Mode", question: "How will you enter India?", options: ["Wholly Owned Subsidiary - Pvt Ltd", "LLP", "Branch Office", "Liaison Office"] },
  { id: 2, title: "Sector & FDI", question: "What is primary activity?", options: ["Software / SaaS", "Manufacturing", "Trading", "Financial Services"] },
  { id: 3, title: "Revenue", question: "Will you invoice in India in first year?", options: ["Yes, B2B in India", "Yes, export only", "No revenue yet"] },
  { id: 4, title: "Hiring", question: "Hiring plan in 12 months?", options: ["0", "1-9 employees", "10-19 employees", "20+ employees"] },
  { id: 5, title: "Data & Related Party", question: "Will you store Indian personal data / transact with parent?", options: ["Yes, personal data", "Yes, related party", "No"] },
];

export default function IndiaEntry() {
  const [answers, setAnswers] = useState<Record<number,string>>({1:"Wholly Owned Subsidiary - Pvt Ltd"});
  const [chatInput, setChatInput] = useState("");
  const [chat, setChat] = useState<any[]>([
    { role:"ai", text:"I answer only from the compliance corpus. Ask: Can we store Aadhaar in US S3?", cites:["IN-DATA-01"] }
  ]);
  const [loading, setLoading] = useState(false);
  const sector = answers[2] || "";
  const hiring = answers[4] || "";
  const answeredCount = Object.keys(answers).length;
  const isFinancial = sector === "Financial Services";
  const isBranch = answers[1] === "Branch Office";
  const timeline = [
    { phase:"Pre-Incorporation", days:"Day 0-15", desc: isBranch ? "RBI approval via AD bank - BLOCKED until approval" : "Resident Director, Name, FDI check" },
    { phase:"SPICe+", days:"Day 15-30", desc:"MCA, PAN, TAN, EPFO, ESIC" },
    { phase:"Post-Incorporation", days: isFinancial ? "Day 30-180 (+90 days for RBI licence)" : "Day 30-180", desc: isFinancial ? "GST, Bank, FC-GPR, INC-20A + RBI NBFC check" : "GST, Bank, FC-GPR, INC-20A" },
    { phase:"Annual", days:"Ongoing", desc:"AOC-4, MGT-7, FLA July 15" },
  ];

  async function askAI(){
    if(!chatInput.trim()) return;
    const q = chatInput; setChatInput(""); setChat(c=>[...c,{role:"user",text:q}]); setLoading(true);
    try{
      const res = await fetch("/api/india-chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:q, answers})});
      const data = await res.json();
      setChat(c=>[...c,{role:"ai",text:data.answer, cites:data.cites||[]}]);
    }catch{ setChat(c=>[...c,{role:"ai",text:"Network error - could not reach /api/india-chat. Check if npm run dev is running.", cites:[]}]) }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b bg-[#0F2040] text-white px-6 py-4 flex justify-between">
        <div><div className="text-xs tracking-widest text-[#C5A880]">GHOSHK.COM // INDIA ENTRY</div><h1 className="text-2xl font-bold">India Entry Compliance Advisor</h1><p className="text-sm text-slate-300">By GhoshK • Audit Ready • Source Cited • Corpus v1.2 Oct 2026</p></div>
        <div className="text-right"><div className="text-xs text-slate-300">Corpus v1.2 • Oct 2026</div></div>
      </header>
      <div className="grid lg:grid-cols-[32%_38%_30%] gap-0">
        <div className="p-6 border-r">
          <div className="flex items-center justify-between"><h2 className="font-bold">Mandatory Assessment</h2><div className="flex flex-col items-end"><span className="bg-[#0F2040] text-white px-3 py-1 rounded-full text-xs font-semibold">Assessment Questionnaire {answeredCount}/5</span><span className="text-[11px] text-slate-500 mt-1">{answeredCount*20}% complete</span></div></div><div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 mb-4"><div className="bg-[#C5A880] h-1.5 rounded-full" style={{width:`${answeredCount*20}%`}}></div></div>
          <p className="text-sm text-slate-500 mb-4">Answer all 5. Follow-ups appear based on your answers.</p>
          {qaSteps.map(s=>(
            <div key={s.id} className="mb-5 p-4 rounded-xl border">
              <div className="text-xs text-[#C5A880] font-bold">{s.id}. {s.title}</div>
              <div className="font-semibold mt-1">{s.question}</div>
              <div className="flex flex-wrap gap-2 mt-2">{s.options.map(o=>(
                <button key={o} onClick={()=>setAnswers(a=>({...a,[s.id]:o}))} className={`px-3 py-1.5 rounded-full text-xs border ${answers[s.id]===o?"bg-[#0F2040] text-white":"bg-white"}`}>{o}</button>
              ))}</div>
              {s.id===2 && isFinancial && <div className="mt-3 bg-amber-50 border border-amber-200 p-3 rounded text-xs"><b>Branching QA triggered:</b> Will you handle client funds? → RBI NBFC / PPI licence check becomes mandatory. Timeline +90 days.</div>}
              {s.id===4 && hiring==="20+ employees" && <div className="mt-3 bg-blue-50 border p-3 rounded text-xs"><b>EPFO triggered:</b> IN-LAB-01 now mandatory.</div>}
              {s.id===1 && isBranch && <div className="mt-3 bg-red-50 border border-red-200 p-3 rounded text-xs"><b>Branch Office:</b> RBI approval required before revenue. Middle graph will show RBI as BLOCKED.</div>}
            </div>
          ))}
        </div>
        <div className="p-6 bg-slate-50">
          <h2 className="font-bold">Graphical Compliance View <span className="text-xs font-normal bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-2">Dynamic</span></h2>
          <p className="text-xs text-slate-500 mt-1">Changes when you answer Left side. Try changing Sector to Financial Services or Entry Mode to Branch Office.</p>
          <div className="mt-4 space-y-3">
            {timeline.map((t,i)=>(
              <div key={i} className={`bg-white p-4 rounded-xl border flex justify-between ${t.phase==="Pre-Incorporation" && isBranch ? "border-red-300 bg-red-50" : ""}`}><div><div className="font-semibold">{t.phase}</div><div className="text-xs text-slate-500">{t.desc}</div></div><span className="text-xs bg-slate-100 px-2 py-1 rounded h-fit">{t.days}</span></div>
            ))}
          </div>
          <div className="mt-6 bg-white p-4 rounded-xl border"><h3 className="font-bold text-sm">Dependency Graph</h3><div className="flex gap-2 mt-3 flex-wrap">{["MCA","RBI","GST","EPFO","FEMA"].map(n=><span key={n} className={`px-3 py-1 rounded-full text-xs border ${(n==="RBI" && (isFinancial || isBranch))?"bg-red-100 border-red-300 text-red-700":"bg-slate-100"}`}>{n} {(n==="RBI" && (isFinancial || isBranch))?"• BLOCKED":""}</span>)}</div><p className="text-xs mt-2 text-slate-500">If RBI blocked, downstream revenue is blocked. This updates from your answers.</p></div>
          <div className="mt-4 grid grid-cols-2 gap-3">{compliance.slice(0,6).map((r:any)=>(<div key={r.id} className="bg-white p-3 rounded border"><div className="text-xs text-[#C5A880] font-bold">{r.id} • {r.authority}</div><div className="font-semibold text-sm">{r.title}</div><div className="text-xs text-slate-500">{r.rule.slice(0,80)}...</div></div>))}</div>
        </div>
        <div className="p-6 border-l flex flex-col bg-white">
          <h2 className="font-bold">AI Co-pilot <span className="text-xs font-normal bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full ml-2">Grounded</span></h2>
          <p className="text-xs text-slate-500">Answers only from corpus. Cites rule ID for every claim. By GhoshK.</p>
          <div className="flex-1 mt-4 space-y-3 overflow-y-auto max-h-[520px]">
            {chat.map((m,i)=>(<div key={i} className={`p-3 rounded-xl text-sm ${m.role==="ai"?"bg-slate-100":"bg-[#0F2040] text-white ml-8"}`}>{m.text}{m.cites&&<div className="flex gap-1 mt-2">{m.cites.map((c:string)=><span key={c} className="text-[10px] bg-white border px-2 py-0.5 rounded-full">{c}</span>)}</div>}</div>))}
            {loading && <div className="text-xs text-slate-400">AI thinking...</div>}
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">{["What is FC-GPR deadline?","Do I need GST?","Can we store Aadhaar in US?"].map(s=><button key={s} onClick={()=>{setChatInput(s)}} className="text-xs border px-2 py-1 rounded-full">{s}</button>)}</div>
          <div className="flex gap-2 mt-3"><input value={chatInput} onChange={e=>setChatInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&askAI()} placeholder="Ask compliance question..." className="flex-1 border rounded-xl px-3 py-2 text-sm"/><button onClick={askAI} className="bg-[#0F2040] text-white px-4 rounded-xl text-sm">Ask</button></div>
          <p className="text-[11px] text-slate-400 mt-2">Not legal advice. Validate with GhoshK team. Corpus v1.2, sources: MCA, RBI, CBIC.</p>
        </div>
      </div>
    </div>
  );
}

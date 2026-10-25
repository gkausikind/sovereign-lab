
import { NextResponse } from "next/server";
import compliance from "@/data/compliance.json";

export async function POST(req: Request) {
  const { question, answers } = await req.json();
  // 1. Retrieval: simple keyword match = deterministic, no hallucination
  const q = question.toLowerCase();
  const hits = (compliance as any[]).filter(r =>
    q.includes(r.title.toLowerCase().split(" ")[0]) ||
    r.rule.toLowerCase().includes(q.split(" ")[0]) ||
    q.includes("aadhaar") && r.id==="IN-DATA-01" ||
    q.includes("fc-gpr") && r.id==="IN-FDI-01" ||
    q.includes("gst") && r.id==="IN-TAX-01"
  ).slice(0,3);

  const context = hits.length ? hits.map(h=>`${h.id}: ${h.title} - ${h.rule} [${h.law_ref}, ${h.authority}]`).join("\n") : (compliance as any[]).slice(0,5).map(h=>`${h.id}: ${h.title} - ${h.rule}`).join("\n");

  // 2. LLM generation - grounded
  const apiKey = process.env.GEMINI_API_KEY;
  if(!apiKey){
    return NextResponse.json({ answer: hits.length ? `Based on corpus: ${hits[0].rule}. Law: ${hits[0].law_ref}. Deadline: ${hits[0].deadline}.` : "Not in corpus - needs CA review.", cites: hits.map(h=>h.id) });
  }
  const prompt = `You are a compliance advisor for CA firms. Answer ONLY using this context. Cite rule ID for every claim. If not in context, say 'Not in corpus - needs CA review'.\nContext:\n${context}\n\nUser context: ${JSON.stringify(answers)}\nQuestion: ${question}`;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "AI unavailable - see deterministic rule above.";
  return NextResponse.json({ answer: text, cites: hits.map(h=>h.id) });
}

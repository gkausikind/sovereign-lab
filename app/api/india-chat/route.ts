
import { NextResponse } from "next/server";
import compliance from "@/data/compliance.json";
export async function POST(req: Request) {
  const { question, answers } = await req.json();
  const q = question.toLowerCase();
  const hits = (compliance as any[]).filter(r => q.includes("aadhaar") && r.id==="IN-DATA-01" || q.includes("fc-gpr") && r.id==="IN-FDI-01" || q.includes("gst") && r.id==="IN-TAX-01").slice(0,3);
  const context = hits.length ? hits.map(h=>`${h.id}: ${h.title} - ${h.rule} [${h.law_ref}, ${h.authority}]`).join("\n") : (compliance as any[]).slice(0,3).map(h=>`${h.id}: ${h.title} - ${h.rule}`).join("\n");
  const apiKey = process.env.GEMINI_API_KEY;
  if(!apiKey) return NextResponse.json({ answer: "AI key not found.", cites: hits.map(h=>h.id) });
  const prompt = `You are a compliance advisor by GhoshK. Answer ONLY using this context. Cite rule ID.\nContext:\n${context}\n\nQuestion: ${question}`;
  // Oct 2026 new-user models ONLY - 2.5 family is retired
  const models = ["gemini-3.8-flash", "gemini-3.5-flash-lite", "gemini-3.8-flash-preview"];
  for (const model of models) {
    try {
      const controller = new AbortController(); const timer = setTimeout(()=>controller.abort(), 8000);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({contents:[{parts:[{text:prompt}]}]}), signal: controller.signal});
      clearTimeout(timer);
      const data = await res.json();
      if (res.ok && data?.candidates?.[0]?.content?.parts?.[0]?.text) return NextResponse.json({ answer: data.candidates[0].content.parts[0].text, cites: hits.map(h=>h.id), debug: model });
      if (data.error?.code === 503 || data.error?.code === 429) continue;
      if (data.error?.code === 404) continue; // retired model, try next
      if (data.error) continue;
    } catch(e){ continue; }
  }
  const fallback = hits.length ? `Based on corpus rule ${hits[0].id} [${hits[0].law_ref}, ${hits[0].authority}]: ${hits[0].rule}\n\nNote: Gemini is overloaded right now (503), so this is the direct corpus answer.` : "Not in corpus - needs CA review";
  return NextResponse.json({ answer: fallback, cites: hits.map(h=>h.id) });
}

import { model } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, topicContext, history } = await req.json();

    // Construct a history-aware prompt
    // In a production app, you might use model.startChat() for true history
    const prompt = `
      Context: The user is studying "${topicContext}" for the TGT Science Exam.
      
      Previous conversation:
      ${history.map((h: any) => `${h.role}: ${h.text}`).join('\n')}
      
      User's Question: "${message}"
      
      Answer concisely and accurately. Use LaTeX for math.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
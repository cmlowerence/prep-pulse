import { model } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, subject } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `
      You are an expert tutor for the TGT (Trained Graduate Teacher) Science Exam.
      
      Create a comprehensive, structured study guide for the topic: "${topic}" (Subject: ${subject}).
      
      Follow this strict format:
      1. **Introduction**: Brief overview (2-3 sentences).
      2. **Core Concepts**: Detailed explanation. Use bullet points.
      3. **Key Formulas/Reactions**: STRICTLY use LaTeX format for math/chemistry. 
         - Inline math: $E=mc^2$
         - Block math: $$ F = ma $$
      4. **Exam Tips**: Important notes or common pitfalls.
      5. **Video Resources**: Provide 2-3 search queries for YouTube that would yield good results for this topic. Format them as a list.

      Make the tone encouraging but academic. Use Markdown for formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content. Please try again." },
      { status: 500 }
    );
  }
}
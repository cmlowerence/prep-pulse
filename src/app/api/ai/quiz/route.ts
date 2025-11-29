import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { generateQuizJSON } from "@/lib/gemini";
import { rateLimit } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const user = await requireServerUser();

    if (!rateLimit(`quiz:${user.id}`, 10, 3600000)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    const { topicName, difficulty } = await req.json();

    if (!topicName) {
      return NextResponse.json({ error: "Topic required" }, { status: 400 });
    }

    const quiz = await generateQuizJSON(topicName, difficulty || "medium");

    return NextResponse.json(quiz);

  } catch (error) {
    console.error("Quiz API Error:", error);
    return NextResponse.json({ error: "Quiz generation failed" }, { status: 500 });
  }
}

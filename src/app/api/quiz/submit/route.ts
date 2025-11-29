import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { updateUserProgress } from "@/lib/progress-service";

export async function POST(req: Request) {
  try {
    const user = await requireServerUser();
    const { topicId, score, totalQuestions } = await req.json();

    if (!topicId || score === undefined) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await updateUserProgress(user.id, topicId, score, totalQuestions);

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}

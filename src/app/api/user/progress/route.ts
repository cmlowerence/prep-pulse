import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { getUserProgress } from "@/lib/progress-service";

export async function GET() {
  try {
    const user = await requireServerUser();
    const progress = await getUserProgress(user.id);
    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

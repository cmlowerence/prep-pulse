import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { createAndStoreStudyGuide } from "@/lib/pdf-service";
import { rateLimit } from "@/lib/rateLimiter";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const user = await requireServerUser();
    
    // Rate Limiting: 5 requests per hour
    if (!rateLimit(`gen:${user.id}`, 5, 3600000)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait." }, 
        { status: 429 }
      );
    }

    const { topicId, topicName } = await req.json();

    if (!topicId || !topicName) {
      return NextResponse.json({ error: "Missing topic data" }, { status: 400 });
    }

    logger.info(`Generating guide for ${topicName} by user ${user.id}`);

    const result = await createAndStoreStudyGuide(user.id, topicId, topicName);

    return NextResponse.json(result);

  } catch (error) {
    logger.error("API Generate Error", error);
    return NextResponse.json(
      { error: "Failed to generate study material" }, 
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { continueChat } from "@/lib/chat-service";
import { rateLimit } from "@/lib/rateLimiter";

export async function POST(req: Request) {
  try {
    const user = await requireServerUser();

    // Rate Limiting: 20 messages per minute
    if (!rateLimit(`chat:${user.id}`, 20, 60000)) {
      return NextResponse.json({ error: "Too many messages" }, { status: 429 });
    }

    const { history, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const responseText = await continueChat(history || [], message);

    return NextResponse.json({ response: responseText });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}

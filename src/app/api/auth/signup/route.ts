import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    // Sync Clerk user to local Postgres
    await db.query(`
      INSERT INTO users (clerk_id, email)
      VALUES ($1, $2)
      ON CONFLICT (clerk_id) DO NOTHING
    `, [userId, email]);

    logger.info(`User synced: ${userId}`);

    return NextResponse.json({ success: true });

  } catch (error) {
    logger.error("Signup Sync Error", error);
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}

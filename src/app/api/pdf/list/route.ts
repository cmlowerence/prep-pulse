import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const user = await requireServerUser();

    const result = await db.query(`
      SELECT * FROM generated_pdfs 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `, [user.id]);

    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

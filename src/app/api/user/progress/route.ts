import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sql } from "@/lib/db";

// GET: Fetch user's progress
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Assuming a 'progress' table exists. 
    // If using JSONB in Postgres, we can store the whole object.
    const result = await sql`
      SELECT data FROM progress WHERE user_id=${session.user.id}
    `;
    
    return NextResponse.json(result.rows[0]?.data || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch progress" }, { status: 500 });
  }
}

// POST: Save user's progress
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // Upsert logic (Insert if new, Update if exists)
    await sql`
      INSERT INTO progress (user_id, data)
      VALUES (${session.user.id}, ${JSON.stringify(data)})
      ON CONFLICT (user_id) 
      DO UPDATE SET data = ${JSON.stringify(data)};
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save progress" }, { status: 500 });
  }
}
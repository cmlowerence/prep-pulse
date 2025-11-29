import { NextResponse } from "next/server";
import { requireServerUser } from "@/lib/auth";
import { blobStorage } from "@/lib/vercel-blob";
import { db } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    const user = await requireServerUser();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const fileUrl = searchParams.get("url");

    if (!id || !fileUrl) {
      return NextResponse.json({ error: "Missing ID or URL" }, { status: 400 });
    }

    // Security check: ensure this PDF belongs to the user
    const check = await db.query(
      "SELECT id FROM generated_pdfs WHERE id = $1 AND user_id = $2",
      [id, user.id]
    );

    if (check.rowCount === 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete from Blob
    await blobStorage.delete(fileUrl);

    // Delete from DB
    await db.query("DELETE FROM generated_pdfs WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

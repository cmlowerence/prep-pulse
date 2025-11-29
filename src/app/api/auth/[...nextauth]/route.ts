import { NextResponse } from "next/server";

// This route is a placeholder. 
// Authentication is handled by Clerk (src/middleware.ts).
// If you revert to NextAuth, uncomment and configure the handler here.

export async function GET() {
  return NextResponse.json(
    { message: "Authentication is managed by Clerk. This route is inactive." },
    { status: 501 } // Not Implemented
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "Authentication is managed by Clerk. This route is inactive." },
    { status: 501 }
  );
}

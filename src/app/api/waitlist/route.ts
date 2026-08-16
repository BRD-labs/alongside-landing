import { NextResponse } from "next/server";
import { ensureWaitlistTable, getSql } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    console.error("Waitlist signup failed: no DATABASE_URL/POSTGRES_URL configured");
    return NextResponse.json(
      { error: "Server is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  try {
    await ensureWaitlistTable();
    const sql = getSql();
    await sql`
      INSERT INTO waitlist_emails (email)
      VALUES (${email})
      ON CONFLICT (email) DO NOTHING
    `;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save waitlist email", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

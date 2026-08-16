import { neon } from "@neondatabase/serverless";

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error("Missing DATABASE_URL/POSTGRES_URL environment variable");
  }
  return neon(databaseUrl);
}

export async function ensureWaitlistTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist_emails (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

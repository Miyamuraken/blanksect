import { Pool } from "pg";

let pool;

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("railway")
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }
  return pool;
}

export async function POST(request) {
  try {
    const { email, source } = await request.json();

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return Response.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const db = getPool();
    if (!db) {
      console.warn(
        "DATABASE_URL not set — subscriber not saved:",
        email,
        source
      );
      return Response.json(
        { error: "Signup isn't connected yet. Try again shortly." },
        { status: 503 }
      );
    }

    await db.query(
      `INSERT INTO subscribers (email, source)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING`,
      [email.toLowerCase().trim(), source || "general"]
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return Response.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}

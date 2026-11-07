import { NextRequest, NextResponse } from "next/server";
import { BASE_KEYS } from "@/data/keys";
import { COUNTRIES } from "@/lib/countries";
import { hasRedis, redis } from "@/lib/redis";

export const dynamic = "force-dynamic";

const HASH = "nk:keys";
const RATE_LIMIT = 20; // প্রতি IP প্রতি ঘন্টায় সর্বোচ্চ key
const mem = new Map<string, string>(); // Redis না থাকলে (শুধু লোকাল ডেভ) অস্থায়ী স্টোর
const baseSet = new Set(BASE_KEYS.map((k) => k.code));
const countrySet = new Set(COUNTRIES.map((c) => c.code));

type Row = { code: string; country: string; ts: number };

async function readAll(): Promise<Row[]> {
  const entries: [string, string][] = [];
  if (hasRedis) {
    const flat = await redis<string[]>(["HGETALL", HASH]);
    for (let i = 0; i < (flat?.length ?? 0); i += 2) entries.push([flat[i], flat[i + 1]]);
  } else {
    entries.push(...mem.entries());
  }
  const rows: Row[] = [];
  for (const [code, v] of entries) {
    try {
      const o = JSON.parse(v);
      rows.push({ code, country: o.country, ts: o.ts });
    } catch {}
  }
  return rows.sort((a, b) => b.ts - a.ts);
}

export async function GET() {
  try {
    return NextResponse.json({ keys: await readAll(), persistent: hasRedis }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: { code?: string; country?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "format" }, { status: 400 }); }

  const code = String(body.code ?? "").trim();
  const country = String(body.country ?? "").trim().toUpperCase();
  if (!/^NG-[A-Za-z0-9]{8}$/.test(code)) return NextResponse.json({ error: "format" }, { status: 400 });
  if (!countrySet.has(country)) return NextResponse.json({ error: "country" }, { status: 400 });
  if (baseSet.has(code)) return NextResponse.json({ error: "dup" }, { status: 409 });

  try {
    if (hasRedis) {
      const ip = (req.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
      const rk = `nk:rl:${ip}:${Math.floor(Date.now() / 3_600_000)}`;
      const n = await redis<number>(["INCR", rk]);
      if (n === 1) await redis(["EXPIRE", rk, 3700]);
      if (n > RATE_LIMIT) return NextResponse.json({ error: "rate" }, { status: 429 });
    }

    const row = { country, ts: Date.now() };
    const value = JSON.stringify(row);
    // HSETNX: আগে থাকলে কিছুই বদলায় না। কোনো delete/overwrite রুট নেই, তাই সংখ্যা শুধু বাড়ে।
    let added: boolean;
    if (hasRedis) added = (await redis<number>(["HSETNX", HASH, code, value])) === 1;
    else { added = !mem.has(code); if (added) mem.set(code, value); }

    if (!added) return NextResponse.json({ error: "dup" }, { status: 409 });
    return NextResponse.json({ ok: true, key: { code, ...row } });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

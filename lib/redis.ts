// Upstash Redis (REST). Vercel Marketplace এর Upstash/KV দুই ধরনের env নামই কাজ করে।
const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const hasRedis = Boolean(URL_ && TOKEN);

export async function redis<T = unknown>(cmd: (string | number)[]): Promise<T> {
  const r = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result as T;
}

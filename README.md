# NusukKey Pro

Next.js 14 + TypeScript + Framer Motion. বাংলা / English.

## Run
    npm install
    npm run dev

## Bangla font
`public/fonts/bangla.ttf` নামে আপনার ফন্ট রাখুন (অন্য নাম হলে `app/globals.css` এর @font-face বদলান)।

## Add more keys
`data/keys.ts` এর RAW এ প্রতি লাইনে একটি key, দেশ দিতে চাইলে শেষে কোড: `NG-abc12345 BD`

## Deploy
Push to GitHub → import in Vercel.

## Shared, permanent user keys (Upstash Redis)
ব্যবহারকারীর দেওয়া key সবার জন্য স্থায়ীভাবে সেভ হয়। এর জন্য Redis লাগবে:
1. Vercel → আপনার প্রজেক্ট → **Storage** → **Marketplace** → **Upstash Redis** (ফ্রি প্ল্যান) → Create/Connect
2. এতে `UPSTASH_REDIS_REST_URL` ও `UPSTASH_REDIS_REST_TOKEN` (বা `KV_REST_API_URL/TOKEN`) নিজে থেকেই যোগ হবে
3. **Redeploy** করুন

Redis সেট না থাকলে (লোকাল ডেভ) key শুধু সার্ভার চলা পর্যন্ত থাকে।
কোনো delete রুট নেই, তাই মোট key সংখ্যা শুধু বাড়ে।

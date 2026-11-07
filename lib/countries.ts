export type Country = { code: string; en: string; bn: string };

export const COUNTRIES: Country[] = [
  { code: "BD", en: "Bangladesh", bn: "বাংলাদেশ" },
  { code: "IN", en: "India", bn: "ভারত" },
  { code: "PK", en: "Pakistan", bn: "পাকিস্তান" },
  { code: "SA", en: "Saudi Arabia", bn: "সৌদি আরব" },
  { code: "AE", en: "United Arab Emirates", bn: "সংযুক্ত আরব আমিরাত" },
  { code: "QA", en: "Qatar", bn: "কাতার" },
  { code: "KW", en: "Kuwait", bn: "কুয়েত" },
  { code: "OM", en: "Oman", bn: "ওমান" },
  { code: "BH", en: "Bahrain", bn: "বাহরাইন" },
  { code: "MY", en: "Malaysia", bn: "মালয়েশিয়া" },
  { code: "SG", en: "Singapore", bn: "সিঙ্গাপুর" },
  { code: "ID", en: "Indonesia", bn: "ইন্দোনেশিয়া" },
  { code: "LK", en: "Sri Lanka", bn: "শ্রীলঙ্কা" },
  { code: "NP", en: "Nepal", bn: "নেপাল" },
  { code: "TR", en: "Turkey", bn: "তুরস্ক" },
  { code: "EG", en: "Egypt", bn: "মিশর" },
  { code: "JO", en: "Jordan", bn: "জর্ডান" },
  { code: "NG", en: "Nigeria", bn: "নাইজেরিয়া" },
  { code: "MA", en: "Morocco", bn: "মরক্কো" },
  { code: "GB", en: "United Kingdom", bn: "যুক্তরাজ্য" },
  { code: "US", en: "United States", bn: "যুক্তরাষ্ট্র" },
  { code: "CA", en: "Canada", bn: "কানাডা" },
  { code: "AU", en: "Australia", bn: "অস্ট্রেলিয়া" },
  { code: "IT", en: "Italy", bn: "ইতালি" },
  { code: "DE", en: "Germany", bn: "জার্মানি" },
  { code: "FR", en: "France", bn: "ফ্রান্স" },
  { code: "JP", en: "Japan", bn: "জাপান" },
  { code: "KR", en: "South Korea", bn: "দক্ষিণ কোরিয়া" },
  { code: "MV", en: "Maldives", bn: "মালদ্বীপ" },
  { code: "OTHER", en: "Other", bn: "অন্যান্য" },
];

export const flagUrl = (code?: string) =>
  code && code !== "OTHER" ? `https://flagcdn.com/w40/${code.toLowerCase()}.png` : null;

export const countryName = (code: string, lang: "bn" | "en") => {
  const c = COUNTRIES.find((x) => x.code === code);
  return c ? c[lang] : code;
};

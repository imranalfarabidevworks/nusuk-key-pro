"use client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type Lang = "bn" | "en";

const dict = {
  en: {
    brand: "NusukKey Pro",
    tagline: "Umrah Quiz key exchange",
    navKeys: "Keys",
    navHow: "How it works",
    navSubmit: "Add your key",
    heroBadge: "1447H Season",
    heroTitle: "Copy a key. Share yours.",
    heroSub: "A community vault of Nusuk Umrah Quiz keys. One tap to copy, and anyone can add their own key for others.",
    ctaBrowse: "Browse keys",
    ctaSubmit: "Add your key",
    total: "Total keys",
    available: "Not copied yet",
    copied: "Copied by you",
    progress: "Your progress",
    howTitle: "How it works",
    how1t: "Pick a key",
    how1d: "Open any batch of 100 and tap the copy button.",
    how2t: "Paste in Nusuk",
    how2d: "Paste the key in the Nusuk app referral field.",
    how3t: "Add your own",
    how3d: "Share your key and choose your country so its flag shows on the card.",
    batch: "Keys",
    search: "Search a key (e.g. NG-SyI…)",
    filterAll: "All",
    filterNew: "Not copied",
    filterFlag: "With flag",
    remaining: "Not copied",
    copy: "Copy",
    copiedLabel: "Copied",
    toastCopied: "Key copied",
    empty: "No keys match. Try another search or filter.",
    prev: "Previous batch",
    next: "Next batch",
    submitTitle: "Add your key",
    keyLabel: "Your Nusuk key",
    keyHint: "Format: NG- followed by 8 characters",
    countryLabel: "Your country",
    countryChoose: "Choose country",
    submitBtn: "Add key",
    cancel: "Cancel",
    errFormat: "Enter a valid key: NG- plus 8 letters or numbers.",
    errDup: "This key is already in the list.",
    errCountry: "Choose your country.",
    errRate: "Too many keys from your connection. Try again in an hour.",
    errServer: "Could not save right now. Please try again.",
    permanent: "Your key is saved permanently and visible to everyone.",
    ok: "Key added. Thank you!",
    footer: "Community project. Not affiliated with the Ministry of Hajj and Umrah or Nusuk.",
    mine: "Yours",
  },
  bn: {
    brand: "NusukKey Pro",
    tagline: "ওমরাহ কুইজ কী এক্সচেঞ্জ",
    navKeys: "কী তালিকা",
    navHow: "কীভাবে কাজ করে",
    navSubmit: "আপনার কী দিন",
    heroBadge: "১৪৪৭ হিজরি",
    heroTitle: "কী কপি করুন। নিজেরটাও দিন।",
    heroSub: "নুসুক ওমরাহ কুইজের কী-এর কমিউনিটি ভল্ট। এক ট্যাপে কপি করুন, আর চাইলে আপনার কী যোগ করুন অন্যদের জন্য।",
    ctaBrowse: "কী দেখুন",
    ctaSubmit: "আপনার কী দিন",
    total: "মোট কী",
    available: "এখনো কপি হয়নি",
    copied: "আপনি কপি করেছেন",
    progress: "আপনার অগ্রগতি",
    howTitle: "কীভাবে কাজ করে",
    how1t: "একটি কী বাছুন",
    how1d: "১০০টির যেকোনো ব্যাচ খুলে কপি বাটনে চাপ দিন।",
    how2t: "নুসুকে পেস্ট করুন",
    how2d: "নুসুক অ্যাপের রেফারেল ঘরে কী পেস্ট করুন।",
    how3t: "নিজের কী যোগ করুন",
    how3d: "আপনার কী দিন এবং দেশ বাছুন, কার্ডে দেশের পতাকা দেখাবে।",
    batch: "কী",
    search: "কী খুঁজুন (যেমন NG-SyI…)",
    filterAll: "সব",
    filterNew: "কপি হয়নি",
    filterFlag: "পতাকা সহ",
    remaining: "কপি হয়নি",
    copy: "কপি",
    copiedLabel: "কপি হয়েছে",
    toastCopied: "কী কপি হয়েছে",
    empty: "কোনো কী পাওয়া যায়নি। অন্য সার্চ বা ফিল্টার চেষ্টা করুন।",
    prev: "আগের ব্যাচ",
    next: "পরের ব্যাচ",
    submitTitle: "আপনার কী দিন",
    keyLabel: "আপনার নুসুক কী",
    keyHint: "ফরম্যাট: NG- এর পরে ৮টি অক্ষর",
    countryLabel: "আপনার দেশ",
    countryChoose: "দেশ বাছুন",
    submitBtn: "কী যোগ করুন",
    cancel: "বাতিল",
    errFormat: "সঠিক কী দিন: NG- এর পরে ৮টি অক্ষর বা সংখ্যা।",
    errDup: "এই কী আগে থেকেই তালিকায় আছে।",
    errCountry: "আপনার দেশ বাছুন।",
    errRate: "আপনার কানেকশন থেকে অনেক বেশি key দেওয়া হয়েছে। এক ঘন্টা পরে আবার চেষ্টা করুন।",
    errServer: "এখন সেভ করা যায়নি। আবার চেষ্টা করুন।",
    permanent: "আপনার key স্থায়ীভাবে সেভ হবে এবং সবাই দেখতে পাবে।",
    ok: "কী যোগ হয়েছে। ধন্যবাদ!",
    footer: "এটি একটি কমিউনিটি প্রজেক্ট। হজ ও ওমরাহ মন্ত্রণালয় বা নুসুকের সাথে যুক্ত নয়।",
    mine: "আপনার",
  },
} as const;

export type TKey = keyof typeof dict.en;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };
const LangCtx = createContext<Ctx>({ lang: "bn", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");

  useEffect(() => {
    try {
      const s = localStorage.getItem("nk_lang") as Lang | null;
      if (s === "bn" || s === "en") setLangState(s);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("nk_lang", l); } catch {}
  };

  return (
    <LangCtx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);

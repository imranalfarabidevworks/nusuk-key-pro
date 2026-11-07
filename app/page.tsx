"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyList from "@/components/KeyList";
import SubmitModal from "@/components/SubmitModal";
import Footer from "@/components/Footer";
import { useKeys } from "@/lib/useKeys";
import { useLang } from "@/lib/i18n";

export default function Page() {
  const { keys, copiedSet, copiedCount, markCopied, addKey } = useKeys();
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <>
      <Navbar onSubmit={() => setOpen(true)} total={keys.length} />
      <main>
        <Hero total={keys.length} copied={copiedCount} onSubmit={() => setOpen(true)} />
        <KeyList keys={keys} copiedSet={copiedSet} onCopied={(c) => { markCopied(c); flash(t("toastCopied")); }} />
        <HowItWorks />
      </main>
      <Footer />
      <SubmitModal open={open} onClose={() => setOpen(false)} addKey={addKey} onDone={() => flash(t("ok"))} />
      <AnimatePresence>
        {toast && (
          <motion.div className="toast" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useLang } from "./LangContext";
import { motion } from "framer-motion";

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1 font-mono text-xs tracking-widest">
      <motion.button
        onClick={() => setLang("ru")}
        className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
          lang === "ru"
            ? "text-white"
            : "text-white/30 hover:text-white/60"
        }`}
        whileTap={{ scale: 0.9 }}
      >
        RU
      </motion.button>
      <span className="text-white/20">/</span>
      <motion.button
        onClick={() => setLang("en")}
        className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
          lang === "en"
            ? "text-white"
            : "text-white/30 hover:text-white/60"
        }`}
        whileTap={{ scale: 0.9 }}
      >
        EN
      </motion.button>
    </div>
  );
}

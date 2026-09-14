"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/components/LangContext";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] px-6 md:px-12 text-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none select-none flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-[38vw] font-serif text-white/[0.04] leading-none tracking-tighter uppercase">
          404
        </span>
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/40 mb-6 md:mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {t.notFound.code}
        </motion.p>

        <h1
          className="not-found-glitch text-[clamp(4.5rem,22vw,11rem)] font-serif leading-none tracking-tighter uppercase text-white mb-6 md:mb-8"
          data-text="404"
        >
          404
        </h1>

        <motion.p
          className="font-mono text-sm md:text-base text-white/50 leading-relaxed mb-10 md:mb-14 px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          {t.notFound.message}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-widest border border-white/25 px-8 py-4 hover:border-white hover:bg-white hover:text-black transition-colors duration-300"
          >
            {t.notFound.home}
          </Link>
          <Link
            href="/works"
            className="font-mono text-xs uppercase tracking-widest border border-white/10 px-8 py-4 text-white/70 hover:border-white/40 hover:text-white transition-colors duration-300"
          >
            {t.notFound.works}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 font-mono text-[10px] uppercase tracking-widest text-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        aria-hidden="true"
      >
        <span>∅</span>
        <span>signal lost</span>
        <span>∅</span>
      </motion.div>
    </div>
  );
}

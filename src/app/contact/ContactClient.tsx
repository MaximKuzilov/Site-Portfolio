"use client";
import { motion } from "framer-motion";
import { Mail, Send, ExternalLink } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { GOOGLE_DRIVE_URL } from "@/lib/site";

export default function ContactClient() {
  const { t } = useLang();

  const contacts = [
    {
      label: "Email",
      value: "maksimkuzilov@gmail.com",
      href: "mailto:maksimkuzilov@gmail.com",
      icon: Mail,
    },
    {
      label: "Telegram",
      value: "@XGr0YeP",
      href: "https://t.me/XGr0YeP",
      icon: Send,
    },
    {
      label: "FL.ru",
      value: "fl.ru/users/maksimkuzilov",
      href: "https://www.fl.ru/users/maksimkuzilov/",
      icon: ExternalLink,
    },
    {
      label: "Kwork",
      value: "kwork.ru/user/xgr0nyep",
      href: "https://kwork.ru/user/xgr0nyep",
      icon: ExternalLink,
    },
    {
      label: "Google Drive",
      value: "Портфолио работ",
      href: GOOGLE_DRIVE_URL,
      icon: ExternalLink,
    },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen px-6 md:px-12 lg:px-24 py-24">
      <motion.div
        className="mb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif uppercase tracking-tighter mb-6">
          {t.contact.title}
        </h1>
        <p className="text-base md:text-xl font-mono text-white/50 max-w-xl">
          {t.contact.subtitle}
        </p>
        <div className="w-full h-px bg-white/20 mt-8" />
      </motion.div>

      <div className="flex flex-col gap-0">
        {contacts.map((contact, idx) => (
          <motion.a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-6 md:py-8 border-b border-white/10 hover:border-white/30 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1 * idx,
              ease: "easeOut",
            }}
          >
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <contact.icon
                size={20}
                className="text-white/40 group-hover:text-white transition-colors shrink-0"
              />
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                  {contact.label}
                </span>
                <span className="text-base sm:text-lg md:text-2xl font-serif text-white group-hover:text-white/80 transition-colors truncate">
                  {contact.value}
                </span>
              </div>
            </div>
            <span className="font-mono text-sm text-white/30 group-hover:text-white/60 transition-colors hidden md:block shrink-0">
              ↗
            </span>
          </motion.a>
        ))}
      </div>

      <motion.div
        className="mt-16 md:mt-32 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <p className="text-base md:text-lg font-mono text-white/50 leading-relaxed">
          {t.contact.cta}
        </p>
      </motion.div>
    </div>
  );
}

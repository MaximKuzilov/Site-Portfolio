"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLang } from "./LangContext";
import LangSwitcher from "./LangSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();

  const links = [
    { name: t.nav.works, path: "/works" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:px-6 md:py-6 mix-blend-difference text-white uppercase text-[10px] sm:text-xs md:text-sm tracking-widest font-mono"
    >
      <div className="flex w-full items-center justify-between sm:w-auto">
        <Link href="/" className="hover:opacity-60 transition-opacity shrink-0">
          Maxim Kuzilov
        </Link>
        <div className="sm:hidden">
          <LangSwitcher />
        </div>
      </div>
      
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-5 md:gap-8">
        {links.map((link) => (
          <Link 
            key={link.path} 
            href={link.path}
            className={`hover:opacity-60 transition-opacity ${pathname === link.path ? "opacity-100 line-through" : "opacity-100"}`}
          >
            {link.name}
          </Link>
        ))}
        <div className="hidden sm:block">
          <LangSwitcher />
        </div>
      </div>
    </motion.nav>
  );
}

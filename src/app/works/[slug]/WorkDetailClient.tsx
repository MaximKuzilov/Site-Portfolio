"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/components/LangContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Download } from "lucide-react";
import type { ReactNode } from "react";

interface WorkMeta {
  title: string;
  role: string;
  stack: string;
  year: string;
  images?: string[];
  link?: string;
  download?: string;
  downloadLabel?: string;
  downloads?: { url: string; label: string }[];
  links?: { url: string; label: string }[];
}

interface WorkDetailClientProps {
  metaRu: WorkMeta;
  metaEn: WorkMeta;
  contentRu: ReactNode;
  contentEn: ReactNode;
}

export default function WorkDetailClient({
  metaRu,
  metaEn,
  contentRu,
  contentEn,
}: WorkDetailClientProps) {
  const { lang, t } = useLang();
  const meta = lang === "ru" ? metaRu : metaEn;
  const images = meta.images || [];
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <article className="flex flex-col w-full min-h-screen">
      {/* Massive Hero */}
      <div className="w-full min-h-[50vh] md:h-[70vh] bg-[#111] flex flex-col justify-end p-6 md:p-12 lg:p-24 border-b border-white/10 relative">
        <div className="absolute inset-0 flex items-center justify-center text-white/5 text-[20vw] font-serif select-none pointer-events-none">
          {meta.title.substring(0, 2).toUpperCase()}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-serif uppercase tracking-tighter leading-none max-w-5xl">
            {meta.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full px-6 md:px-12 lg:px-24 py-16 gap-16 lg:gap-32">
        {/* Metadata Sidebar */}
        <aside className="lg:w-1/4 flex flex-col gap-12 font-mono text-sm uppercase tracking-widest text-white/60">
          <Link
            href="/works"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            {t.works.backToWorks}
          </Link>

          <div className="flex flex-col gap-8 border-t border-white/20 pt-8">
            <div>
              <h3 className="text-white/40 mb-2">{t.works.role}</h3>
              <p className="text-white">{meta.role}</p>
            </div>
            <div>
              <h3 className="text-white/40 mb-2">{t.works.stack}</h3>
              <p className="text-white leading-relaxed">{meta.stack}</p>
            </div>
            <div>
              <h3 className="text-white/40 mb-2">{t.works.year}</h3>
              <p className="text-white">{meta.year}</p>
            </div>

            {/* External links */}
            {meta.links?.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-white/70 transition-colors normal-case tracking-normal text-base border border-white/20 px-4 py-3 hover:border-white/40"
              >
                <ExternalLink size={16} />
                <span className="font-mono text-sm uppercase tracking-widest">
                  {item.label}
                </span>
              </a>
            ))}
            {meta.link && !meta.links?.length && (
              <a
                href={meta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-white/70 transition-colors normal-case tracking-normal text-base border border-white/20 px-4 py-3 hover:border-white/40"
              >
                <ExternalLink size={16} />
                <span className="font-mono text-sm uppercase tracking-widest">
                  {lang === "ru" ? "Открыть сайт" : "Visit Site"}
                </span>
              </a>
            )}

            {/* Download links */}
            {meta.downloads?.map((item) => (
              <a
                key={item.url}
                href={item.url}
                download
                className="flex items-center gap-3 text-white hover:text-white/70 transition-colors normal-case tracking-normal text-base border border-white/20 px-4 py-3 hover:border-white/40"
              >
                <Download size={16} />
                <span className="font-mono text-sm uppercase tracking-widest">
                  {item.label}
                </span>
              </a>
            ))}
            {meta.download && (
              <a
                href={meta.download}
                download
                className="flex items-center gap-3 text-white hover:text-white/70 transition-colors normal-case tracking-normal text-base border border-white/20 px-4 py-3 hover:border-white/40"
              >
                <Download size={16} />
                <span className="font-mono text-sm uppercase tracking-widest">
                  {meta.downloadLabel ||
                    (lang === "ru" ? "Скачать (.exe)" : "Download (.exe)")}
                </span>
              </a>
            )}
          </div>
        </aside>

        {/* Main content area */}
        <div className="lg:w-3/4 flex flex-col gap-16">
          {/* Image Carousel */}
          {images.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[16/9] bg-[#111] border border-white/10 overflow-hidden group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImage]}
                      alt={`${meta.title} — ${currentImage + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 75vw"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white/70 hover:text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white/70 hover:text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Dots indicator */}
              {images.length > 1 && (
                <div className="flex justify-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                        idx === currentImage ? "bg-white" : "bg-white/30 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MDX Content */}
          <div
            className="prose prose-invert prose-lg md:prose-xl font-sans 
            prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-headings:uppercase
            prose-p:text-white/80 prose-p:leading-relaxed prose-a:text-white hover:prose-a:text-white/70
            max-w-4xl"
          >
            <div style={{ display: lang === "ru" ? "block" : "none" }}>
              {contentRu}
            </div>
            <div style={{ display: lang === "en" ? "block" : "none" }}>
              {contentEn}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

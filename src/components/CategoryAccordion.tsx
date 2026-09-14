"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import WorkCard from "./WorkCard";

interface WorkItem {
  slug: string;
  meta: {
    title: string;
    description: string;
    role: string;
    stack: string;
    year: string;
    category: string;
    images?: string[];
  };
}

interface CategoryAccordionProps {
  category: string;
  works: WorkItem[];
  defaultOpen?: boolean;
  startIndex: number;
}

export default function CategoryAccordion({
  category,
  works,
  defaultOpen = false,
  startIndex,
}: CategoryAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10">
      {/* Category Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-6 md:py-8 group cursor-pointer"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <h2 className="text-2xl md:text-4xl font-serif uppercase tracking-tight text-white group-hover:text-white/80 transition-colors text-left">
            {category}
          </h2>
          <span className="font-mono text-xs md:text-sm text-white/30">
            ({works.length})
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown
            size={24}
            className="text-white/40 group-hover:text-white/70 transition-colors"
          />
        </motion.div>
      </button>

      {/* Works List */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-12 pb-8">
              {works.map((work, idx) => (
                <div key={work.slug} className="flex flex-col gap-4">
                  <WorkCard
                    title={work.meta.title}
                    slug={work.slug}
                    imageFallback={String(startIndex + idx + 1).padStart(2, "0")}
                    previewImage={work.meta.images?.[0]}
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4 px-4">
                    <span className="font-mono text-sm text-white/50">
                      {work.meta.role}
                    </span>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm text-white/40">
                        {work.meta.stack}
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-white/50">
                        {work.meta.year}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

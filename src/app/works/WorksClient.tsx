"use client";
import { motion } from "framer-motion";
import CategoryAccordion from "@/components/CategoryAccordion";
import { useLang } from "@/components/LangContext";

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

interface CategoryGroup {
  name: string;
  works: WorkItem[];
}

interface WorksClientProps {
  categoriesRu: CategoryGroup[];
  categoriesEn: CategoryGroup[];
}

export default function WorksClient({ categoriesRu, categoriesEn }: WorksClientProps) {
  const { lang, t } = useLang();
  const categories = lang === "ru" ? categoriesRu : categoriesEn;

  return (
    <div className="flex flex-col w-full min-h-screen px-6 md:px-12 lg:px-24 py-24">
      {/* Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-6xl md:text-8xl font-serif uppercase tracking-tighter mb-6">
          {t.works.title}
        </h1>
        <p className="text-xl font-mono text-white/50 max-w-xl">
          {t.works.subtitle}
        </p>
        <div className="w-full h-px bg-white/20 mt-8" />
      </motion.div>

      {/* Category Accordions */}
      <div className="flex flex-col">
        {categories.map((cat, catIdx) => {
          const startIdx = categories
            .slice(0, catIdx)
            .reduce((total, item) => total + item.works.length, 0);

          // Translate category name
          const categoryName = t.categories[cat.name] || cat.name;

          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 * catIdx,
                ease: "easeOut",
              }}
            >
              <CategoryAccordion
                category={categoryName}
                works={cat.works}
                defaultOpen={catIdx === 0}
                startIndex={startIdx}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Marquee from "@/components/Marquee";
import WorkCard from "@/components/WorkCard";
import { useLang } from "@/components/LangContext";

export default function HomeClient() {
  const { t } = useLang();

  const lineVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const skills = [
    t.home.skills.web,
    t.home.skills.backend,
    t.home.skills.db,
    t.home.skills.data,
    t.home.skills.seo,
  ];

  const workPreviews = [
    { slug: "virtus-planner", fallback: "01", previewImage: "/works/virtus-planner-1.jpg" },
    { slug: "biosviaz-seo", fallback: "02", previewImage: "/works/biosviaz-1.png" },
    { slug: "vyruchay", fallback: "03", previewImage: "/works/vyruchay-1.png" },
    { slug: "truck-tracker", fallback: "04", previewImage: "/works/truck-tracker-1.png" },
    { slug: "graduation-thesis", fallback: "05", previewImage: "/works/vkr-1.png" },
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 mb-24">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 md:gap-12 w-full">
          <div className="flex-1 min-w-0">
            <div className="overflow-hidden mb-2 sm:mb-4 md:mb-6">
              <motion.h1
                className="text-[2.5rem] leading-[0.9] sm:text-6xl md:text-8xl lg:text-[10rem] font-serif tracking-tighter uppercase"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
              >
                Maxim
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-[2.5rem] leading-[0.9] sm:text-6xl md:text-8xl lg:text-[10rem] font-serif tracking-tighter uppercase text-white/80"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                transition={{ delay: 0.1 }}
              >
                Kuzilov
              </motion.h1>
            </div>
          </div>
          <motion.div
            className="relative w-[4.5rem] h-[4.5rem] sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full shrink-0 group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -15, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 rounded-full blur-[40px] bg-white/10 group-hover:bg-white/25 group-hover:blur-[60px] transition-all duration-700" />
            <div className="relative w-full h-full rounded-full overflow-hidden z-10">
              <Image
                src="/avatar.png"
                alt="Maxim Kuzilov — Full-Stack разработчик и SEO-специалист"
                fill
                sizes="(max-width: 640px) 72px, (max-width: 768px) 144px, (max-width: 1024px) 192px, 256px"
                className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              />
            </div>
          </motion.div>
        </div>

        <div className="max-w-4xl overflow-hidden mt-12">
          <motion.div
            className="text-base md:text-lg lg:text-xl font-mono text-white/70 leading-relaxed space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <p>{t.home.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
              {skills.map((skill) => (
                <div key={skill.title}>
                  <strong className="text-white">{skill.title}:</strong> {skill.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mb-32" aria-label="Tech stack">
        <Marquee />
      </section>

      <section className="px-6 md:px-12 lg:px-24 mb-32 flex flex-col gap-16" aria-labelledby="recent-works-heading">
        <motion.div
          className="flex items-end justify-between border-b border-white/20 pb-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 id="recent-works-heading" className="text-3xl md:text-5xl font-serif uppercase tracking-tight">
            {t.home.selectedWorks}
          </h2>
        </motion.div>

        {workPreviews.map((work) => (
          <motion.div
            key={work.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <WorkCard
              title={t.workTitles[work.slug] || work.slug}
              slug={work.slug}
              imageFallback={work.fallback}
              previewImage={work.previewImage}
            />
          </motion.div>
        ))}
      </section>
    </div>
  );
}

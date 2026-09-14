"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useLang } from "@/components/LangContext";
import { KWORK_URL, GOOGLE_DRIVE_URL } from "@/lib/site";

const competenciesRu = [
  {
    title: "Web Development (Front-end и Back-end)",
    items: [
      "Создание современных сайтов, лендингов и сложных веб-приложений",
      "Client-side: HTML5, CSS3, JavaScript, TypeScript, React, Next.js",
      "Server-side: Python (Django, FastAPI, Flask), PHP (Laravel), Node.js (NestJS), C# (.NET)",
    ],
  },
  {
    title: "Разработка ПО и мобильных приложений",
    items: [
      "Проектирование и разработка десктопного ПО (C++, C#, Python)",
      "Кроссплатформенные мобильные приложения (React Native, Flutter)",
      "Написание парсеров и скриптов для автоматизации бизнес-процессов",
    ],
  },
  {
    title: "Базы данных и 1C:Предприятие",
    items: [
      "1C: создание и настройка баз данных «под ключ», конфигурация рабочих мест, процедуры проведения документов, многоролевая настройка пользователей",
      "Реляционное проектирование БД (PostgreSQL, MySQL, SQL, ER-диаграммы)",
      "MS Access: полноценная разработка баз, написание макросов и скриптов VBA, интеграция ботов",
    ],
  },
  {
    title: "SEO, контент и аналитика",
    items: [
      "Сбор семантического ядра и комплексная SEO-оптимизация сайтов",
      "Написание SEO-оптимизированных текстов для блогов и карточек маркетплейсов",
      "Автоматизированный и ручной сбор данных (парсинг) любой сложности",
    ],
  },
  {
    title: "Учебные работы и MS Office",
    items: [
      "Качественные лабораторные и курсовые по программированию, БД и смежным IT-дисциплинам",
      "Экспертное владение всеми инструментами MS Office (сложные таблицы, расчёты, макросы)",
    ],
  },
];

const competenciesEn = [
  {
    title: "Web Development (Front-end and Back-end)",
    items: [
      "Building modern websites, landing pages, and complex web applications",
      "Client-side: HTML5, CSS3, JavaScript, TypeScript, React, Next.js",
      "Server-side: Python (Django, FastAPI, Flask), PHP (Laravel), Node.js (NestJS), C# (.NET)",
      "CMS and builders: WordPress, Tilda",
    ],
  },
  {
    title: "Software and Mobile Application Development",
    items: [
      "Desktop software design and development (C++, C#, Python)",
      "Cross-platform mobile applications (React Native, Flutter)",
      "Parsers and scripts for business process automation",
    ],
  },
  {
    title: "Databases and 1C:Enterprise",
    items: [
      "1C: turnkey database creation and configuration, desktop version setup, document posting procedures, multi-role user configuration",
      "Relational database design (PostgreSQL, MySQL, SQL, ER diagrams)",
      "MS Access: full-featured database development, macro and VBA scripting, bot integration",
    ],
  },
  {
    title: "SEO, Content and Analytics",
    items: [
      "Semantic core collection and comprehensive website SEO optimization",
      "Writing SEO-optimized texts for blogs and marketplace product cards",
      "Automated and manual data collection (parsing) of any complexity",
    ],
  },
  {
    title: "Academic Assistance and MS Office",
    items: [
      "High-quality coursework and lab assignments in programming, databases, and related IT disciplines",
      "Expert proficiency in all MS Office tools (complex spreadsheets, calculations, macros)",
    ],
  },
];

const stackRu = [
  { label: "Frontend", tags: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", tags: ["Python", "Django", "FastAPI", "Flask", "PHP", "Laravel", "Node.js", "NestJS", "C#"] },
  { label: "Базы данных", tags: ["PostgreSQL", "MySQL", "SQL", "MS Access", "1C:Предприятие"] },
  { label: "Нативная разработка", tags: ["C++", "C#", "Java", "Python", "React Native", "Flutter"] },
  { label: "Инструменты", tags: ["Git", "BeautifulSoup", "Scrapy", "Selenium", "MS Office", "VBA"] },
  { label: "SEO", tags: ["Семантическое ядро", "Техническое SEO", "SEO-копирайтинг"] },
];

const stackEn = [
  { label: "Frontend", tags: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { label: "Backend", tags: ["Python", "Django", "FastAPI", "Flask", "PHP", "Laravel", "Node.js", "NestJS", "C#"] },
  { label: "Databases", tags: ["PostgreSQL", "MySQL", "SQL", "MS Access", "1C:Enterprise"] },
  { label: "Native Dev", tags: ["C++", "C#", "Java", "Python", "React Native", "Flutter"] },
  { label: "Tools", tags: ["Git", "BeautifulSoup", "Scrapy", "Selenium", "MS Office", "VBA"] },
  { label: "SEO", tags: ["Semantic Core", "Technical SEO", "SEO Copywriting"] },
];

export default function AboutClient() {
  const { t, lang } = useLang();
  const competencies = lang === "ru" ? competenciesRu : competenciesEn;
  const stack = lang === "ru" ? stackRu : stackEn;

  return (
    <div className="flex flex-col w-full min-h-screen px-6 md:px-12 lg:px-24 py-24">
      <motion.div
        className="mb-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif uppercase tracking-tighter mb-6">
          {t.about.title}
        </h1>
        <div className="w-full h-px bg-white/20" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
        <motion.div
          className="lg:w-1/3 shrink-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-sm mx-auto lg:max-w-none aspect-[3/4] overflow-hidden bg-[#111] border border-white/5 group cursor-pointer">
            <Image
              src="/avatar-about.jpg"
              alt="Maxim Kuzilov — Full-Stack разработчик"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:w-2/3 flex flex-col gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif uppercase tracking-tight">
              {t.about.name}
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-white/40">
              {t.about.role}
            </p>
          </div>

          <div className="text-base md:text-lg font-mono text-white/70 leading-relaxed space-y-4">
            <p>{t.about.bio}</p>
            <p>{t.about.apkNote}</p>
            <p>{t.about.portfolioNote}</p>
          </div>

          <div className="flex flex-col gap-6 border-t border-white/20 pt-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
              {t.about.experience}
            </h3>
            <div className="flex flex-col gap-3 font-mono text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-white/70 py-3 border-b border-white/10">
                <span className="text-white">{t.about.freelance}</span>
                <span className="text-white/50">{t.about.freelanceYears}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-white/70 py-3">
                <span className="text-white">{t.about.education}</span>
                <span className="text-white/50">{t.about.educationRole}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col gap-12 border-t border-white/20 pt-16 mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          {t.about.competencies}
        </h2>

        <div className="flex flex-col gap-0">
          {competencies.map((comp, idx) => (
            <motion.div
              key={comp.title}
              className="flex flex-col md:flex-row gap-4 md:gap-16 py-8 border-b border-white/10 group"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: "easeOut" }}
            >
              <div className="md:w-64 shrink-0">
                <span className="font-mono text-xs uppercase tracking-widest text-white/40 leading-relaxed">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg md:text-xl text-white mt-1 leading-snug">
                  {comp.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2 flex-1">
                {comp.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 font-mono text-sm text-white/60 leading-relaxed">
                    <span className="text-white/20 mt-1 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-10 border-t border-white/20 pt-16 mb-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Tech Stack
        </h2>

        <div className="flex flex-col gap-6">
          {stack.map((group, idx) => (
            <motion.div
              key={group.label}
              className="flex flex-col sm:flex-row gap-3 sm:gap-8 items-start sm:items-baseline"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-white/30 sm:w-32 shrink-0">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 border border-white/10 text-white/60 hover:border-white/30 hover:text-white/90 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-8 border-t border-white/20 pt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          {t.about.fullPortfolio}
        </h2>
        <p className="font-mono text-sm md:text-base text-white/60 leading-relaxed max-w-3xl">
          {t.about.fullPortfolioDesc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={KWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 font-mono text-sm uppercase tracking-widest border border-white/20 px-6 py-4 hover:border-white/50 hover:bg-white/5 transition-colors"
          >
            <ExternalLink size={16} />
            Kwork
          </Link>
          <Link
            href={GOOGLE_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 font-mono text-sm uppercase tracking-widest border border-white/20 px-6 py-4 hover:border-white/50 hover:bg-white/5 transition-colors"
          >
            <ExternalLink size={16} />
            Google Drive
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

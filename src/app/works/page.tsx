import { getAllWorks } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";
import WorksClient from "./WorksClient";

export const metadata = createMetadata({
  title: "Портфолио работ | Maxim Kuzilov",
  description:
    "Избранные проекты Кузилова Максима: веб-разработка, мобильные приложения, SEO-оптимизация, десктопное ПО, учебные работы. Full-Stack разработчик и SEO-специалист.",
  path: "/works",
  keywords: ["портфолио", "проекты", "кейсы", "разработка на заказ"],
});

function buildCategories(works: ReturnType<typeof getAllWorks>) {
  const grouped: Record<string, typeof works> = {};
  for (const work of works) {
    const cat = work.meta.category || "Другое";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(work);
  }

  const categoryOrder = [
    "Web Development",
    "Десктоп программирование",
    "1C / Базы данных",
    "SEO-копирайтинг",
    "Парсинг данных",
    "Мобильная разработка",
    "Учебные работы",
    "Другое",
  ];

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ia = categoryOrder.indexOf(a);
    const ib = categoryOrder.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return sortedCategories.map((cat) => ({
    name: cat,
    works: grouped[cat].map((w) => ({
      slug: w.slug,
      meta: {
        title: w.meta.title,
        description: w.meta.description,
        role: w.meta.role,
        stack: w.meta.stack,
        year: w.meta.year,
        category: w.meta.category,
        images: w.meta.images,
      },
    })),
  }));
}

export default function WorksPage() {
  const worksRu = getAllWorks("ru");
  const worksEn = getAllWorks("en");

  const categoriesRu = buildCategories(worksRu);
  const categoriesEn = buildCategories(worksEn);

  return (
    <WorksClient
      categoriesRu={categoriesRu}
      categoriesEn={categoriesEn}
    />
  );
}
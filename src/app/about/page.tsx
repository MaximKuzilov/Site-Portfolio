import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Обо мне | Maxim Kuzilov — Full-Stack разработчик",
  description:
    "Кузилов Максим — Full-Stack разработчик и SEO-специалист с 5+ годами коммерческого опыта. Веб-разработка, мобильные приложения, базы данных, SEO-оптимизация, учебные работы.",
  path: "/about",
  keywords: ["обо мне", "опыт разработчика", "компетенции", "стек технологий"],
});

export { default } from "./AboutClient";

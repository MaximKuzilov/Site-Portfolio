import { createMetadata } from "@/lib/seo";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";

export const metadata = createMetadata({
  title: "Maxim Kuzilov | Full-Stack разработчик, SEO-специалист",
  description:
    "Портфолио Кузилова Максима — Full-Stack разработчик и SEO-специалист. Веб-разработка, мобильные приложения, десктопное ПО, SEO-оптимизация сайтов. 5+ лет коммерческого опыта на FL и Kwork.",
  path: "/",
  keywords: [
    "разработка сайтов на заказ",
    "мобильные приложения React Native",
    "SEO продвижение сайта",
    "фриланс программист",
  ],
});

export default function Home() {
  return (
    <>
      <JsonLd />
      <HomeClient />
    </>
  );
}

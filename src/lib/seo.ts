import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "./site";

const defaultKeywords = [
  "Maxim Kuzilov",
  "Кузилов Максим",
  "Full-Stack разработчик",
  "веб-разработчик",
  "SEO-специалист",
  "фриланс разработчик",
  "React",
  "Next.js",
  "Python",
  "разработка сайтов",
  "SEO оптимизация",
  "портфолио разработчика",
];

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  image,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? OG_IMAGE;

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "ru_RU",
      alternateLocale: "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

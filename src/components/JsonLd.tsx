import { SITE_NAME, SITE_URL, KWORK_URL, GOOGLE_DRIVE_URL } from "@/lib/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    alternateName: "Кузилов Максим",
    url: SITE_URL,
    image: `${SITE_URL}/avatar.png`,
    jobTitle: "Full-Stack Developer",
    knowsAbout: [
      "Web Development",
      "SEO Optimization",
      "Mobile App Development",
      "Database Design",
      "Python",
      "React",
      "Next.js",
    ],
    sameAs: [
      KWORK_URL,
      "https://www.fl.ru/users/maksimkuzilov/",
      "https://t.me/XGr0YeP",
      GOOGLE_DRIVE_URL,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

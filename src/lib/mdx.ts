import fs from "fs";
import path from "path";
import matter from "gray-matter";

const worksDirectory = path.join(process.cwd(), "content/works");

export interface WorkMetadata {
  title: string;
  description: string;
  role: string;
  stack: string;
  year: string;
  category: string;
  slug: string;
  images?: string[];
  link?: string;
  download?: string;
  downloadLabel?: string;
  downloads?: { url: string; label: string }[];
  links?: { url: string; label: string }[];
}

/**
 * Returns base slugs (without language suffix).
 * Filters out .ru.mdx files — only returns the default (English) MDX filenames.
 */
export function getWorkSlugs() {
  return fs.readdirSync(worksDirectory).filter(
    (f) => f.endsWith(".mdx") && !f.endsWith(".ru.mdx")
  );
}

/**
 * Loads a work by slug for a given language.
 * Tries `slug.ru.mdx` for Russian, falls back to `slug.mdx`.
 */
export function getWorkBySlug(slug: string, lang: string = "en") {
  const realSlug = slug.replace(/\.mdx$/, "");

  // Try language-specific file first for non-English
  if (lang === "ru") {
    const ruPath = path.join(worksDirectory, `${realSlug}.ru.mdx`);
    if (fs.existsSync(ruPath)) {
      const fileContents = fs.readFileSync(ruPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        slug: realSlug,
        meta: data as Omit<WorkMetadata, "slug">,
        content,
      };
    }
  }

  // Default (English) file
  const fullPath = path.join(worksDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data as Omit<WorkMetadata, "slug">,
    content,
  };
}

/**
 * Returns all works for a given language, sorted by year descending.
 */
export function getAllWorks(lang: string = "en") {
  const slugs = getWorkSlugs();
  const works = slugs.map((slug) => getWorkBySlug(slug, lang));
  return works.sort((work1, work2) =>
    work1.meta.year > work2.meta.year ? -1 : 1
  );
}

import { getWorkBySlug, getWorkSlugs } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import WorkDetailClient from "./WorkDetailClient";

export async function generateStaticParams() {
  const slugs = getWorkSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const work = getWorkBySlug(slug, "en");
    return createMetadata({
      title: `${work.meta.title} | Maxim Kuzilov`,
      description: work.meta.description,
      path: `/works/${slug}`,
      image: work.meta.images?.[0],
      keywords: [work.meta.category, work.meta.stack, work.meta.role],
    });
  } catch {
    return createMetadata({
      title: "Work | Maxim Kuzilov",
      description: "Portfolio project by Maxim Kuzilov",
      path: `/works/${slug}`,
    });
  }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  let workEn;
  let workRu;
  
  try {
    workEn = getWorkBySlug(resolvedParams.slug, "en");
    workRu = getWorkBySlug(resolvedParams.slug, "ru");
  } catch {
    notFound();
  }

  return (
    <WorkDetailClient
      metaEn={{
        title: workEn.meta.title,
        role: workEn.meta.role,
        stack: workEn.meta.stack,
        year: workEn.meta.year,
        images: workEn.meta.images,
        link: workEn.meta.link,
        download: workEn.meta.download,
        downloadLabel: workEn.meta.downloadLabel,
        downloads: workEn.meta.downloads,
        links: workEn.meta.links,
      }}
      metaRu={{
        title: workRu.meta.title,
        role: workRu.meta.role,
        stack: workRu.meta.stack,
        year: workRu.meta.year,
        images: workRu.meta.images,
        link: workRu.meta.link,
        download: workRu.meta.download,
        downloadLabel: workRu.meta.downloadLabel,
        downloads: workRu.meta.downloads,
        links: workRu.meta.links,
      }}
      contentEn={<MDXRemote source={workEn.content} />}
      contentRu={<MDXRemote source={workRu.content} />}
    />
  );
}
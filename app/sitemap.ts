import type { MetadataRoute } from "next";
import { readFile } from "@/lib/content-store";

const BASE = "https://lawlevisay.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postsFile, worksFile] = await Promise.all([
    readFile("content/blog/posts.json"),
    readFile("content/work/works.json"),
  ]);

  const posts: { slug: string }[] = postsFile
    ? JSON.parse(postsFile.content)
    : [];
  const works: { slug: string }[] = worksFile
    ? JSON.parse(worksFile.content)
    : [];

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: "monthly" },
    { url: `${BASE}/work`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: "yearly" },
  ];

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  const workPages: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${BASE}/work/${w.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...workPages, ...blogPages];
}

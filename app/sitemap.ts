import type { MetadataRoute } from "next";
import { posts } from "@/content/blog/manifest";
import { works } from "@/content/work/manifest";

const BASE = "https://lawlevisay.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

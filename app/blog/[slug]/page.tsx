import Link from "next/link";
import Nav from "@/components/Nav";
import { notFound } from "next/navigation";
import { posts } from "@/content/blog/manifest";
import type { Metadata } from "next";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const title = `${post.title} — Law Levisay`;
  const url = `https://lawlevisay.com/blog/${slug}`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const { default: Content } = await import(
    `@/content/blog/${slug}/index.mdx`
  );

  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen">
        {/* Article — everything in the centered reading column */}
        <article className="px-6 py-12 md:py-16">
          <div className="max-w-[680px] mx-auto">
            {/* Meta */}
            <p
              className="mb-5"
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#a8a49e",
              }}
            >
              {post.date}&nbsp;&nbsp;·&nbsp;&nbsp;{post.readTime} read
            </p>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-didot)",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                fontStyle: "italic",
                color: "#2a2822",
                marginBottom: "1.25rem",
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "#78746c",
                marginBottom: "1.5rem",
              }}
            >
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex gap-2 mb-10 flex-wrap">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.18em] uppercase border border-[#e8e8e8] rounded-full px-3 py-1"
                    style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <hr style={{ border: "none", borderTop: "1px solid #e8e8e8", marginBottom: "3rem" }} />

            {/* Content */}
            <Content />
          </div>
        </article>

        {/* Footer */}
        <div className="border-t border-[#e8e8e8] px-6 md:px-16 py-10 flex items-center justify-between">
          <span
            className="text-[9px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
          >
            © {new Date().getFullYear()} Law Levisay
          </span>
          <Link
            href="/contact"
            className="text-[9px] uppercase tracking-[0.2em] text-[#2a2822] hover:text-[#7c3aed] transition-colors duration-200"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            Get in touch →
          </Link>
        </div>
      </main>
    </>
  );
}

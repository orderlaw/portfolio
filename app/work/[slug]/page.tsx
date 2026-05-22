import Link from "next/link";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { works } from "@/content/work/manifest";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/${slug}.mdx`);
  const url = `https://lawlevisay.com/work/${slug}`;
  const cleanTitle = (metadata.title as string).replace(/ — Law Levisay$/, "");
  return {
    title: cleanTitle,
    description: metadata.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${cleanTitle} — Law Levisay`,
      description: metadata.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanTitle} — Law Levisay`,
      description: metadata.description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: CaseStudy, metadata } = await import(
    `@/content/${slug}.mdx`
  );

  const displayTitle = (metadata.title as string).replace(
    / — Law Levisay$/,
    ""
  );

  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen">
        <article className="px-6 py-12 md:py-16">
          <div className="max-w-[680px] mx-auto">
            {/* Label */}
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
              Case Study
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
              {displayTitle}
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "#78746c",
                marginBottom: "1.5rem",
              }}
            >
              {metadata.description}
            </p>

            {/* Divider */}
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e8e8e8",
                marginBottom: "3rem",
              }}
            />

            {/* Content */}
            <CaseStudy />
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

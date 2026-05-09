import Link from "next/link";
import Nav from "@/components/Nav";
import type { Metadata } from "next";

const SLUGS = [
  "erpnext-inventory-automation",
  "woocommerce-n8n-integration",
  "supabase-erpnext-workflow",
];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = await import(`@/content/${slug}.mdx`);
  return { title: metadata.title, description: metadata.description };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: CaseStudy } = await import(`@/content/${slug}.mdx`);

  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen">
        <div>
          {/* Back link */}
          <div className="px-6 md:px-16 pt-10 pb-0">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-[#78746c] hover:text-[#7c3aed] transition-colors duration-200"
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              <span>←</span>
              <span>Selected Works</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-[#e8e8e8]" />

          {/* Content */}
          <article className="px-6 md:px-16 py-16 md:py-24">
            <CaseStudy />
          </article>

          {/* Footer strip */}
          <div className="border-t border-[#e8e8e8] px-6 md:px-16 py-10 flex items-center justify-between">
            <span
              className="text-[#a8a49e] text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              © {new Date().getFullYear()} Law Levisay
            </span>
            <Link
              href="/#contact"
              className="text-[#2a2822] hover:text-[#7c3aed] transition-colors duration-200 text-[9px] tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              Get in touch →
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

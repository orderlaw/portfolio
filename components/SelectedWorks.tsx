"use client";

import Image from "next/image";
import Link from "next/link";
import HeadingReveal from "./HeadingReveal";
import { works } from "@/content/work/manifest";

const FEATURED_SLUGS = [
  "the-store-that-ran-itself",
  "razorpay-payment-automation",
  "cod-order-confirmation",
];

const VISUAL: Record<string, { headerBg: string; textColor: string; rotation: string; zIndex: number }> = {
  "the-store-that-ran-itself":    { headerBg: "#3A3A3A",   textColor: "#fdf5f3", rotation: "-1.8deg", zIndex: 10 },
  "razorpay-payment-automation":  { headerBg: "#1e3a38",   textColor: "#eef5f4", rotation: "1.2deg",  zIndex: 20 },
  "cod-order-confirmation":       { headerBg: "#7a3b2e",   textColor: "#fdf6f0", rotation: "-0.7deg", zIndex: 30 },
};

const FEATURED = FEATURED_SLUGS.map((slug) => {
  const work = works.find((w) => w.slug === slug)!;
  return { ...work, ...VISUAL[slug] };
});

export default function SelectedWorks() {
  return (
    <section id="work" className="relative bg-transparent pt-16 md:pt-24 pb-0">
      <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-16" style={{ borderBottom: "1px solid var(--border)" }}>
        <p
          className="text-[9px] uppercase tracking-[0.28em] mb-4"
          style={{ fontFamily: "var(--font-fauna)", color: "var(--muted)" }}
        >
          Selected Works
        </p>
        <HeadingReveal
          lines={[
            { text: "Projects that", color: "var(--ink)", delay: 0.05 },
            { text: "stayed running.", color: "#7c3aed", italic: true, delay: 0.18 },
          ]}
        />
      </div>

      <div className="relative z-10 pt-16 md:pt-24">
        {FEATURED.map((work, i) => (
          <div
            key={work.slug}
            className="mx-6 md:mx-16 relative"
            style={{
              zIndex: work.zIndex,
              marginTop: i === 0 ? 0 : "-160px",
              transform: `rotate(${work.rotation})`,
              transition: "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
              background: work.headerBg,
              boxShadow: "-7px 0px 10px rgba(0,0,0,0.35), 2px 2px 6px rgba(0,0,0,0.07)",
              willChange: "transform",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translateY(-44px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = `rotate(${work.rotation})`;
            }}
          >
            {/* Header */}
            <div className="relative overflow-hidden" style={{ padding: "1.5rem 1.5rem" }}>
              <div className="relative z-10 flex flex-col gap-3 md:grid md:gap-10 md:items-start" style={{ gridTemplateColumns: "34% 1fr" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.3rem, 2.4vw, 2.2rem)",
                    color: work.textColor,
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {work.title}
                </h3>

                <div className="flex flex-col gap-4">
                  <p
                    style={{
                      fontFamily: "var(--font-fauna)",
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color: work.textColor,
                      opacity: 0.85,
                      margin: 0,
                      maxWidth: "58ch",
                    }}
                  >
                    {work.description}
                  </p>

                  <div className="flex md:justify-end">
                    <Link
                      href={`/work/${work.slug}`}
                      style={{
                        border: `1px solid ${work.textColor}`,
                        color: work.textColor,
                        borderRadius: 9999,
                        padding: "0.35rem 1rem",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        fontFamily: "var(--font-fauna)",
                        background: "transparent",
                        opacity: 0.9,
                        display: "inline-block",
                        textDecoration: "none",
                      }}
                    >
                      Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div style={{ padding: "0 2rem 1.5rem 2rem" }}>
              <div className="relative overflow-hidden" style={{ height: "200px" }}>
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover"
                  sizes="82vw"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View all */}
      <div className="relative z-10 px-6 md:px-16 py-8 flex justify-end" style={{ borderBottom: "1px solid var(--border)" }}>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 hover:text-[#7c3aed] transition-colors duration-200"
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          View all works
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

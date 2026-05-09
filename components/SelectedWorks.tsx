"use client";

import Image from "next/image";

function Grain({ id, opacity = 0.28 }: { id: string; opacity?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-sw-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-sw-${id})`} opacity={opacity} />
      </svg>
    </div>
  );
}


const WORKS = [
  {
    id: "1",
    title: "ERPNext Inventory Automation",
    desc: "Automated stock sync and procurement across 3 retail locations. Built custom doctypes, scripted reorder triggers, and eliminated manual purchase orders entirely. Stock discrepancies dropped to near zero within the first month.",
    pill: "Case Study →",
    headerBg: "#6B5C4E",
    textColor: "#F5F0E8",
    hasImage: true,
    imgSrc: "https://picsum.photos/seed/shelves/1400/500",
    rotation: "-1.8deg",
    zIndex: 10,
  },
  {
    id: "2",
    title: "WooCommerce + n8n Integration",
    desc: "End-to-end order automation from checkout through warehouse dispatch. n8n handles routing, status updates, and fulfilment triggers — no human touchpoints, no missed orders, no support tickets about shipping delays.",
    pill: "Case Study →",
    headerBg: "#3D5C4A",
    textColor: "#F0F5F0",
    hasImage: true,
    imgSrc: "https://picsum.photos/seed/ecommerce/1400/500",
    rotation: "1.2deg",
    zIndex: 20,
  },
  {
    id: "3",
    title: "Supabase + ERPNext Workflow",
    desc: "Real-time sync layer between operations and analytics. Every sale, stock movement, and supplier invoice flows into a single Supabase instance — giving the team one source of truth across every dashboard and report.",
    pill: "Case Study →",
    headerBg: "#7A5C2E",
    textColor: "#FAF5EC",
    hasImage: true,
    imgSrc: "https://picsum.photos/seed/database/1400/500",
    rotation: "-0.7deg",
    zIndex: 30,
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="relative bg-white pt-16 md:pt-24 pb-0">
      {/* Section grain — matches About / Nav / Hero */}
      <Grain id="section-bg" opacity={0.28} />

      <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-16 border-b border-[#e8e8e8]">
        <p
          className="text-[9px] uppercase text-[#78746c] tracking-[0.28em] mb-4"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          Selected Works
        </p>
        <h2
          className="text-[#2a2822] text-[clamp(3rem,6.5vw,5.5rem)] tracking-tight uppercase leading-[0.95]"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          Projects that
          <br />
          <span style={{ fontFamily: "var(--font-didot)", fontStyle: "italic", color: "#7c3aed" }}>
            stayed running.
          </span>
        </h2>
      </div>

      <div className="relative z-10 pt-16 md:pt-24">
        {WORKS.map((work, i) => (
          <div
            key={work.id}
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
            {/* Grain covers entire card — header + padding strips around image */}
            <Grain id={`card${work.id}`} opacity={0.32} />

            {/* Header */}
            <div
              className="relative overflow-hidden"
              style={{ padding: "1.5rem 1.5rem" }}
            >
              {/* Mobile: stack. Desktop: 2-col grid */}
              <div className="relative z-10 flex flex-col gap-3 md:grid md:gap-10 md:items-start"
                style={{ gridTemplateColumns: "34% 1fr" }}
              >
                {/* Title */}
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

                {/* Desc + button */}
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
                    {work.desc}
                  </p>

                  <div className="flex md:justify-end">
                    <button
                      style={{
                        border: `1px solid ${work.textColor}`,
                        color: work.textColor,
                        borderRadius: 9999,
                        padding: "0.35rem 1rem",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        fontFamily: "var(--font-fauna)",
                        background: "transparent",
                        cursor: "pointer",
                        opacity: 0.9,
                      }}
                    >
                      {work.pill}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image — inset with padding so card bg frames it */}
            {work.hasImage && (
              <div style={{ padding: "0 2rem 1.5rem 2rem" }}>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <Image
                    src={work.imgSrc}
                    alt={work.title}
                    fill
                    className="object-cover"
                    sizes="82vw"
                  />
                  <Grain id={`img${work.id}`} opacity={0.48} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

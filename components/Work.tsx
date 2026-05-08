"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

// ─── Grain ────────────────────────────────────────────────────────────────────

function Grain({ id }: { id: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} opacity="0.28" />
      </svg>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id:    1,
    tag:   "ERP · Automation",
    name:  "ERPNext Inventory Automation",
    desc:  "Automated stock sync and procurement for a 3-location retail operation.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80",
    alt:   "Warehouse inventory shelving",
    href:  "#",
  },
  {
    id:    2,
    tag:   "E-Commerce · Workflow",
    name:  "WooCommerce + n8n Integration",
    desc:  "End-to-end order flow from checkout to warehouse without manual intervention.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
    alt:   "E-commerce analytics screen",
    href:  "#",
  },
  {
    id:    3,
    tag:   "Database · Analytics",
    name:  "Supabase + ERPNext Workflow",
    desc:  "Custom dashboard layer with real-time sync between operations and analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
    alt:   "Analytics dashboard",
    href:  "#",
  },
] as const;

const NAV_H = 56; // must match Nav height in px
const N     = PROJECTS.length;

// ─── Work ─────────────────────────────────────────────────────────────────────

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const init = async () => {
      const gsap              = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        imgRefs.current.forEach((imgEl, i) => {
          if (!imgEl || !containerRef.current) return;

          // Parallax scoped to each sheet's portion of the container scroll range
          gsap.fromTo(
            imgEl,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger:             containerRef.current,
                start:               `${((i     / N) * 100).toFixed(2)}% top`,
                end:                 `${(((i+1) / N) * 100).toFixed(2)}% top`,
                scrub:               1,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    };

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="work" className="bg-white">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="relative px-6 md:px-16 pt-8 md:pt-32 pb-6 md:pb-14 border-b border-[#e8e8e8]">
        <Grain id="grain-work-hdr" />
        <p
          className="relative z-10 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          Selected Works
        </p>
        <h2
          className="relative z-10 mt-3 text-[#1C1917] text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.93] tracking-tight uppercase"
          style={{ fontFamily: "var(--font-didot)" }}
        >
          Projects that<br />stayed running.
        </h2>
      </div>

      {/* ── Stacking sheets ──────────────────────────────────────────────── */}
      {/*
        Container height = N × 100vh — the total scroll budget.
        Each sheet is sticky at NAV_H and fills the remaining viewport.
        Higher z-index sheets slide up and cover the ones beneath.
      */}
      <div ref={containerRef} style={{ height: `${N * 100}vh` }}>

        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="sticky flex flex-col bg-white"
            style={{
              top:       NAV_H,
              height:    `calc(100vh - ${NAV_H}px)`,
              zIndex:    10 + i * 10,
              boxShadow: i > 0 ? "0 -6px 40px rgba(0,0,0,0.05)" : "none",
            }}
          >

            {/* ── Text panel ─────────────────────────────────────────────── */}
            <div
              className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-6 px-6 md:px-16 shrink-0"
              style={{
                height:        "42%",
                paddingTop:    "clamp(0.75rem,2vh,2rem)",
                paddingBottom: "clamp(0.75rem,2vh,2rem)",
              }}
            >
              <Grain id={`grain-sheet-${i}`} />
              <div className="relative z-10 flex flex-col gap-2">
                <span
                  className="text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
                  style={{ fontFamily: "var(--font-fauna)" }}
                >
                  {project.tag}
                </span>
                <h3
                  className="text-[#1C1917] text-[clamp(1.3rem,3vw,3.2rem)] leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--font-didot)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-[#78746c] text-xs leading-relaxed max-w-xs md:max-w-sm"
                  style={{ fontFamily: "var(--font-fauna)" }}
                >
                  {project.desc}
                </p>
              </div>

              {/* View Case pill */}
              <div className="relative z-10 shrink-0 md:self-end">
                <a
                  href={project.href}
                  className="group relative inline-block border border-[#1C1917] text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
                  style={{ fontFamily: "var(--font-fauna)", padding: "0.48rem 1.4rem" }}
                >
                  <span className="block text-[#1C1917] group-hover:-translate-y-[130%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    View Case
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center gap-1 translate-y-[130%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <span style={{ color: "#7C3AED" }}>→</span>
                    <span className="text-[#1C1917]">View Case</span>
                  </span>
                </a>
              </div>
            </div>

            {/* ── Separator ──────────────────────────────────────────────── */}
            <div className="h-px bg-[#e8e8e8] shrink-0" />

            {/* ── Image panel with parallax ───────────────────────────────── */}
            <div className="relative overflow-hidden flex-1">
              {/* 130% tall, offset -15% top — gives 30% travel room for parallax */}
              <div
                ref={(el) => { imgRefs.current[i] = el; }}
                className="absolute inset-x-0 w-full"
                style={{ height: "130%", top: "-15%" }}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const heroStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes charUp {
    from { opacity: 0; transform: translateY(60%); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function CharReveal({
  text,
  startDelay,
  color = "#2a2822",
}: {
  text: string;
  startDelay: number;
  color?: string;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-didot)",
        fontSize: "clamp(2.8rem, 11vw, 11rem)",
        lineHeight: 0.88,
        color,
        textTransform: "uppercase" as const,
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: 0,
            animation: "charUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards",
            animationDelay: `${startDelay + i * 0.055}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

const TAGS = ["n8n", "WooCommerce", "Supabase", "ERPNext"];

export default function Hero() {
  return (
    <section
      className="bg-white flex flex-col pt-14 relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      {/* Grain */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.28" />
        </svg>
      </div>

      {/* BLOCK 2 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-4 sm:gap-5 px-8 md:px-16">

        <p
          className="text-[#2a2822] text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.32em] uppercase"
          style={{
            fontFamily: "var(--font-fauna)",
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
          }}
        >
          Freelance · Automation Developer
        </p>

        <div>
          <CharReveal text="LAW"     startDelay={0.3} />
          <CharReveal text="LEVISAY" startDelay={0.5} color="#7c3aed" />
        </div>

        <p
          className="text-[#2a2822] text-xs sm:text-sm md:text-base leading-relaxed max-w-[260px] sm:max-w-xs md:max-w-sm"
          style={{
            fontFamily: "var(--font-fauna)",
            fontStyle: "italic",
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.2s forwards",
          }}
        >
          I build systems that run without you — n8n workflows, WooCommerce
          integrations, and ERPNext automations.
        </p>
      </div>

      {/* BLOCK 3 */}
      <div
        className="relative z-10 flex items-center justify-between gap-3 px-8 md:px-16 border-t border-[#e8e8e8] shrink-0 py-3 sm:py-0 sm:h-14"
        style={{
          opacity: 0,
          animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.4s forwards",
        }}
      >
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="text-[#2a2822] text-[9px] sm:text-[10px] tracking-[0.15em] uppercase"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 shrink-0"
        >
          <div className="w-px h-5 bg-gradient-to-b from-[#7c3aed] to-transparent" />
          <span
            className="text-[#2a2822] text-[9px] tracking-[0.2em] uppercase hidden sm:inline"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            Scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}

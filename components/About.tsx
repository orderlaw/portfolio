"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ─── Grain ────────────────────────────────────────────────────────────────────

function Grain() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-about">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-about)" opacity="0.28" />
      </svg>
    </div>
  );
}

// ─── Kinetic primitives ───────────────────────────────────────────────────────

function AnimLabel({ children }: { children: string }) {
  const ref     = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const inView  = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.p
      ref={ref}
      className="text-[9px] uppercase text-[#78746c]"
      style={{ fontFamily: "var(--font-fauna)" }}
      initial={{ opacity: 0, letterSpacing: reduced ? "0.28em" : "0.55em" }}
      animate={inView ? { opacity: 1, letterSpacing: "0.28em" } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.p>
  );
}

function WordFlow({
  text,
  className,
  style,
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView  = useInView(ref, { once: true, margin: "-8%" });

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, display: "flex", flexWrap: "wrap", columnGap: "0.28em" }}
    >
      {text.split(" ").map((word, i) => (
        <div key={i} style={{ overflow: "hidden" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: reduced ? "0%" : "108%", opacity: reduced ? 1 : 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.65, delay: baseDelay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

function BlurReveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView  = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, filter: reduced ? "blur(0px)" : "blur(14px)", scale: reduced ? 1 : 0.96 }}
      animate={inView ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
      transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

export default function About() {
  const reduced    = useReducedMotion();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingIn  = useInView(headingRef, { once: true, margin: "-5%" });

  const didot = { fontFamily: "var(--font-didot)" };
  const serif = { fontFamily: "var(--font-playfair)" };

  return (
    <section id="about" className="relative bg-white">
      <Grain />

      {/* ── Heading ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-8 md:px-16 pt-16 md:pt-24 pb-10 border-b border-[#e8e8e8]">
        <AnimLabel>About</AnimLabel>
        <div ref={headingRef} className="mt-4">
          {[
            { text: "I build the", delay: 0.05 },
            { text: "infrastructure", delay: 0.18 },
          ].map(({ text, delay }) => (
            <div key={text} className="overflow-hidden leading-[0.95]">
              <motion.div
                className="text-[#2a2822] text-[clamp(2.4rem,6.5vw,5.5rem)] tracking-tight uppercase"
                style={didot}
                initial={{ y: reduced ? "0%" : "108%" }}
                animate={headingIn ? { y: "0%" } : {}}
                transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
          <div className="overflow-hidden leading-[0.95]">
            <motion.div
              className="text-[clamp(2.4rem,6.5vw,5.5rem)] tracking-tight"
              style={{ ...didot, color: "#7c3aed", fontStyle: "italic" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={headingIn ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.31, ease: [0.22, 1, 0.36, 1] }}
            >
              of momentum.
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Image — magazine offset ─────────────────────────────────────── */}
      {/* Replace src with your own photo when ready */}
      <div className="relative z-10 py-12 md:py-16 border-b border-[#e8e8e8]">

        {/* Full-width on mobile, editorial column on desktop */}
        <div className="w-[92vw] md:w-[62vw] lg:w-[58vw]">
          <div className="relative overflow-hidden h-[52vh] md:h-[68vh] lg:h-[72vh]">
            <Image
              src="/me.jpg"
              alt="Law Levisay"
              fill
              unoptimized
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 92vw, (max-width: 1024px) 62vw, 58vw"
            />
          </div>
          {/* Caption aligned with the content column */}
          <p
            className="mt-3 text-[9px] tracking-[0.28em] uppercase text-[#78746c] pl-8 md:pl-16"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            Remote · Since 2022
          </p>
        </div>

      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 border-b border-[#e8e8e8]">

        {/* Left — The Setup */}
        <div className="px-8 md:px-16 py-12 lg:border-r border-[#e8e8e8]">
          <AnimLabel>01 / The Setup</AnimLabel>
          <WordFlow
            text="I'm a freelance automation developer working with founders and ops teams to build systems that remove the repetitive work — permanently. My stack: ERPNext, WooCommerce, n8n, Supabase."
            className="mt-5 text-[#2a2822] text-base md:text-lg leading-relaxed"
            style={serif}
            baseDelay={0.05}
          />
        </div>

        {/* Right — The Process */}
        <div className="px-8 md:px-16 py-12">
          <AnimLabel>02 / The Process</AnimLabel>
          <WordFlow
            text="If you don't catch me building a workflow, I'm probably designing the architecture behind it. I take on a small number of projects at a time — every integration gets the same care I'd apply to my own tools."
            className="mt-5 text-[#2a2822] text-base md:text-lg leading-relaxed"
            style={serif}
            baseDelay={0.05}
          />
        </div>
      </div>

      {/* ── Quote ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-8 md:px-16 py-16 md:py-24">
        <AnimLabel>The Signature</AnimLabel>
        <BlurReveal
          className="mt-6 text-[#2a2822] text-[clamp(1.8rem,5vw,4rem)] leading-[1.1] tracking-tight"
          style={{ ...serif, fontStyle: "italic" }}
        >
          "The best automation is the one you forget is running."
        </BlurReveal>
        <motion.p
          className="mt-6 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
          style={{ fontFamily: "var(--font-fauna)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          — Law Levisay, Automation Developer
        </motion.p>
      </div>
    </section>
  );
}

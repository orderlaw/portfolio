"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

// ─── Slit Expand Image ───────────────────────────────────────────────────────

function SlitExpandImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress: revealProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.5"],
  });
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const maxReveal = useMotionValue(reduced ? 1 : 0);
  useEffect(() => {
    if (reduced) return;
    return revealProgress.on("change", (v) => {
      if (v > maxReveal.get()) maxReveal.set(v);
    });
  }, [revealProgress, maxReveal, reduced]);

  const rawInset = useTransform(maxReveal, [0, 1], [48, 0]);
  const inset    = useSpring(rawInset, { stiffness: 80, damping: 15 });
  const clipPath = useTransform(inset, (v) => `inset(0 ${Math.max(0, v)}% 0 ${Math.max(0, v)}%)`);

  const rawY     = useTransform(parallaxProgress, [0, 1], [35, -35]);
  const parallaxY = useSpring(rawY, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="relative overflow-hidden w-full aspect-[4/3]">
      <motion.div style={{ clipPath }} className="absolute inset-0">
        <motion.div style={{ y: parallaxY }} className="absolute w-full h-[130%] -top-[15%]">
          <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Diagonal Wipe Image ─────────────────────────────────────────────────────

function DiagonalWipeImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress: revealProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.5"],
  });
  const { scrollYProgress: parallaxProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const maxReveal = useMotionValue(reduced ? 1 : 0);
  useEffect(() => {
    if (reduced) return;
    return revealProgress.on("change", (v) => {
      if (v > maxReveal.get()) maxReveal.set(v);
    });
  }, [revealProgress, maxReveal, reduced]);

  const rawP = useTransform(maxReveal, [0, 1], [0, 1]);
  const p    = useSpring(rawP, { stiffness: 55, damping: 20 });
  const clipPath = useTransform(
    p,
    (v) => `polygon(0% 0%, ${v * 100 + 18}% 0%, ${v * 100}% 100%, 0% 100%)`
  );

  const rawY      = useTransform(parallaxProgress, [0, 1], [35, -35]);
  const parallaxY = useSpring(rawY, { stiffness: 50, damping: 20 });

  return (
    <div ref={ref} className="relative overflow-hidden w-full aspect-[4/3]">
      <motion.div style={{ clipPath }} className="absolute inset-0">
        <motion.div style={{ y: parallaxY }} className="absolute w-full h-[130%] -top-[15%]">
          <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Line Reveal ─────────────────────────────────────────────────────────────

function LineReveal({ lines, className = "" }: { lines: string[]; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reduced  = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.span
            className="block"
            initial={{ clipPath: reduced ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.85, delay: i * 0.11, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {line || " "}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ROW1_LINES = [
  "I'm a freelance automation developer",
  "working with founders and ops teams to build",
  "systems that remove the repetitive work —",
  "permanently.",
  " ",
  "My stack: ERPNext, WooCommerce, n8n, Supabase.",
  "I connect the tools you rely on into workflows",
  "that communicate without manual intervention.",
];

const ROW2_LINES = [
  "If you don't catch me building a workflow,",
  "I'm probably designing the architecture",
  "behind it. I take on a small number of",
  "projects at a time — every integration",
  "gets the same care I'd apply to my own tools.",
  " ",
  "The best automation is the one that's still",
  "running six months from now, silently.",
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function About() {
  const reduced     = useReducedMotion();
  const headingRef  = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });

  return (
    <section id="about" className="relative bg-white border-t border-[#e8e8e8]">

      {/* Grain */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain-about">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-about)" opacity="0.28" />
        </svg>
      </div>

      <div className="relative z-10 px-8 md:px-16 pt-20 md:pt-28">

        {/* ── Label + Heading ─────────────────────────────────────────────── */}
        {/* ref lives on the un-transformed wrapper so IO fires on the real layout rect */}
        <div ref={headingRef} className="mb-12 md:mb-16">
          <motion.p
            className="text-[#78746c] text-[9px] tracking-[0.28em] uppercase mb-5"
            style={{ fontFamily: "var(--font-fauna)" }}
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            About
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="text-[#2a2822] text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.92] tracking-tight uppercase"
              style={{ fontFamily: "var(--font-didot)" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              I build the infrastructure{" "}
              <span style={{ color: "#7c3aed", fontStyle: "italic", textTransform: "none" }}>
                of momentum.
              </span>
            </motion.h2>
          </div>
        </div>

        {/* ── Row 1: Image left · Text right ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] border-t border-[#e8e8e8]">

          {/* Image */}
          <div className="py-10 lg:py-14 lg:pr-12 lg:border-r border-[#e8e8e8]">
            <SlitExpandImage
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
              alt="Code on a screen"
            />
          </div>

          {/* Text */}
          <div className="py-10 lg:py-14 lg:pl-12 flex items-center">
            <LineReveal
              lines={ROW1_LINES}
              className="text-[#2a2822] text-sm md:text-base leading-[1.85]"
            />
          </div>
        </div>

        {/* ── Row 2: Text left · Image right ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] border-t border-[#e8e8e8]">

          {/* Text */}
          <div className="order-2 lg:order-1 py-10 lg:py-14 lg:pr-12 lg:border-r border-[#e8e8e8] flex items-center">
            <LineReveal
              lines={ROW2_LINES}
              className="text-[#2a2822] text-sm md:text-base leading-[1.85]"
            />
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 py-10 lg:py-14 lg:pl-12">
            <DiagonalWipeImage
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
              alt="Dashboard and analytics"
            />
          </div>
        </div>

        {/* ── Quote: blur → sharp ─────────────────────────────────────────── */}
        <div className="border-t border-[#e8e8e8] py-16 md:py-20">
          <motion.p
            className="text-[#2a2822] text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.25] max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            initial={{ opacity: 0, filter: "blur(18px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            "The best automation is the one you forget is running."
          </motion.p>
          <motion.p
            className="text-[#78746c] text-[9px] tracking-[0.28em] uppercase mt-6"
            style={{ fontFamily: "var(--font-fauna)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            — Law Levisay, Automation Developer
          </motion.p>
        </div>

      </div>
    </section>
  );
}

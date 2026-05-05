"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScramble } from "./ScrambleText";

const projects = [
  {
    index: "01",
    category: "Inventory · ERPs",
    title: "SSoT Inventory Sync",
    description:
      "Eliminated data drift across warehouse, accounting, and storefront by building a real-time single source of truth between ERPNext and WooCommerce. Zero manual reconciliation. Zero oversells.",
    outcome: "47% fewer stock discrepancies",
    stack: ["n8n", "ERPNext", "WooCommerce", "PostgreSQL"],
    bg: "#1e1c18",
  },
  {
    index: "02",
    category: "Content · SEO · AI",
    title: "SEO Automation Pipeline",
    description:
      "End-to-end pipeline that crawls competitor rankings, generates AI-drafted briefs, triggers writer assignments, and publishes to CMS — zero human touchpoints between data and draft.",
    outcome: "300+ pages / month",
    stack: ["n8n", "OpenAI", "Supabase", "Webflow"],
    bg: "#1a1424",
  },
  {
    index: "03",
    category: "Ecommerce · Integration",
    title: "WooCommerce Integration",
    description:
      "Replaced a brittle plugin chain with a headless architecture — custom REST bridge, real-time order state machine, and automated fulfilment routing to 3PL based on SKU rules.",
    outcome: "Sub-200ms order confirmation",
    stack: ["WooCommerce", "Supabase", "n8n", "Stripe"],
    bg: "#141e1a",
  },
];

function ViewLink({ href }: { href: string }) {
  const { display, scramble, reset } = useScramble("View Project →", 16);
  return (
    <a
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="text-[#7c3aed] text-[10px] tracking-[0.18em] uppercase border-b border-[#7c3aed]/30 pb-px hover:border-[#7c3aed] transition-colors duration-150"
      style={{ fontFamily: "var(--font-fauna)", display: "inline-block", minWidth: "9rem" }}
    >
      {display}
    </a>
  );
}

function ProjectCard({ p, i }: { p: (typeof projects)[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const isFlipped = i % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`grid md:grid-cols-2 gap-0 border-b border-[#d2cec4] py-0`}
    >
      {/* Image column */}
      <motion.div
        className={`relative overflow-hidden aspect-[4/3] md:aspect-auto min-h-[280px] md:min-h-[360px] ${isFlipped ? "md:order-2" : "md:order-1"}`}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: p.bg }}
      >
        {/* Inner image parallax wrapper */}
        <motion.div className="absolute inset-0 scale-110" style={{ y: imgY }}>
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,.08) 40px,rgba(255,255,255,.08) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,.08) 40px,rgba(255,255,255,.08) 41px)",
            }}
          />
        </motion.div>

        {/* Big index watermark */}
        <span
          className="absolute inset-0 flex items-center justify-center text-white/[0.06] font-black select-none pointer-events-none"
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(5rem, 12vw, 10rem)" }}
        >
          {p.index}
        </span>

        {/* Category label */}
        <div className="absolute bottom-5 left-5">
          <span
            className="text-white/50 text-[9px] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            {p.category}
          </span>
        </div>
      </motion.div>

      {/* Content column */}
      <div
        className={`flex flex-col justify-center gap-6 p-8 md:p-12 bg-[#f0ede7] ${isFlipped ? "md:order-1" : "md:order-2"}`}
      >
        {/* Index */}
        <span className="text-[#7c3aed] text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-fauna)" }}>
          {p.index}
        </span>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h3
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#2a2822] leading-[0.92] tracking-tight"
            style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
            }}
          >
            {p.title}
          </motion.h3>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#78746c] text-sm leading-relaxed"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          {p.description}
        </motion.p>

        {/* Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {p.stack.map((tag) => (
            <span
              key={tag}
              className="border border-[#d2cec4] text-[#78746c] text-[9px] tracking-[0.12em] uppercase px-2.5 py-1"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Outcome + link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-between pt-2 border-t border-[#d2cec4]"
        >
          <div>
            <p className="text-[#a8a49e] text-[9px] tracking-[0.18em] uppercase mb-0.5" style={{ fontFamily: "var(--font-fauna)" }}>
              Result
            </p>
            <p className="text-[#2a2822] text-sm font-semibold" style={{ fontFamily: "var(--font-fauna)" }}>
              {p.outcome}
            </p>
          </div>
          <ViewLink href="#" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-[#eceae4]">
      {/* Section header */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-24 pt-20 pb-10">
        <div className="flex items-baseline justify-between border-b border-[#d2cec4] pb-6 mb-2">
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#2a2822] leading-none tracking-tight"
              style={{ fontFamily: "var(--font-cinzel)", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", textTransform: "uppercase" }}
            >
              Selected Work
            </motion.h2>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#a8a49e] text-[10px] tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            3 Case Studies
          </motion.span>
        </div>
      </div>

      {/* Project cards — edge-to-edge */}
      <div className="border-t border-[#d2cec4]">
        {projects.map((p, i) => (
          <ProjectCard key={p.index} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}

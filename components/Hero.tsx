"use client";

import { motion, useReducedMotion } from "framer-motion";


export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-white flex flex-col pt-14 relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Oversized ghost monogram — fills the dead space without a stock asset */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute -right-[4vw] top-1/2 -translate-y-1/2 hidden md:block"
        style={{
          fontFamily: "var(--font-didot)",
          fontSize: "clamp(16rem, 34vw, 34rem)",
          lineHeight: 1,
          color: "var(--ink)",
          opacity: 0.045,
        }}
      >
        LL
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16">

        {/* Signature line */}
        <motion.p
          className="text-[10px] md:text-xs tracking-[0.22em] uppercase mb-5 md:mb-6"
          style={{ fontFamily: "var(--font-fauna)", color: "var(--muted)" }}
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Law Levisay — Operations Automation
        </motion.p>

        {/* Headline: the value prop, not the name */}
        <h1
          className="leading-[0.95] tracking-tight mb-8 md:mb-10 max-w-4xl"
          style={{ fontFamily: "var(--font-didot)", fontSize: "clamp(2.75rem, 6.4vw, 5.5rem)" }}
        >
          <div className="overflow-hidden">
            <motion.div
              style={{ color: "var(--ink)" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Every tool you run
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              style={{ color: "#7c3aed" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              creates a gap.
            </motion.div>
          </div>
        </h1>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg leading-relaxed max-w-md md:max-w-lg mb-8 md:mb-10"
          style={{ fontFamily: "var(--font-fauna)", color: "var(--ink)" }}
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Gaps need people. People make mistakes. We close them — so your mornings go to growing the business, not fixing it.
        </motion.p>

        {/* Book a Call */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="https://cal.com/lawlevisay"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-block text-[11px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
            style={{ fontFamily: "var(--font-fauna)", padding: "0.85rem 2.25rem", background: "var(--ink)" }}
          >
            <span className="block group-hover:-translate-y-[150%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "#fff" }}>
              Book a Call
            </span>
            <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "#fff" }}>
              Book a Call
            </span>
          </a>
        </motion.div>

      </div>

      {/* Separator */}
      <div className="relative z-10 shrink-0" style={{ borderTop: "1px solid var(--border)" }} />
    </section>
  );
}

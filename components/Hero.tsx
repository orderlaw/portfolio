"use client";

import { motion, useReducedMotion } from "framer-motion";


export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      className="bg-white flex flex-col pt-14 relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16">

        {/* Name */}
        <h1
          className="uppercase leading-[0.9] tracking-tight mb-8 md:mb-10"
          style={{ fontFamily: "var(--font-didot)", fontSize: "clamp(4.5rem, 13vw, 11rem)" }}
        >
          <div className="overflow-hidden">
            <motion.div
              style={{ color: "var(--ink)" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Law
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              style={{ color: "#7c3aed", fontStyle: "italic" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              Levisay
            </motion.div>
          </div>
        </h1>

        {/* Description */}
        <motion.p
          className="text-sm md:text-base leading-relaxed max-w-sm md:max-w-md mb-8 md:mb-10"
          style={{ fontFamily: "var(--font-fauna)", fontStyle: "italic", color: "var(--ink)" }}
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Every tool you run creates a gap. Gaps need people. People make mistakes. We close the gaps. So the first thing you do every morning is actually grow your business.
        </motion.p>

        {/* Let's Talk + email */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#"
            className="group relative inline-block text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
            style={{ fontFamily: "var(--font-fauna)", padding: "0.5rem 1.75rem", border: "1px solid var(--ink)" }}
          >
            <span className="block group-hover:-translate-y-[130%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "var(--ink)" }}>
              Book a Call
            </span>
            <span className="absolute inset-0 flex items-center justify-center translate-y-[130%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "var(--ink)" }}>
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

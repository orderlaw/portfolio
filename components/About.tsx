"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
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

function AnimLabel({ children }: { children: string }) {
  const ref    = useRef<HTMLParagraphElement>(null);
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

function BlurReveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref    = useRef<HTMLDivElement>(null);
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

// ─── Bio section ─────────────────────────────────────────────────────────────

const BIO =
  "I'm a freelance automation developer — the kind who reads the docs, tests the edge cases, and doesn't ghost you after deployment. I work with founders and ops teams who are tired of doing the same thing twice. If a human is repeating it, a system should own it.";

function AboutBody() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const imgRef  = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const img  = imgRef.current;
    const text = textRef.current;
    if (!img || !text) return;

    if (reduced) {
      img.style.filter = "none";
      text.querySelectorAll<HTMLElement>(".l").forEach((el) => { el.style.opacity = "1"; });
      return;
    }

    // Image: snap blur off when it enters the viewport
    const imgObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      img.style.transition = "filter 0.4s cubic-bezier(0.25,0.46,0.45,0.94)";
      img.style.filter = "none";
      imgObs.disconnect();
    }, { threshold: 0.1 });
    imgObs.observe(img);

    // Text: reveal letters when paragraph enters the viewport
    let timerId: ReturnType<typeof setInterval>;
    const textObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const letters = text.querySelectorAll<HTMLElement>(".l");
      let i = 0;
      timerId = setInterval(() => {
        const end = Math.min(i + 12, letters.length);
        for (let j = i; j < end; j++) letters[j].style.opacity = "1";
        i = end;
        if (i >= letters.length) clearInterval(timerId);
      }, 8);
      textObs.disconnect();
    }, { threshold: 0.1 });
    textObs.observe(text);

    return () => {
      imgObs.disconnect();
      textObs.disconnect();
      clearInterval(timerId);
    };
  }, [reduced]);

  return (
    <div className="relative z-10 border-b border-[#e8e8e8] px-6 md:px-16 py-8 md:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:gap-14 items-start">

        {/* Left — image + caption */}
        <div
          ref={imgRef}
          className="shrink-0 w-full max-w-[220px] md:w-52"
          style={{ filter: reduced ? "none" : "blur(22px)" }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/me.jpg"
              alt="Law Levisay"
              fill
              unoptimized
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 220px, 208px"
            />
          </div>
          <p
            className="mt-4 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            Remote · Since 2022
          </p>
        </div>

        {/* Right — bio text + LinkedIn */}
        <div className="flex-1 flex flex-col justify-between gap-10">
          <p
            ref={textRef}
            className="text-[#2a2822] text-[clamp(1.2rem,2.8vw,2.6rem)] leading-[1.35] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", overflowWrap: "break-word" }}
          >
            {BIO.split(" ").map((word, wi) => (
              <span
                key={wi}
                style={{ display: "inline-block", marginRight: "0.28em", whiteSpace: "nowrap" }}
              >
                {word.split("").map((char, ci) => (
                  <span key={ci} className="l" style={{ opacity: reduced ? 1 : 0.08, transition: "opacity 0.15s" }}>
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </p>

          {/* LinkedIn pill */}
          <div>
            <a
              href="https://linkedin.com/in/lawlevisay"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block border border-[#2a2822] text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
              style={{ fontFamily: "var(--font-fauna)", padding: "0.5rem 1.75rem" }}
            >
              <span className="block text-[#2a2822] group-hover:-translate-y-[130%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                Connect on LinkedIn
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-[130%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] text-[#2a2822]">
                → View Profile
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
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
      <div className="relative z-10 px-6 md:px-16 pt-10 md:pt-24 pb-6 md:pb-10 border-b border-[#e8e8e8]">
        <AnimLabel>About</AnimLabel>
        <div ref={headingRef} className="mt-4">
          {[
            { text: "I build the", delay: 0.05 },
            { text: "infrastructure", delay: 0.18 },
          ].map(({ text, delay }) => (
            <div key={text} className="overflow-hidden leading-[0.95]">
              <motion.div
                className="text-[#2a2822] text-[clamp(3rem,6.5vw,5.5rem)] tracking-tight uppercase"
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
              className="text-[clamp(3rem,6.5vw,5.5rem)] tracking-tight"
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

      {/* ── Image + Bio ─────────────────────────────────────────────────── */}
      <AboutBody />

      {/* ── Quote ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 px-6 md:px-16 py-8 md:py-24">
        <AnimLabel>The Signature</AnimLabel>
        <BlurReveal
          className="mt-6 text-[#2a2822] text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight"
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

"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function AnimLabel({ children }: { children: string }) {
  const ref    = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const inView  = useInView(ref, { once: true, margin: "-5%" });
  return (
    <motion.p
      ref={ref}
      className="text-[9px] uppercase"
      style={{ fontFamily: "var(--font-fauna)", color: "var(--muted)" }}
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

const BIO =
  "I work with founders and ops teams who are tired of doing the same shit twice. I find the money being lost, the time being wasted, the opportunities slipping through, and build the automation and AI systems that stop all of it.";

function AboutBody() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLParagraphElement>(null);
  const reduced    = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap              = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        if (imgRef.current) {
          gsap.fromTo(
            imgRef.current,
            { filter: "blur(22px)" },
            {
              filter: "blur(0px)",
              duration: 0.35,
              ease: "power4.out",
              scrollTrigger: {
                trigger:             imgRef.current,
                start:               "top 88%",
                toggleActions:       "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (textRef.current) {
          const letters = textRef.current.querySelectorAll(".l");
          gsap.fromTo(
            letters,
            { opacity: 0.08 },
            {
              opacity:   1,
              stagger:   0.01,
              ease:      "none",
              scrollTrigger: {
                trigger:             sectionRef.current,
                start:               "top bottom",
                end:                 "center center",
                scrub:               1,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        ScrollTrigger.refresh();
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [reduced]);

  return (
    <div ref={sectionRef} className="relative z-10 px-6 md:px-16 py-8 md:py-24" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="flex flex-col gap-6 md:flex-row md:gap-14 items-start">

        {/* Left — image + caption */}
        <div
          ref={imgRef}
          className="shrink-0 w-full max-w-[220px] md:w-52"
          style={{ filter: reduced ? "none" : "blur(22px)" }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <Image
              src="/me.png"
              alt="Law Levisay"
              fill
              unoptimized
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 220px, 208px"
            />
          </div>
          <p
            className="mt-4 text-[9px] tracking-[0.28em] uppercase"
            style={{ fontFamily: "var(--font-fauna)", color: "var(--muted)" }}
          >
            Remote · Since 2022
          </p>
        </div>

        {/* Right — bio text + LinkedIn */}
        <div className="flex-1 flex flex-col justify-between gap-10">
          <p
            ref={textRef}
            className="text-[clamp(1.35rem,2.8vw,2.6rem)] leading-[1.35] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "var(--ink)", overflowWrap: "break-word" }}
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
              className="group relative inline-block text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
              style={{ fontFamily: "var(--font-fauna)", padding: "0.5rem 1.75rem", border: "1px solid var(--ink)" }}
            >
              <span className="block group-hover:-translate-y-[150%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "var(--ink)" }}>
                Connect on LinkedIn
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "var(--ink)" }}>
                → View Profile
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function About() {
  const reduced    = useReducedMotion();
  const headingRef = useRef<HTMLDivElement>(null);
  const headingIn  = useInView(headingRef, { once: true, margin: "-5%" });

  const didot = { fontFamily: "var(--font-didot)" };

  return (
    <section id="about" className="relative bg-transparent">
      <div className="relative z-10 px-6 md:px-16 pt-10 md:pt-24 pb-6 md:pb-10" style={{ borderBottom: "1px solid var(--border)" }}>
        <AnimLabel>About</AnimLabel>
        <div ref={headingRef} className="mt-4">
          <div className="overflow-hidden leading-[0.95]">
            <motion.div
              className="text-[clamp(3rem,6.5vw,5.5rem)] tracking-tight uppercase"
              style={{ ...didot, color: "var(--ink)" }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={headingIn ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              Who you
            </motion.div>
          </div>
          <div className="overflow-hidden leading-[0.95]">
            <motion.div
              className="text-[clamp(3rem,6.5vw,5.5rem)] tracking-tight"
              style={{ ...didot }}
              initial={{ y: reduced ? "0%" : "108%" }}
              animate={headingIn ? { y: "0%" } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <span style={{ color: "var(--ink)", textTransform: "uppercase" }}>are </span>
              <span style={{ color: "#7c3aed", fontStyle: "italic", textTransform: "uppercase" }}>hiring.</span>
            </motion.div>
          </div>
        </div>
      </div>

      <AboutBody />
    </section>
  );
}

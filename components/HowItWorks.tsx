"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeadingReveal from "./HeadingReveal";

const STEPS = [
  {
    number: "01",
    title: "Talk",
    desc: "You walk me through how your business operates — what's working, what isn't, and where your team is losing time to repetitive work. No prep needed. Just an honest conversation.",
  },
  {
    number: "02",
    title: "Scope",
    desc: "After the call, I map out your operations and come back with a clear breakdown: the problem, the solution, timeline, and cost. Plain English. No vague estimates. You approve everything before I start.",
  },
  {
    number: "03",
    title: "Build",
    desc: "I handle the entire build. When it's ready, we test it with your actual data — real orders, real scenarios — before anything goes live. Nothing ships without your sign-off.",
  },
  {
    number: "04",
    title: "Deploy",
    desc: "Once live, I walk you through how it works with a recorded demo and a one-pager for your team. I'm available for the first 30 days to adjust anything. Then it just runs.",
  },
];

const NAV_H = 56;

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolledIn = -(rect.top - NAV_H);
      const scrollable = el.offsetHeight - (window.innerHeight - NAV_H);
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, scrolledIn / scrollable));
      setActive(Math.min(Math.floor(progress * STEPS.length), STEPS.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToStep = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const absTop = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - (window.innerHeight - NAV_H);
    const target = absTop + (i / STEPS.length) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="process" className="relative bg-white">
      {/* Heading — normal document flow */}
      <div className="relative z-10 px-6 md:px-16 pt-16 md:pt-24 pb-10 md:pb-14 border-b border-[#e8e8e8]">
        <p
          className="text-[9px] uppercase text-[#78746c] tracking-[0.28em] mb-4"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          Process
        </p>
        <HeadingReveal
          lines={[
            { text: "How it", color: "#2a2822", delay: 0.05 },
            { text: "works.", color: "#7c3aed", italic: true, delay: 0.18 },
          ]}
        />
      </div>

      {/* Mobile — flat list */}
      <div className="md:hidden px-6 py-10 flex flex-col divide-y divide-[#e8e8e8]">
        {STEPS.map((step) => (
          <div key={step.number} className="py-8">
            <span
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                color: "#7c3aed",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              {step.number}
            </span>
            <p
              className="uppercase mb-4"
              style={{
                fontFamily: "var(--font-didot)",
                fontSize: "clamp(2.2rem, 10vw, 3rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#2a2822",
              }}
            >
              {step.title}
            </p>
            <p
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#78746c",
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop — tall scroll container */}
      <div
        className="hidden md:block"
        ref={containerRef}
        style={{ height: `calc(${STEPS.length + 1} * (100dvh - ${NAV_H}px))` }}
      >
        {/* Sticky panel */}
        <div
          className="sticky px-6 md:px-16 flex flex-col md:flex-row md:gap-16"
          style={{ top: `${NAV_H}px`, height: `calc(100dvh - ${NAV_H}px)` }}
        >
          {/* Left — steps */}
          <div
            className="flex flex-col justify-between md:w-[45%] py-10"
            style={{ height: "100%" }}
          >
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <div
                  key={step.number}
                  className="cursor-pointer select-none"
                  onClick={() => scrollToStep(i)}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-fauna)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      display: "block",
                      marginBottom: "0.25rem",
                      color: isActive ? "#2a2822" : "#b8b4ae",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {step.number}
                  </span>

                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-didot)",
                        fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                        color: "#7c3aed",
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? "translateX(0)" : "translateX(-8px)",
                        transition: "opacity 0.3s ease, transform 0.3s ease",
                        marginRight: "0.5rem",
                        lineHeight: 1,
                        display: "inline-block",
                        minWidth: "1.8rem",
                      }}
                    >
                      +
                    </span>

                    <span
                      style={{
                        fontFamily: "var(--font-didot)",
                        fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        color: isActive ? "#2a2822" : "#78746c",
                        opacity: isActive ? 1 : 0.5,
                        transition: "color 0.5s ease, opacity 0.5s ease",
                      }}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right — background number + description */}
          <div
            className="hidden md:flex md:w-[55%] flex-col justify-end py-10 relative"
            style={{ height: "100%" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-start pointer-events-none"
              style={{ paddingBottom: "6rem" }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    fontFamily: "var(--font-didot)",
                    fontSize: "clamp(12rem, 26vw, 22rem)",
                    color: "transparent",
                    WebkitTextStroke: "1px #e2ddd6",
                    lineHeight: 1,
                    userSelect: "none",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {STEPS[active].number}
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative z-10"
                style={{ maxWidth: "420px", marginLeft: "auto" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    style={{
                      fontFamily: "var(--font-fauna)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      color: "#7c3aed",
                    }}
                  >
                    {STEPS[active].number}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-didot)",
                      fontSize: "0.85rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#2a2822",
                    }}
                  >
                    {STEPS[active].title}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-fauna)",
                    fontSize: "1.05rem",
                    lineHeight: 1.75,
                    color: "#2a2822",
                  }}
                >
                  {STEPS[active].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

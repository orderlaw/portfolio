"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import HeadingReveal from "./HeadingReveal";
import Threads from "./Threads";

const STEPS = [
  {
    number: "01",
    title: "Consult",
    desc: "You walk me through how your business operates, what's working, what isn't, and where your team is losing time to repetitive work. No prep needed. Just an honest conversation.",
  },
  {
    number: "02",
    title: "Architect",
    desc: "After the call, I map out your operations and come back with a clear breakdown: the problem, the solution, timeline, and cost. Plain English. No vague estimates. You approve everything before I start.",
  },
  {
    number: "03",
    title: "Execute",
    desc: "I handle the entire build. When it's ready, we test it with your actual data (real orders, real scenarios) before anything goes live. Nothing ships without your sign-off.",
  },
  {
    number: "04",
    title: "Launch",
    desc: "Once live, I walk you through how it works with a recorded demo and a one-pager for your team. I'm available for the first 30 days to adjust anything. Then it just runs.",
  },
];

// One visual personality per step: calm/sparse -> dense/structured -> fast/turbulent -> resolved/calm
const THREAD_VISUALS = [
  { amplitude: 1, distance: 0.32, angle: -36, lineWidth: 4, lineBlur: 4 },
  { amplitude: 1.2, distance: 0.45, angle: -12, lineWidth: 6, lineBlur: 8 },
  { amplitude: 1.5, distance: 0.62, angle: 12, lineWidth: 10, lineBlur: 16 },
  { amplitude: 0.8, distance: 0.25, angle: 36, lineWidth: 5, lineBlur: 6 },
];

const NAV_H = 56;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [subProgress, setSubProgress] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const currentStep = Math.min(Math.max(Math.floor(p * STEPS.length), 0), STEPS.length - 1);
    const sp = Math.max(0, Math.min(1, p * STEPS.length - currentStep));
    setActive(currentStep);
    setSubProgress(sp);
    if (barRef.current) barRef.current.style.width = `${sp * 100}%`;
  });

  const nextVisual = THREAD_VISUALS[Math.min(active + 1, THREAD_VISUALS.length - 1)];
  const currentVisual = THREAD_VISUALS[active];
  const threadVisual = {
    amplitude: lerp(currentVisual.amplitude, nextVisual.amplitude, subProgress),
    distance: lerp(currentVisual.distance, nextVisual.distance, subProgress),
    angle: lerp(currentVisual.angle, nextVisual.angle, subProgress),
    lineWidth: lerp(currentVisual.lineWidth, nextVisual.lineWidth, subProgress),
    lineBlur: lerp(currentVisual.lineBlur, nextVisual.lineBlur, subProgress),
  };

  const scrollToStep = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const absTop = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - (window.innerHeight - NAV_H);
    const target = absTop + (i / STEPS.length) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section id="process" className="relative bg-transparent">
      <div className="relative z-10 px-6 md:px-16 pt-16 md:pt-24 pb-10 md:pb-14" style={{ borderBottom: "1px solid var(--border)" }}>
        <p
          className="text-[11px] uppercase tracking-[0.16em] mb-4"
          style={{ fontFamily: "var(--font-fauna)", color: "var(--ink)", opacity: 0.6 }}
        >
          Process
        </p>
        <HeadingReveal
          lines={[
            { text: "How it", color: "var(--ink)", delay: 0.05 },
            { text: "works.", color: "#7c3aed", italic: true, delay: 0.18 },
          ]}
        />
      </div>

      {/* Mobile — flat list */}
      <div className="md:hidden px-6 py-10 flex flex-col" style={{ borderBottom: "1px solid var(--border)" }}>
        {STEPS.map((step) => (
          <motion.div
            key={step.number}
            className="py-8"
            style={{ borderBottom: "1px solid var(--border)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.55em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            </motion.span>
            <div className="overflow-hidden mb-4">
              <motion.p
                className="uppercase italic"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-didot)",
                  fontSize: "clamp(2.2rem, 10vw, 3rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                }}
              >
                {step.title}
              </motion.p>
            </div>
            <p
              style={{
                fontFamily: "var(--font-fauna)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--muted)",
              }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Desktop — tall scroll container */}
      <div
        className="hidden md:block"
        ref={containerRef}
        style={{ height: `calc(2.5 * (100dvh - ${NAV_H}px))` }}
      >
        {/* Sticky panel */}
        <div
          className="sticky relative px-6 md:px-16 flex flex-col md:flex-row md:gap-16"
          style={{ top: `${NAV_H}px`, height: `calc(100dvh - ${NAV_H}px)` }}
        >
          {/* Left — steps */}
          <div
            className="flex flex-col justify-center md:w-[45%] gap-[6%] pt-10 pb-24"
            style={{ height: "100%" }}
          >
            {STEPS.map((step, i) => {
              const isActive = i === active;
              const isHover = hovered === i && !isActive;
              return (
                <div
                  key={step.number}
                  className="cursor-pointer select-none"
                  onClick={() => scrollToStep(i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    transform: isHover ? "translateX(6px)" : "translateX(0)",
                    transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-fauna)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.14em",
                      display: "block",
                      marginBottom: "0.25rem",
                      color: isActive || isHover ? "var(--ink)" : "var(--muted)",
                      transition: "color 0.3s ease",
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
                        opacity: isActive ? 1 : isHover ? 0.45 : 0,
                        transform: isActive || isHover ? "translateX(0)" : "translateX(-8px)",
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
                        fontStyle: "italic",
                        color: isActive || isHover ? "var(--ink)" : "var(--muted)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom ticker */}
          <div className="hidden md:block absolute bottom-0 left-6 md:left-16 right-6 md:right-16 pb-12">
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontFamily: "var(--font-fauna)", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#7c3aed" }}>
                {STEPS[active].number}
              </span>
              <span style={{ fontFamily: "var(--font-fauna)", fontSize: "0.7rem", letterSpacing: "0.14em", color: "var(--muted)" }}>
                {active < STEPS.length - 1 ? STEPS[active + 1].number : "Done"}
              </span>
            </div>
            <div className="relative w-full overflow-hidden" style={{ height: "1px", background: "var(--border)" }}>
              <div
                ref={barRef}
                className="absolute inset-y-0 left-0 bg-[#7c3aed]"
                style={{ width: "0%", willChange: "width" }}
              />
            </div>
          </div>

          {/* Right — background number + description */}
          <div
            className="hidden md:flex md:w-[55%] flex-col pt-10 pb-24 relative"
            style={{ height: "100%" }}
          >
            <div
              className="flex-1 min-h-0 relative pointer-events-none overflow-hidden"
              style={{ marginRight: "-4rem" }}
            >
              <Threads
                color={[0.47, 0.44, 0.4]}
                amplitude={threadVisual.amplitude}
                distance={threadVisual.distance}
                angle={threadVisual.angle}
                converge={0.25}
                opacity={0.5}
                lineWidth={threadVisual.lineWidth}
                lineBlur={threadVisual.lineBlur}
                enableMouseInteraction={false}
              />
            </div>

            <div
              className="shrink-0 pt-8 flex flex-col justify-center"
              style={{ maxWidth: "520px", marginLeft: "auto", minHeight: "17rem" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontFamily: "var(--font-fauna)", fontSize: "0.7rem", letterSpacing: "0.14em", color: "#7c3aed" }}>
                      {STEPS[active].number}
                    </span>
                    <span style={{ fontFamily: "var(--font-didot)", fontSize: "1rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink)" }}>
                      {STEPS[active].title}
                    </span>
                  </div>
                  <p style={{ fontFamily: "var(--font-fauna)", fontSize: "1.3rem", lineHeight: 1.7, color: "var(--ink)" }}>
                    {STEPS[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

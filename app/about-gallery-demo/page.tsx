"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const PANELS = 5;

// ─── Shared primitives ────────────────────────────────────────────────────────

function PanelLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={`text-[9px] tracking-[0.28em] uppercase ${
        light ? "text-white/50" : "text-[#78746c]"
      }`}
      style={{ fontFamily: "var(--font-fauna)" }}
    >
      {children}
    </p>
  );
}

// ─── Reduced-motion vertical fallback ─────────────────────────────────────────

function VerticalStack() {
  const body = "text-[#1C1917] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-loose";
  const serif = { fontFamily: "var(--font-playfair)" };

  return (
    <div className="bg-[#FAFAF9]">
      {/* 1 */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80"
          alt="Code on screen" fill className="object-cover" priority
        />
        <div className="absolute bottom-8 left-10"><PanelLabel light>The Setup</PanelLabel></div>
      </div>

      {/* 2 */}
      <div className="py-24 px-10 md:px-20 max-w-5xl">
        <PanelLabel>The Philosophy</PanelLabel>
        <p className={`mt-8 ${body}`} style={serif}>
          I'm a freelance automation developer working with founders and ops
          teams to build systems that remove the repetitive work —
          permanently. My stack: ERPNext, WooCommerce, n8n, Supabase. I
          connect the tools you rely on into workflows that communicate
          without manual intervention.
        </p>
      </div>

      {/* 3 */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
          alt="Analytics dashboard" fill className="object-cover"
        />
        <div className="absolute bottom-8 left-10"><PanelLabel light>The Proof</PanelLabel></div>
      </div>

      {/* 4 */}
      <div className="py-24 px-10 md:px-20 flex justify-end">
        <div className="max-w-5xl text-right">
          <PanelLabel>The Process</PanelLabel>
          <p className={`mt-8 ${body}`} style={serif}>
            If you don't catch me building a workflow, I'm probably designing
            the architecture behind it. I take on a small number of projects
            at a time — every integration gets the same care I'd apply to my
            own tools. The best automation is the one that's still running six
            months from now, silently.
          </p>
        </div>
      </div>

      {/* 5 */}
      <div className="py-24 px-10 md:px-20 border-t border-[#e8e8e8]">
        <PanelLabel>The Signature</PanelLabel>
        <p
          className="mt-10 text-[#1C1917] text-[clamp(2.2rem,6vw,5.5rem)] leading-[1.05]"
          style={{ ...serif, fontStyle: "italic" }}
        >
          "The best automation<br />is the one you forget<br />is running."
        </p>
        <p className="mt-8 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
          style={{ fontFamily: "var(--font-fauna)" }}>
          — Law Levisay, Automation Developer
        </p>
      </div>
    </div>
  );
}

// ─── Horizontal gallery ───────────────────────────────────────────────────────

export default function GalleryDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced      = useReducedMotion();

  // scrollYProgress: 0 when section top hits viewport top,
  //                  1 when section bottom hits viewport bottom.
  // Container height = PANELS × 100vh → gives (PANELS-1)×100vh of drive.
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Strip translates from 0 to -80 % of its own width (= -400 vw for 5 panels).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  // Progress bar
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // ── Image parallax (y-axis, vertical scroll drives vertical reveal) ─────────
  // Panel 1: slow, covers scrollYProgress 0 → 0.5
  const p1Y = useTransform(scrollYProgress, [0, 0.5], ["8%", "-15%"]);
  // Panel 3: faster, covers full range but strongest in 0.25 → 0.75 window
  const p3Y = useTransform(scrollYProgress, [0.25, 0.75], ["12%", "-22%"]);

  // ── Desaturation: images grey out when their panel is off-center ────────────
  // Panel 1 centred at progress=0; desaturates as we scroll away
  const p1Sat = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32],
    ["grayscale(0%)", "grayscale(0%)", "grayscale(75%)"]
  );
  // Panel 3 centred at progress=0.5; fades in and back out
  const p3Sat = useTransform(
    scrollYProgress,
    [0.28, 0.5, 0.72],
    ["grayscale(75%)", "grayscale(0%)", "grayscale(75%)"]
  );

  if (reduced) return <VerticalStack />;

  return (
    <>
      {/* ── Fixed progress bar ──────────────────────────────────────────────── */}
      <motion.div
        className="fixed bottom-0 left-0 z-50 h-[1px] bg-[#7C3AED] origin-left"
        style={{ width: barWidth }}
      />

      {/* ── Scroll driver — height creates the scrollable distance ──────────── */}
      <div ref={containerRef} style={{ height: `${PANELS * 100}vh` }}>

        {/* Sticky viewport — only this div is ever visible ─────────────────── */}
        <div className="sticky top-0 h-screen overflow-hidden bg-[#FAFAF9]">

          {/* Horizontal strip — 5 × 100vw wide, translated by x ───────────── */}
          <motion.div className="flex h-full" style={{ x }}>

            {/* ════════════════════════════════════════════════════════════════
                PANEL 1 — The Setup (full-bleed image, slow parallax)
            ════════════════════════════════════════════════════════════════ */}
            <div className="relative w-screen h-full flex-shrink-0 overflow-hidden bg-[#0d0d0d]">
              <motion.div
                className="absolute w-full h-[130%] -top-[15%]"
                style={{ y: p1Y, filter: p1Sat }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80"
                  alt="Code on a screen"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </motion.div>
              <div className="absolute bottom-10 left-10 z-10">
                <PanelLabel light>The Setup</PanelLabel>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                PANEL 2 — The Philosophy (left-aligned text, no animation)
            ════════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 bg-[#FAFAF9] flex items-center">
              <div className="px-10 md:px-20 lg:px-28 max-w-[56rem]">
                <PanelLabel>The Philosophy</PanelLabel>
                <p
                  className="mt-8 text-[#1C1917] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-loose"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  I'm a freelance automation developer working with founders
                  and ops teams to build systems that remove the repetitive
                  work — permanently. My stack: ERPNext, WooCommerce, n8n,
                  Supabase. I connect the tools you rely on into workflows
                  that communicate without manual intervention.
                </p>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                PANEL 3 — The Proof (faster inner parallax + grain overlay)
            ════════════════════════════════════════════════════════════════ */}
            <div className="relative w-screen h-full flex-shrink-0 overflow-hidden bg-[#090909]">
              <motion.div
                className="absolute w-full h-[140%] -top-[20%]"
                style={{ y: p3Y, filter: p3Sat }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
                  alt="Analytics dashboard"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>

              {/* Grain */}
              <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <filter id="grain-panel3">
                    <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#grain-panel3)" opacity="0.32" />
                </svg>
              </div>

              <div className="absolute bottom-10 left-10 z-20">
                <PanelLabel light>The Proof</PanelLabel>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                PANEL 4 — The Process (right-aligned text, no animation)
            ════════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 bg-[#FAFAF9] flex items-center justify-end">
              <div className="px-10 md:px-20 lg:px-28 max-w-[56rem] text-right">
                <PanelLabel>The Process</PanelLabel>
                <p
                  className="mt-8 text-[#1C1917] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-loose"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  If you don't catch me building a workflow, I'm probably
                  designing the architecture behind it. I take on a small
                  number of projects at a time — every integration gets the
                  same care I'd apply to my own tools. The best automation is
                  the one that's still running six months from now, silently.
                </p>
              </div>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                PANEL 5 — The Signature (oversized italic quote)
            ════════════════════════════════════════════════════════════════ */}
            <div className="w-screen h-full flex-shrink-0 bg-[#FAFAF9] flex items-center">
              <div className="px-10 md:px-20 lg:px-28">
                <PanelLabel>The Signature</PanelLabel>
                <p
                  className="mt-10 text-[#1C1917] text-[clamp(2.6rem,7vw,7.5rem)] leading-[1.04] tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                >
                  "The best automation
                  <br />
                  is the one you forget
                  <br />
                  is running."
                </p>
                <p
                  className="mt-10 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
                  style={{ fontFamily: "var(--font-fauna)" }}
                >
                  — Law Levisay, Automation Developer
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}

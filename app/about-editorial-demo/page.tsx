"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// ─── Grain overlay ────────────────────────────────────────────────────────────

function Grain({ id }: { id: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} opacity="0.28" />
      </svg>
    </div>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function Label({ children, light = false }: { children: string; light?: boolean }) {
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

// ─── Reduced-motion / mobile vertical fallback ────────────────────────────────

function VerticalFallback() {
  const serif = { fontFamily: "var(--font-playfair)" };
  const didot = { fontFamily: "var(--font-didot)" };
  const body  = "text-[#2a2822] text-[clamp(1rem,1.5vw,1.3rem)] leading-loose";

  return (
    <div className="relative bg-[#eceae4]">
      <Grain id="grain-vf" />

      {/* Heading */}
      <div className="relative z-10 px-6 md:px-16 pt-16 md:pt-24 pb-12 border-b border-[#d2cec4]">
        <Label>About</Label>
        <h1
          className="mt-5 text-[#2a2822] text-[clamp(2rem,5vw,4.5rem)] leading-[0.92] tracking-tight uppercase"
          style={didot}
        >
          I build the infrastructure{" "}
          <span style={{ color: "#7c3aed", fontStyle: "italic", textTransform: "none" }}>
            of momentum.
          </span>
        </h1>
      </div>

      {/* Panel 1 — image + text */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 border-b border-[#d2cec4]">
        <div className="relative h-[60vw] md:h-auto min-h-[380px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
            alt="Code on a screen" fill className="object-cover" priority
          />
        </div>
        <div className="relative bg-[#eceae4] px-6 md:px-12 py-14 overflow-hidden">
          <Grain id="grain-vf1" />
          {/* Ghost number */}
          <span
            aria-hidden
            className="absolute pointer-events-none select-none leading-none"
            style={{
              ...didot,
              fontSize: "clamp(10rem,22vw,26rem)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
              bottom: "-0.1em",
              left: "-0.05em",
            }}
          >
            01
          </span>
          <div className="relative z-10">
            <Label>01 / The Setup</Label>
            <p className={`mt-6 ${body}`} style={serif}>
              I'm a freelance automation developer working with founders and ops
              teams to build systems that remove the repetitive work —
              permanently.
            </p>
          </div>
        </div>
      </div>

      {/* Panel 2 — full-bleed image + card */}
      <div className="relative z-10 h-[70vw] min-h-[320px] md:h-[65vh] overflow-hidden border-b border-[#d2cec4]">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
          alt="Analytics dashboard" fill className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2a2822]/30" />
        <div
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2
                     w-[min(340px,80vw)] border border-[#d2cec4]
                     bg-[#eceae4] px-6 md:px-8 py-8"
        >
          <Label>Stack</Label>
          <p className="mt-4 text-[#2a2822] text-sm leading-loose" style={serif}>
            My stack: ERPNext, WooCommerce, n8n, Supabase. I connect the tools
            you rely on into workflows that communicate without manual
            intervention.
          </p>
        </div>
      </div>

      {/* Panel 3 — text */}
      <div className="relative z-10 bg-[#eceae4] px-6 md:px-20 py-16 md:py-20 overflow-hidden border-b border-[#d2cec4] flex justify-end">
        <Grain id="grain-vf3" />
        <span
          aria-hidden
          className="absolute pointer-events-none select-none leading-none"
          style={{
            ...didot,
            fontSize: "clamp(10rem,22vw,26rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
            bottom: "-0.1em",
            left: "-0.04em",
          }}
        >
          02
        </span>
        <div className="relative z-10 max-w-xl text-right">
          <Label>02 / The Process</Label>
          <p className={`mt-6 ${body}`} style={serif}>
            If you don't catch me building a workflow, I'm probably designing
            the architecture behind it. I take on a small number of projects at
            a time — every integration gets the same care I'd apply to my own
            tools. The best automation is the one that's still running six
            months from now, silently.
          </p>
        </div>
      </div>

      {/* Panel 4 — quote */}
      <div className="relative z-10 px-6 md:px-20 py-16 md:py-24">
        <Label>The Signature</Label>
        <p
          className="mt-8 text-[#2a2822] text-[clamp(1.8rem,5.5vw,5.5rem)] leading-[1.05] tracking-tight"
          style={{ ...serif, fontStyle: "italic" }}
        >
          "The best automation
          <br />is the one you forget
          <br />is running."
        </p>
        <p
          className="mt-8 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          — Law Levisay, Automation Developer
        </p>
      </div>
    </div>
  );
}

// ─── Gallery (desktop horizontal scroll) ─────────────────────────────────────

export default function EditorialDemo() {
  const reduced    = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Detect mobile — show vertical stack below lg breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    if (reduced || isMobile) return;

    let ctx: { revert: () => void } | null = null;

    (async () => {
      const gsapMod = await import("gsap");
      const stMod   = await import("gsap/ScrollTrigger");
      const gsap    = gsapMod.default;
      const { ScrollTrigger } = stMod;

      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const track   = trackRef.current;
      const bar     = progressRef.current;
      if (!wrapper || !track || !bar) return;

      const totalScroll = () => track.scrollWidth - window.innerWidth;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start:   "top top",
            end:     () => `+=${totalScroll()}`,
            scrub:   1,
            pin:     true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) bar.style.height = `${self.progress * 100}%`;
            },
          },
        });

        tl.to(track, { x: () => -totalScroll(), ease: "none" });

        // Ghost 01 — drifts left
        const ghost1 = wrapper.querySelector<HTMLElement>("[data-ghost='1']");
        if (ghost1) {
          gsap.to(ghost1, {
            x: "-8%",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end:   () => `+=${totalScroll() * 0.4}`,
              scrub: 2,
            },
          });
        }

        // Ghost 02 — drifts right
        const ghost3 = wrapper.querySelector<HTMLElement>("[data-ghost='3']");
        if (ghost3) {
          gsap.to(ghost3, {
            x: "8%",
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: () => `top+=${totalScroll() * 0.55} top`,
              end:   () => `top+=${totalScroll()} top`,
              scrub: 2,
            },
          });
        }

        // Panel 2 card — slides in from right
        const card2 = wrapper.querySelector<HTMLElement>("[data-card='2']");
        if (card2) {
          gsap.fromTo(
            card2,
            { x: "60%", opacity: 0 },
            {
              x: "0%",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: () => `top+=${totalScroll() * 0.28} top`,
                end:   () => `top+=${totalScroll() * 0.52} top`,
                scrub: 1.5,
              },
            }
          );
        }
      }, wrapper);
    })();

    return () => { ctx?.revert(); };
  }, [reduced, isMobile]);

  if (reduced || isMobile) return <VerticalFallback />;

  const serif = { fontFamily: "var(--font-playfair)" };
  const didot = { fontFamily: "var(--font-didot)" };

  return (
    <>
      {/* Progress line — left edge */}
      <div className="fixed left-0 top-0 w-[1px] h-screen bg-[#d2cec4] z-50" aria-hidden />
      <div
        ref={progressRef}
        className="fixed left-0 top-0 w-[1px] bg-[#7c3aed] z-50 origin-top"
        style={{ height: "0%" }}
        aria-hidden
      />

      {/* Static heading */}
      <div className="relative bg-[#eceae4] px-10 md:px-20 pt-20 pb-14 border-b border-[#d2cec4] overflow-hidden">
        <Grain id="grain-head" />
        <div className="relative z-10">
          <Label>About</Label>
          <h1
            className="mt-5 text-[#2a2822] text-[clamp(2rem,5vw,4.5rem)] leading-[0.92] tracking-tight uppercase"
            style={didot}
          >
            I build the infrastructure{" "}
            <span style={{ color: "#7c3aed", fontStyle: "italic", textTransform: "none" }}>
              of momentum.
            </span>
          </h1>
        </div>
      </div>

      {/* GSAP scroll wrapper */}
      <div ref={wrapperRef} className="overflow-hidden bg-[#eceae4]">

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-screen will-change-transform">

          {/* ═══ PANEL 1 — 01 / The Setup ═══ */}
          <div className="relative flex flex-shrink-0 w-screen h-full border-r border-[#d2cec4]">

            {/* Left — image */}
            <div className="relative w-1/2 h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
                alt="Code on a screen"
                fill className="object-cover" priority sizes="50vw"
              />
            </div>

            {/* Right — text + ghost */}
            <div className="relative w-1/2 h-full bg-[#eceae4] flex items-center overflow-hidden">
              <Grain id="grain-p1" />
              <span
                data-ghost="1"
                aria-hidden
                className="absolute pointer-events-none select-none"
                style={{
                  ...didot,
                  fontSize: "clamp(14rem,28vw,36rem)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
                  bottom: "-0.12em",
                  left: "-0.06em",
                  lineHeight: 1,
                }}
              >
                01
              </span>
              <div className="relative z-10 px-12 lg:px-16 max-w-lg">
                <Label>01 / The Setup</Label>
                <p
                  className="mt-8 text-[#2a2822] text-[clamp(1rem,1.3vw,1.3rem)] leading-loose"
                  style={serif}
                >
                  I'm a freelance automation developer working with founders
                  and ops teams to build systems that remove the repetitive
                  work — permanently.
                </p>
              </div>
            </div>
          </div>

          {/* ═══ PANEL 2 — The Stack ═══ */}
          <div className="relative flex-shrink-0 w-screen h-full overflow-hidden border-r border-[#d2cec4]">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
              alt="Analytics dashboard"
              fill className="object-cover" sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#2a2822]/20" />

            {/* Sliding card */}
            <div
              data-card="2"
              className="absolute right-12 lg:right-20 top-1/2 -translate-y-1/2
                         w-[min(420px,42vw)] border border-[#d2cec4]
                         bg-[#eceae4] px-10 py-10"
              style={{ opacity: 0 }}
            >
              <Grain id="grain-card2" />
              <div className="relative z-10">
                <Label>Stack</Label>
                <p className="mt-5 text-[#2a2822] text-sm leading-loose" style={serif}>
                  My stack: ERPNext, WooCommerce, n8n, Supabase. I connect the
                  tools you rely on into workflows that communicate without
                  manual intervention.
                </p>
              </div>
            </div>
          </div>

          {/* ═══ PANEL 3 — 02 / The Process ═══ */}
          <div className="relative flex-shrink-0 w-screen h-full bg-[#eceae4] border-r border-[#d2cec4] overflow-hidden flex items-center justify-end">
            <Grain id="grain-p3" />
            <span
              data-ghost="3"
              aria-hidden
              className="absolute pointer-events-none select-none"
              style={{
                ...didot,
                fontSize: "clamp(14rem,28vw,36rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
                bottom: "-0.12em",
                left: "-0.04em",
                lineHeight: 1,
              }}
            >
              02
            </span>
            <div className="relative z-10 px-12 lg:px-20 max-w-xl text-right">
              <Label>02 / The Process</Label>
              <p
                className="mt-8 text-[#2a2822] text-[clamp(1rem,1.3vw,1.3rem)] leading-loose"
                style={serif}
              >
                If you don't catch me building a workflow, I'm probably
                designing the architecture behind it. I take on a small number
                of projects at a time — every integration gets the same care
                I'd apply to my own tools. The best automation is the one
                that's still running six months from now, silently.
              </p>
            </div>
          </div>

          {/* ═══ PANEL 4 — The Signature ═══ */}
          <div className="relative flex-shrink-0 w-screen h-full bg-[#eceae4] flex items-center overflow-hidden">
            <Grain id="grain-p4" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#d2cec4]" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#d2cec4]" />
            <div className="relative z-10 px-12 lg:px-20 max-w-5xl">
              <Label>The Signature</Label>
              <p
                className="mt-10 text-[#2a2822] text-[clamp(2.4rem,6.5vw,7rem)] leading-[1.05] tracking-tight"
                style={{ ...serif, fontStyle: "italic" }}
              >
                "The best automation
                <br />is the one you forget
                <br />is running."
              </p>
              <p
                className="mt-10 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
                style={{ fontFamily: "var(--font-fauna)" }}
              >
                — Law Levisay, Automation Developer
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

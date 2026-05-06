"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// ─── Grain ────────────────────────────────────────────────────────────────────

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

// ─── Label ────────────────────────────────────────────────────────────────────

function Label({
  children,
  themeable = false,
}: {
  children: string;
  themeable?: boolean;
}) {
  return (
    <p
      className="text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
      style={{ fontFamily: "var(--font-fauna)" }}
      {...(themeable ? { "data-theme-label": "" } : {})}
    >
      {children}
    </p>
  );
}

// ─── Theme palette ────────────────────────────────────────────────────────────

const LIGHT = { bg: "#ffffff", text: "#2a2822", label: "#78746c" };
const DARK  = { bg: "#111110", text: "#ede9e3", label: "#a8a49e" };

// ─── Mobile / reduced-motion vertical fallback ────────────────────────────────

function VerticalFallback() {
  const serif = { fontFamily: "var(--font-playfair)" };
  const didot = { fontFamily: "var(--font-didot)" };
  const body  = "text-[#2a2822] text-[clamp(1rem,1.5vw,1.3rem)] leading-loose";

  return (
    <section id="about" className="relative bg-white">
      <Grain id="abt-grain-vf" />

      {/* Heading */}
      <div className="relative z-10 px-6 md:px-16 pt-16 md:pt-24 pb-12 border-b border-[#e8e8e8]">
        <Label>About</Label>
        <h2
          className="mt-5 text-[#2a2822] text-[clamp(2rem,5vw,4.5rem)] leading-[0.92] tracking-tight uppercase"
          style={didot}
        >
          I build the infrastructure{" "}
          <span style={{ color: "#7c3aed", fontStyle: "italic", textTransform: "none" }}>
            of momentum.
          </span>
        </h2>
      </div>

      {/* Panel 1 — image + text */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 border-b border-[#e8e8e8]">
        <div className="relative h-[60vw] md:h-auto min-h-[380px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
            alt="Code on a screen" fill className="object-cover" priority
          />
        </div>
        <div className="relative bg-white px-6 md:px-12 py-14 overflow-hidden">
          <Grain id="abt-grain-vf1" />
          <span
            aria-hidden className="absolute pointer-events-none select-none"
            style={{
              ...didot,
              fontSize: "clamp(10rem,22vw,26rem)",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
              bottom: "-0.1em", left: "-0.05em", lineHeight: 1,
            }}
          >01</span>
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
      <div className="relative z-10 h-[70vw] min-h-[320px] md:h-[65vh] overflow-hidden border-b border-[#e8e8e8]">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
          alt="Analytics dashboard" fill className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2a2822]/30" />
        <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2
                        w-[min(340px,80vw)] border border-[#d2cec4]
                        bg-white px-6 md:px-8 py-8">
          <Label>Stack</Label>
          <p className="mt-4 text-[#2a2822] text-sm leading-loose" style={serif}>
            My stack: ERPNext, WooCommerce, n8n, Supabase. I connect the tools
            you rely on into workflows that communicate without manual
            intervention.
          </p>
        </div>
      </div>

      {/* Panel 3 — text */}
      <div className="relative z-10 bg-white px-6 md:px-20 py-16 md:py-20 overflow-hidden border-b border-[#e8e8e8] flex justify-end">
        <Grain id="abt-grain-vf3" />
        <span
          aria-hidden className="absolute pointer-events-none select-none"
          style={{
            ...didot,
            fontSize: "clamp(10rem,22vw,26rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
            bottom: "-0.1em", left: "-0.04em", lineHeight: 1,
          }}
        >02</span>
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
        <p className="mt-8 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
          style={{ fontFamily: "var(--font-fauna)" }}>
          — Law Levisay, Automation Developer
        </p>
      </div>
    </section>
  );
}

// ─── About (desktop horizontal gallery) ──────────────────────────────────────

export default function About() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  const wrapperRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Vertical stack on tablet + mobile (below lg = 1024px)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // GSAP: horizontal scroll + instant dark-theme inversion
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

        // ── Horizontal scrub ──────────────────────────────────────────────
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

        // ── Ghost 01 drifts left ──────────────────────────────────────────
        const ghost1 = wrapper.querySelector<HTMLElement>("[data-ghost='1']");
        if (ghost1) {
          gsap.to(ghost1, {
            x: "-8%", ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end:   () => `+=${totalScroll() * 0.4}`,
              scrub: 2,
            },
          });
        }

        // ── Ghost 02 drifts right ─────────────────────────────────────────
        const ghost3 = wrapper.querySelector<HTMLElement>("[data-ghost='3']");
        if (ghost3) {
          gsap.to(ghost3, {
            x: "8%", ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: () => `top+=${totalScroll() * 0.55} top`,
              end:   () => `top+=${totalScroll()} top`,
              scrub: 2,
            },
          });
        }

        // ── Panel 2 card slides in ────────────────────────────────────────
        const card2 = wrapper.querySelector<HTMLElement>("[data-card='2']");
        if (card2) {
          gsap.fromTo(
            card2,
            { x: "60%", opacity: 0 },
            {
              x: "0%", opacity: 1, ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: () => `top+=${totalScroll() * 0.28} top`,
                end:   () => `top+=${totalScroll() * 0.52} top`,
                scrub: 1.5,
              },
            }
          );
        }

        // ── Dark theme — fires instantly on enter/leave ───────────────────
        const bgs    = wrapper.querySelectorAll<HTMLElement>("[data-theme-bg]");
        const texts  = wrapper.querySelectorAll<HTMLElement>("[data-theme-text]");
        const labels = wrapper.querySelectorAll<HTMLElement>("[data-theme-label]");

        const goDark = () => {
          window.dispatchEvent(new CustomEvent("gallery-enter"));
          gsap.to(bgs,    { backgroundColor: DARK.bg,    duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
          gsap.to(texts,  { color: DARK.text,            duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
          gsap.to(labels, { color: DARK.label,           duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
        };
        const goLight = () => {
          window.dispatchEvent(new CustomEvent("gallery-leave"));
          gsap.to(bgs,    { backgroundColor: LIGHT.bg,   duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
          gsap.to(texts,  { color: LIGHT.text,           duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
          gsap.to(labels, { color: LIGHT.label,          duration: 0.4, ease: "power2.inOut", overwrite: "auto" });
        };

        ScrollTrigger.create({
          trigger:     wrapper,
          start:       "top top",
          end:         () => `+=${totalScroll()}`,
          onEnter:     goDark,
          onEnterBack: goDark,
          onLeave:     goLight,
          onLeaveBack: goLight,
        });

      }, wrapper);
    })();

    return () => { ctx?.revert(); };
  }, [reduced, isMobile]);

  if (reduced || isMobile) return <VerticalFallback />;

  const serif = { fontFamily: "var(--font-playfair)" };
  const didot = { fontFamily: "var(--font-didot)" };

  return (
    <section id="about">

      {/* Progress line — only visible during the gallery */}
      <div className="fixed left-0 top-0 w-[1px] h-screen bg-[#d2cec4] z-50 pointer-events-none" aria-hidden />
      <div
        ref={progressRef}
        className="fixed left-0 top-0 w-[1px] bg-[#7c3aed] z-50 origin-top pointer-events-none"
        style={{ height: "0%" }}
        aria-hidden
      />

      {/* Heading — stays light, scrolls away as gallery pins */}
      <div className="relative bg-white px-10 md:px-20 pt-20 pb-14 border-b border-[#e8e8e8] overflow-hidden">
        <Grain id="abt-grain-head" />
        <div className="relative z-10">
          <Label>About</Label>
          <h2
            className="mt-5 text-[#2a2822] text-[clamp(2rem,5vw,4.5rem)] leading-[0.92] tracking-tight uppercase"
            style={didot}
          >
            I build the infrastructure{" "}
            <span style={{ color: "#7c3aed", fontStyle: "italic", textTransform: "none" }}>
              of momentum.
            </span>
          </h2>
        </div>
      </div>

      {/* GSAP wrapper — pinned while scrolling */}
      <div ref={wrapperRef} className="overflow-hidden bg-white">
        <div ref={trackRef} className="flex h-screen will-change-transform">

          {/* ═══ PANEL 1 — image top/left | text bottom/right ═══ */}
          <div className="relative flex flex-col lg:flex-row flex-shrink-0 w-screen h-full border-r border-[#e8e8e8]">

            <div className="relative w-full h-1/2 lg:w-1/2 lg:h-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80"
                alt="Code on a screen"
                fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>

            <div
              data-theme-bg
              className="relative w-full h-1/2 lg:w-1/2 lg:h-full bg-white flex items-center overflow-hidden"
            >
              <Grain id="abt-grain-p1" />
              <span
                data-ghost="1" aria-hidden
                className="absolute pointer-events-none select-none"
                style={{
                  ...didot,
                  fontSize: "clamp(8rem,20vw,36rem)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
                  bottom: "-0.12em", left: "-0.06em", lineHeight: 1,
                }}
              >01</span>
              <div className="relative z-10 px-6 lg:px-16 max-w-lg">
                <Label themeable>01 / The Setup</Label>
                <p
                  data-theme-text
                  className="mt-4 lg:mt-8 text-[#2a2822] text-[clamp(0.85rem,1.3vw,1.3rem)] leading-loose"
                  style={serif}
                >
                  I'm a freelance automation developer working with founders
                  and ops teams to build systems that remove the repetitive
                  work — permanently.
                </p>
              </div>
            </div>
          </div>

          {/* ═══ PANEL 2 — full-bleed image + sliding card ═══ */}
          <div className="relative flex-shrink-0 w-screen h-full overflow-hidden border-r border-[#e8e8e8]">
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
              alt="Analytics dashboard"
              fill className="object-cover" sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#111110]/30" />

            <div
              data-card="2"
              data-theme-bg
              className="absolute right-4 lg:right-20 top-1/2 -translate-y-1/2
                         w-[min(420px,82vw)] border border-[#d2cec4]
                         bg-white px-6 py-6 lg:px-10 lg:py-10"
              style={{ opacity: 0 }}
            >
              <Grain id="abt-grain-card2" />
              <div className="relative z-10">
                <Label themeable>Stack</Label>
                <p
                  data-theme-text
                  className="mt-5 text-[#2a2822] text-sm leading-loose"
                  style={serif}
                >
                  My stack: ERPNext, WooCommerce, n8n, Supabase. I connect the
                  tools you rely on into workflows that communicate without
                  manual intervention.
                </p>
              </div>
            </div>
          </div>

          {/* ═══ PANEL 3 — right-aligned text + ghost 02 ═══ */}
          <div
            data-theme-bg
            className="relative flex-shrink-0 w-screen h-full bg-white border-r border-[#e8e8e8] overflow-hidden flex items-center justify-end"
          >
            <Grain id="abt-grain-p3" />
            <span
              data-ghost="3" aria-hidden
              className="absolute pointer-events-none select-none"
              style={{
                ...didot,
                fontSize: "clamp(14rem,28vw,36rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(124,58,237,0.10)",
                bottom: "-0.12em", left: "-0.04em", lineHeight: 1,
              }}
            >02</span>
            <div className="relative z-10 px-6 lg:px-20 max-w-xl text-right">
              <Label themeable>02 / The Process</Label>
              <p
                data-theme-text
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

          {/* ═══ PANEL 4 — oversized italic quote ═══ */}
          <div
            data-theme-bg
            className="relative flex-shrink-0 w-screen h-full bg-white flex items-center overflow-hidden"
          >
            <Grain id="abt-grain-p4" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#d2cec4]" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#d2cec4]" />
            <div className="relative z-10 px-6 lg:px-20 max-w-5xl">
              <Label themeable>The Signature</Label>
              <p
                data-theme-text
                className="mt-10 text-[#2a2822] text-[clamp(2.4rem,6.5vw,7rem)] leading-[1.05] tracking-tight"
                style={{ ...serif, fontStyle: "italic" }}
              >
                "The best automation
                <br />is the one you forget
                <br />is running."
              </p>
              <p
                data-theme-label
                className="mt-10 text-[9px] tracking-[0.28em] uppercase text-[#78746c]"
                style={{ fontFamily: "var(--font-fauna)" }}
              >
                — Law Levisay, Automation Developer
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

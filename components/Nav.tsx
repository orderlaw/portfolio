"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useScramble } from "./ScrambleText";

const links = [
  { label: "Work",    href: "#work" },
  { label: "About",   href: "#about" },
  { label: "Contact", href: "#contact" },
];

function ScramblePill({ text, href }: { text: string; href: string }) {
  const { display, scramble, reset } = useScramble(text);
  return (
    <a
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="border border-[#2a2822] text-[#2a2822] text-[10px] tracking-[0.18em] uppercase rounded-full hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors duration-200"
      style={{
        fontFamily: "var(--font-fauna)",
        display: "inline-block",
        width: "7rem",
        textAlign: "center",
        padding: "0.4rem 0",
      }}
    >
      {display}
    </a>
  );
}

export default function Nav() {
  const [galleryActive, setGalleryActive] = useState(false);

  useEffect(() => {
    const onEnter = () => setGalleryActive(true);
    const onLeave = () => setGalleryActive(false);
    window.addEventListener("gallery-enter", onEnter);
    window.addEventListener("gallery-leave", onLeave);
    return () => {
      window.removeEventListener("gallery-enter", onEnter);
      window.removeEventListener("gallery-leave", onLeave);
    };
  }, []);

  const hidden = galleryActive;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-8 md:px-16 bg-white border-b border-[#e8e8e8] overflow-hidden"
    >
      {/* Grain — matches Hero */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain-nav">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain-nav)" opacity="0.28" />
        </svg>
      </div>
      <a
        href="#"
        className="relative z-10 text-[#2a2822] font-black text-sm tracking-widest uppercase select-none"
        style={{ fontFamily: "var(--font-didot)" }}
      >
        LL
      </a>

      <nav className="relative z-10 hidden md:block">
        <ul className="flex gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[#2a2822] text-sm tracking-wide hover:text-[#7c3aed] transition-colors duration-200"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative z-10">
        <ScramblePill text="Let's Talk" href="#contact" />
      </div>
    </motion.header>
  );
}

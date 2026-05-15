"use client";

import { useEffect, useState } from "react";
import { useScramble } from "./ScrambleText";

const links = [
  { label: "About",   href: "#about" },
  { label: "Work",    href: "#work" },
  { label: "Process", href: "#process" },
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
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      if (!contact) return;
      const rect = contact.getBoundingClientRect();
      setHidden(rect.top <= window.innerHeight * 0.05);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[10001] h-14 flex items-center justify-between px-8 md:px-16 bg-white border-b border-[#e8e8e8] overflow-hidden"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        opacity: hidden ? 0 : 1,
        transition: "transform 0.45s cubic-bezier(0.65,0,0.35,1), opacity 0.45s ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* Nav-local grain so it matches the rest of the page regardless of z-index */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <filter id="grain-nav">
          <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-nav)" opacity="0.28" />
      </svg>
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
    </header>
  );
}

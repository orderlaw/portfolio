"use client";

import { motion } from "framer-motion";
import { useScramble } from "./ScrambleText";

function FooterLink({ label, href }: { label: string; href: string }) {
  const { display, scramble, reset } = useScramble(label, 18);
  return (
    <a
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      className="text-[10px] tracking-[0.15em] uppercase hover:text-[#7c3aed] transition-colors duration-200"
      style={{ fontFamily: "var(--font-fauna)", display: "inline-block", minWidth: `${label.length * 0.6}rem`, color: "var(--subtle)" }}
    >
      {display}
    </a>
  );
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="px-6 sm:px-10 md:px-16 lg:px-24 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border-md)" }}
    >
      <span className="text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: "var(--font-fauna)", color: "var(--subtle)" }}>
        © {new Date().getFullYear()} Law Levisay — All rights reserved
      </span>
      <div className="flex gap-8">
        {[{ label: "LinkedIn", href: "#" }, { label: "GitHub", href: "#" }, { label: "Twitter", href: "#" }].map((l) => (
          <FooterLink key={l.label} label={l.label} href={l.href} />
        ))}
      </div>
    </motion.footer>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeadingReveal from "./HeadingReveal";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const SERVICES = [
  "E-commerce Automation",
  "Systems Integration",
  "AI Implementation",
  "ERP & Operations",
  "CRM Setup & Automation",
  "Custom Backend Build",
  "Not sure yet",
];

const BUDGETS = [
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000 – $15,000",
  "$15,000+",
];

function RotatingBadge() {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const text = "GET IN TOUCH · GET IN TOUCH · ";
  return (
    <div
      className="relative shrink-0"
      style={{ width: "9rem", height: "9rem" }}
    >
      <svg
        viewBox="0 0 140 140"
        width="144"
        height="144"
        style={{ animation: "spin 12s linear infinite", display: "block" }}
      >
        <defs>
          <path
            id="badge-circle"
            d={`M 70,70 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "10.5",
            fill: "#eceae4",
            letterSpacing: "3.2",
          }}
        >
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      {/* Center arrow */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "spin-reverse 12s linear infinite" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eceae4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-reverse { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}

function UnderlineInput({
  num,
  label,
  name,
  type = "text",
  placeholder,
}: {
  num: string;
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-3">
        <span
          className="text-[11px] md:text-[9px] tracking-[0.22em] shrink-0"
          style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
        >
          {num}
        </span>
        <span
          className="text-sm md:text-[0.78rem]"
          style={{ fontFamily: "var(--font-fauna)", color: focused ? "#eceae4" : "#c4c0b8" }}
        >
          {label}
        </span>
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pb-2.5 text-[#eceae4] text-sm outline-none placeholder-[#6a6660] transition-colors duration-200"
        style={{
          fontFamily: "var(--font-fauna)",
          borderBottom: `1px solid ${focused ? "#7c3aed" : "#4e4a44"}`,
        }}
      />
    </div>
  );
}

function UnderlineSelect({
  num,
  label,
  name,
  options,
}: {
  num: string;
  label: string;
  name: string;
  options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-3">
        <span
          className="text-[11px] md:text-[9px] tracking-[0.22em] shrink-0"
          style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
        >
          {num}
        </span>
        <span
          className="text-sm md:text-[0.78rem]"
          style={{ fontFamily: "var(--font-fauna)", color: focused ? "#eceae4" : "#c4c0b8" }}
        >
          {label}
        </span>
      </div>
      <div className="relative">
        <select
          name={name}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pb-2.5 text-sm outline-none appearance-none cursor-pointer transition-colors duration-200"
          style={{
            fontFamily: "var(--font-fauna)",
            color: "#eceae4",
            borderBottom: `1px solid ${focused ? "#7c3aed" : "#4e4a44"}`,
          }}
        >
          <option value="" style={{ background: "#2a2822" }}>Choose from a list here</option>
          {options.map((o) => (
            <option key={o} value={o} style={{ background: "#2a2822" }}>{o}</option>
          ))}
        </select>
        <svg
          className="absolute right-0 bottom-3 pointer-events-none"
          width="10" height="10" viewBox="0 0 10 10" fill="none"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="#a8a49e" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function UnderlineTextarea({
  num,
  label,
  name,
  placeholder,
}: {
  num: string;
  label: string;
  name: string;
  placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-3">
        <span
          className="text-[11px] md:text-[9px] tracking-[0.22em] shrink-0"
          style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
        >
          {num}
        </span>
        <span
          className="text-sm md:text-[0.78rem]"
          style={{ fontFamily: "var(--font-fauna)", color: focused ? "#eceae4" : "#c4c0b8" }}
        >
          {label}
        </span>
      </div>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pb-2.5 text-[#eceae4] text-sm outline-none resize-none placeholder-[#6a6660] transition-colors duration-200"
        style={{
          fontFamily: "var(--font-fauna)",
          borderBottom: `1px solid ${focused ? "#7c3aed" : "#4e4a44"}`,
        }}
      />
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-[#0e0c08]"
    >
      {/* ── Top: heading + badge ───────────────────────────────────── */}
      <div className="px-6 md:px-16 pt-16 md:pt-24 pb-10 md:pb-14 border-b border-[#4e4a44] flex items-end justify-between gap-6">
        <div>
          <p
            className="text-[11px] md:text-[9px] uppercase tracking-[0.28em] mb-4"
            style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
          >
            Contact
          </p>
          <HeadingReveal
            lines={[
              { text: "Let's work", color: "#eceae4", delay: 0.05 },
              { text: "together.", color: "#7c3aed", italic: true, delay: 0.18 },
            ]}
          />
        </div>
        <div className="hidden md:block mb-2">
          <RotatingBadge />
        </div>
      </div>

      {/* ── Main: form + info ─────────────────────────────────────── */}
      <div className="px-6 md:px-16 py-12 md:py-16 grid md:grid-cols-[1.55fr_1fr] gap-14 md:gap-20 items-start">

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUp}><UnderlineInput num="01" label="What's your name?" name="name" placeholder="John Smith" /></motion.div>
          <motion.div variants={fadeUp}><UnderlineInput num="02" label="What's your email address?" name="email" type="email" placeholder="you@company.com" /></motion.div>
          <motion.div variants={fadeUp}><UnderlineInput num="03" label="What's your company or organisation?" name="company" placeholder="Acme Corp" /></motion.div>
          <motion.div variants={fadeUp}><UnderlineSelect num="04" label="What services are you looking for?" name="service" options={SERVICES} /></motion.div>
          <motion.div variants={fadeUp}><UnderlineSelect num="05" label="What have you budgeted for this project?" name="budget" options={BUDGETS} /></motion.div>
          <motion.div variants={fadeUp}><UnderlineTextarea num="06" label="Tell us about your project." name="message" placeholder="Walk me through what you're trying to automate..." /></motion.div>

          <motion.div variants={fadeUp} className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="group relative inline-block text-[10px] tracking-[0.2em] uppercase rounded-full overflow-hidden cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-fauna)", padding: "0.65rem 1.75rem", border: "1px solid #eceae4" }}
            >
              <span className="block group-hover:-translate-y-[150%] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "#eceae4" }}>
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "#eceae4" }}>
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
              </span>
            </button>
            {status === "error" && (
              <p className="text-[10px] tracking-[0.15em]" style={{ fontFamily: "var(--font-fauna)", color: "#ef4444" }}>
                Something went wrong. Try emailing directly.
              </p>
            )}
          </motion.div>
        </motion.form>

        {/* Contact info */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          className="flex flex-col gap-10 md:pt-2"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <p
              className="text-[11px] md:text-[9px] uppercase tracking-[0.28em] mb-3"
              style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
            >
              Email
            </p>
            <a
              href="mailto:lawlevisay@gmail.com"
              className="text-[#eceae4] text-sm hover:text-[#7c3aed] transition-colors duration-200"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              lawlevisay@gmail.com
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <p
              className="text-[11px] md:text-[9px] uppercase tracking-[0.28em] mb-3"
              style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
            >
              Availability
            </p>
            <p
              className="text-[#7c3aed] text-sm"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              One slot currently open
            </p>
            <p
              className="text-[#a8a49e] text-sm md:text-[0.78rem] leading-relaxed max-w-[22ch]"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              Typically respond within 24h. Happy to jump on a short discovery call first.
            </p>
            <a
              href="https://cal.com/lawlevisay"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block self-start text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer mt-2"
              style={{ fontFamily: "var(--font-fauna)", padding: "0.55rem 1.5rem", border: "1px solid #4e4a44" }}
            >
              <span className="block group-hover:-translate-y-[150%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "#eceae4" }}>
                Book a Call
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ color: "#eceae4" }}>
                Book a Call
              </span>
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p
              className="text-[11px] md:text-[9px] uppercase tracking-[0.28em]"
              style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
            >
              Connect
            </p>
            <a
              href="https://linkedin.com/in/lawlevisay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#eceae4] text-sm md:text-[0.78rem] hover:text-[#7c3aed] transition-colors duration-200"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://instagram.com/lawlevisay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#eceae4] text-sm md:text-[0.78rem] hover:text-[#7c3aed] transition-colors duration-200"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
            <a
              href="https://x.com/lawlevisay"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#eceae4] text-sm md:text-[0.78rem] hover:text-[#7c3aed] transition-colors duration-200"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────────── */}
      <div className="px-6 md:px-16 py-5 border-t border-[#4e4a44] flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <p
          className="text-[9px] uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-fauna)", color: "#706c66" }}
        >
          © {new Date().getFullYear()} Law Levisay
        </p>
        <p
          className="text-[9px] uppercase tracking-[0.22em]"
          style={{ fontFamily: "var(--font-fauna)", color: "#706c66" }}
        >
          Remote · Automation Developer
        </p>
      </div>
    </section>
  );
}

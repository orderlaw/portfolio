"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useScramble } from "./ScrambleText";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function SubmitButton() {
  const { display, scramble, reset } = useScramble("Send Message", 16);
  return (
    <MagneticButton strength={0.3}>
      <button
        type="submit"
        onMouseEnter={scramble}
        onMouseLeave={reset}
        className="group border border-[#2a2822] text-[#2a2822] text-[10px] tracking-[0.2em] uppercase px-8 py-4 hover:border-[#7c3aed] hover:text-[#7c3aed] transition-colors duration-250 flex items-center gap-3"
        style={{ fontFamily: "var(--font-fauna)", minWidth: "12rem" }}
      >
        {display}
        <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </button>
    </MagneticButton>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className="relative group">
      <label
        className="block text-[#a8a49e] text-[9px] tracking-[0.22em] uppercase mb-2.5 transition-colors duration-200"
        style={{ fontFamily: "var(--font-fauna)", color: focused ? "#7c3aed" : "#a8a49e" }}
      >
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        rows={textarea ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent border-b pb-3 text-[#2a2822] text-sm outline-none resize-none transition-colors duration-200 placeholder-[#d2cec4]"
        style={{
          fontFamily: "var(--font-fauna)",
          borderBottomColor: focused ? "#7c3aed" : "#d2cec4",
        }}
      />
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-[#eceae4] px-6 sm:px-10 md:px-16 lg:px-24 py-20 md:py-28">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b border-[#d2cec4] pb-6 mb-14">
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "105%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#2a2822] leading-none"
            style={{ fontFamily: "var(--font-cinzel)", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", textTransform: "uppercase" }}
          >
            Contact
          </motion.h2>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#7c3aed] text-[10px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          Open to projects
        </motion.span>
      </div>

      <div className="grid md:grid-cols-[1fr_1.1fr] gap-14 md:gap-20 items-start">
        {/* Left — headline + info */}
        <div className="flex flex-col gap-10">
          <div>
            {["Got a process", "that needs to", "disappear?"].map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.07 * i, ease: [0.22, 1, 0.36, 1] }}
                  className="block leading-[0.9]"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 700,
                    fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                    color: i === 2 ? "#7c3aed" : "#2a2822",
                  }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <p className="text-[#78746c] text-sm leading-relaxed max-w-xs" style={{ fontFamily: "var(--font-fauna)" }}>
              Typically respond within 24h. Happy to jump on a short discovery call before any commitment.
            </p>
            <div>
              <p className="text-[#a8a49e] text-[10px] tracking-[0.2em] uppercase mb-1" style={{ fontFamily: "var(--font-fauna)" }}>
                Availability
              </p>
              <p className="text-[#7c3aed] text-sm font-semibold" style={{ fontFamily: "var(--font-fauna)" }}>
                Open to new projects
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.form
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-8">
            <Field label="Your Name" name="name" />
            <Field label="Email Address" name="email" type="email" />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field label="Tell me about your project" name="message" textarea />
          </motion.div>

          <motion.div variants={fadeUp}>
            <SubmitButton />
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

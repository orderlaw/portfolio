"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Line {
  text: string;
  color: string;
  italic?: boolean;
  delay: number;
}

export default function HeadingReveal({ lines }: { lines: Line[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <div ref={ref}>
      {lines.map(({ text, color, italic, delay }) => (
        <div key={text} className="overflow-hidden leading-[0.95]">
          <motion.div
            className="text-[clamp(3rem,6.5vw,5.5rem)] tracking-tight uppercase"
            style={{
              fontFamily: "var(--font-didot)",
              color,
              fontStyle: italic ? "italic" : "normal",
            }}
            initial={{ y: reduced ? "0%" : "108%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

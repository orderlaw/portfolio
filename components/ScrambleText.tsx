"use client";

import { useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

export function useScramble(text: string, speed = 18) {
  const [display, setDisplay] = useState(text);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const frame = useRef(0);

  const scramble = () => {
    if (interval.current) clearInterval(interval.current);
    frame.current = 0;
    const total = text.replace(/\s/g, "").length * 4;

    interval.current = setInterval(() => {
      frame.current++;
      const resolved = Math.floor((frame.current / total) * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (/[\s']/.test(char)) return char;
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (frame.current >= total) {
        clearInterval(interval.current!);
        interval.current = null;
        setDisplay(text);
      }
    }, speed);
  };

  const reset = () => {
    if (interval.current) clearInterval(interval.current);
    interval.current = null;
    setDisplay(text);
  };

  return { display, scramble, reset };
}

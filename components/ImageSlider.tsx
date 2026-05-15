"use client";

import { useState } from "react";

export default function ImageSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images?.length) return null;
  if (images.length === 1)
    return (
      <span className="block my-8">
        <img
          src={images[0]}
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </span>
    );

  return (
    <div className="my-8" style={{ userSelect: "none" }}>
      {/* Image */}
      <div className="relative overflow-hidden w-full" style={{ background: "#f0ede7" }}>
        <img
          src={images[current]}
          alt=""
          style={{ width: "100%", height: "auto", display: "block" }}
        />

        {/* Prev */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-0 inset-y-0 flex items-center px-3 group"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: "2rem",
              height: "2rem",
              background: "rgba(236,234,228,0.85)",
              borderRadius: "50%",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2a2822" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </span>
        </button>

        {/* Next */}
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-0 inset-y-0 flex items-center px-3 group"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <span
            className="flex items-center justify-center transition-colors duration-200"
            style={{
              width: "2rem",
              height: "2rem",
              background: "rgba(236,234,228,0.85)",
              borderRadius: "50%",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2a2822" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        </button>
      </div>

      {/* Dots + counter */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              style={{
                width: i === current ? "1.4rem" : "0.35rem",
                height: "0.35rem",
                borderRadius: "9999px",
                background: i === current ? "#7c3aed" : "#c4c0b8",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.25s ease, background 0.25s ease",
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            color: "#a8a49e",
          }}
        >
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

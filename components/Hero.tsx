"use client";

const heroStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes charUp {
    from { opacity: 0; transform: translateY(60%); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function CharReveal({
  text,
  startDelay,
  color = "#2a2822",
}: {
  text: string;
  startDelay: number;
  color?: string;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-didot)",
        fontSize: "clamp(2.8rem, 11vw, 11rem)",
        lineHeight: 0.88,
        color,
        textTransform: "uppercase" as const,
      }}
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: 0,
            animation: "charUp 0.75s cubic-bezier(0.22,1,0.36,1) forwards",
            animationDelay: `${startDelay + i * 0.055}s`,
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="bg-white flex flex-col pt-14 relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />
      {/* Grain */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" opacity="0.28" />
        </svg>
      </div>

      {/* BLOCK 2 */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-4 sm:gap-5 px-8 md:px-16">

        <p
          className="text-[#2a2822] text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.32em] uppercase"
          style={{
            fontFamily: "var(--font-fauna)",
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
          }}
        >
          Freelance · Automation Developer
        </p>

        <div>
          <CharReveal text="LAW"     startDelay={0.3} />
          <CharReveal text="LEVISAY" startDelay={0.5} color="#7c3aed" />
        </div>

        <p
          className="text-[#2a2822] text-xs sm:text-sm md:text-base leading-relaxed max-w-[260px] sm:max-w-xs md:max-w-sm"
          style={{
            fontFamily: "var(--font-fauna)",
            fontStyle: "italic",
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.2s forwards",
          }}
        >
          I build systems that run without you — n8n workflows, WooCommerce
          integrations, and ERPNext automations.
        </p>

        {/* ── Email CTA ──────────────────────────────────────────────────── */}
        <div
          className="w-full max-w-[20rem] sm:max-w-sm md:max-w-md mt-2 flex flex-col gap-3"
          style={{
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.38s forwards",
          }}
        >
          {/* Underline input row */}
          <div className="flex items-end gap-4">
            <div
              className="flex items-end gap-2 flex-1 pb-1.5"
              style={{ borderBottom: "1px solid rgba(42,40,34,0.35)" }}
            >
              <span
                className="text-[9px] tracking-[0.28em] uppercase text-[#78746c] leading-none shrink-0"
                style={{ fontFamily: "var(--font-fauna)" }}
              >
                Email
              </span>
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 min-w-0 bg-transparent text-[#2a2822] text-[11px] outline-none placeholder:text-[#c4c0b8] leading-none"
                style={{ fontFamily: "var(--font-fauna)" }}
              />
            </div>

            {/* Sliding-text pill button */}
            <button
              className="group relative shrink-0 border border-[#2a2822] text-[#2a2822] text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
              style={{ fontFamily: "var(--font-fauna)", padding: "0.5rem 1.4rem" }}
            >
              {/* Default label — slides out upward */}
              <span className="block group-hover:-translate-y-[130%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                Commission Work
              </span>
              {/* Hover label — slides in from below */}
              <span className="absolute inset-0 flex items-center justify-center translate-y-[130%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                → Let's Build
              </span>
            </button>
          </div>

          {/* Footnote */}
          <p
            className="text-[9px] text-[#78746c]"
            style={{ fontFamily: "var(--font-fauna)", fontStyle: "italic" }}
          >
            Selective with projects — one slot currently open.
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="relative z-10 border-t border-[#e8e8e8] shrink-0" />
    </section>
  );
}

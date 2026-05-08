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
        fontSize: "clamp(3rem, 18vw, 11rem)",
        lineHeight: 0.88,
        color,
        textTransform: "uppercase" as const,
        whiteSpace: "nowrap",
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center gap-3 sm:gap-5 px-6 md:px-16">

        <p
          className="text-[#2a2822] text-[10px] tracking-[0.32em] uppercase"
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
          className="text-[#2a2822] text-sm md:text-base leading-relaxed max-w-[320px] md:max-w-sm"
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
          className="w-full max-w-[22rem] mt-2 flex flex-col gap-5"
          style={{
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 1.38s forwards",
          }}
        >
          {/* Full-width underline input */}
          <div
            className="flex items-end gap-3 w-full pb-2"
            style={{ borderBottom: "1px solid rgba(42,40,34,0.55)" }}
          >
            <span
              className="text-[11px] tracking-[0.18em] uppercase text-[#2a2822] shrink-0 leading-none"
              style={{ fontFamily: "var(--font-fauna)" }}
            >
              Email:
            </span>
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 min-w-0 bg-transparent text-[#2a2822] text-xs outline-none placeholder:text-[#c4c0b8] leading-none"
              style={{ fontFamily: "var(--font-fauna)" }}
            />
          </div>

          {/* Footnote */}
          <p
            className="text-[9px] text-[#78746c]"
            style={{ fontFamily: "var(--font-fauna)", fontStyle: "italic" }}
          >
            Selective with projects — one slot currently open.
          </p>

          {/* Centered pill button */}
          <div className="flex justify-center">
            <button
              className="group relative inline-block border border-[#2a2822] text-[10px] tracking-[0.18em] uppercase rounded-full overflow-hidden cursor-pointer"
              style={{ fontFamily: "var(--font-fauna)", padding: "0.55rem 2rem" }}
            >
              <span className="block text-[#2a2822] group-hover:-translate-y-[130%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                Commission Work
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-[130%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] text-[#2a2822]">
                → Let's Build
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="relative z-10 border-t border-[#e8e8e8] shrink-0" />
    </section>
  );
}

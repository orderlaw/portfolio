"use client";

const heroStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function Hero() {
  return (
    <section
      className="bg-white flex flex-col pt-14 relative overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <style dangerouslySetInnerHTML={{ __html: heroStyles }} />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16">

        {/* Name */}
        <h1
          className="text-[#2a2822] uppercase leading-[0.9] tracking-tight mb-10 md:mb-14"
          style={{
            fontFamily: "var(--font-didot)",
            fontSize: "clamp(4.5rem, 18vw, 18rem)",
            opacity: 0,
            animation: "fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s forwards",
          }}
        >
          Law<br />
          <span style={{ color: "#7c3aed", fontStyle: "italic" }}>Levisay</span>
        </h1>

        {/* Description */}
        <p
          className="text-[#2a2822] text-sm md:text-base leading-relaxed max-w-sm md:max-w-md mb-10 md:mb-14"
          style={{
            fontFamily: "var(--font-fauna)",
            fontStyle: "italic",
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.55s forwards",
          }}
        >
          A freelance automation developer building systems that run without you — n8n workflows, WooCommerce integrations, and ERPNext automations.
        </p>

        {/* Let's Talk + email */}
        <div
          style={{
            opacity: 0,
            animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.8s forwards",
          }}
        >
          <p
            className="text-[#2a2822] font-bold text-sm md:text-base mb-1"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            Let&apos;s Talk
          </p>
          <a
            href="mailto:lawlevisay@gmail.com"
            className="text-[#78746c] text-sm md:text-base hover:text-[#7c3aed] transition-colors duration-200"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            lawlevisay@gmail.com
          </a>
        </div>

      </div>

      {/* Separator */}
      <div className="relative z-10 border-t border-[#e8e8e8] shrink-0" />
    </section>
  );
}

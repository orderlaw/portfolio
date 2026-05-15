import Link from "next/link";
import Nav from "@/components/Nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works — Law Levisay",
  description:
    "Case studies on automation projects — n8n workflows, WooCommerce integrations, ERPNext systems, and more.",
};

const WORKS = [
  {
    slug: "the-store-that-ran-itself",
    title: "The Store That Ran Itself",
    description:
      "How I turned five disconnected tools into one operating system for a D2C electronics store — so orders, payments, shipping, and customer messages all handled themselves without anyone in the middle.",
  },
  {
    slug: "inventory-single-source-of-truth",
    title: "The Inventory Number Was a Lie",
    description:
      "How I replaced a stock count the team was constantly correcting by hand with a number that was always right — so oversells stopped happening and nobody had to think about inventory again.",
  },
  {
    slug: "shipping-automation",
    title: "After the Order Shipped, the Store Went Silent",
    description:
      "How I connected the shipping platform to everything else — so customers always knew where their order was, returns showed up the moment they happened, and the \"where is my order?\" messages stopped.",
  },
  {
    slug: "razorpay-payment-automation",
    title: "The Money Was Coming In. Nobody Knew Where It Was Going.",
    description:
      "How I made every payment log itself automatically — fees, net amount, and all — so the daily copy-paste ritual disappeared and the numbers were always right without anyone checking.",
  },
  {
    slug: "cod-order-confirmation",
    title: "The Order That Nobody Confirmed",
    description:
      "How I built a COD confirmation flow that turned ghost orders from a constant inventory drain into a problem that handles itself — automatically, every day, without anyone watching it.",
  },
];

export default function WorkPage() {
  const works = WORKS.map((w, i) => ({ ...w, index: i }));

  return (
    <>
      <Nav />
      <main className="pt-14 bg-white min-h-screen">
        {/* Header */}
        <div className="px-6 md:px-16 pt-14 md:pt-20 pb-10 md:pb-14 border-b border-[#e8e8e8]">
          <p
            className="text-[9px] uppercase tracking-[0.28em] mb-4"
            style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
          >
            Selected Works
          </p>
          <h1
            style={{
              fontFamily: "var(--font-didot)",
              fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#2a2822",
            }}
          >
            All works
          </h1>
        </div>

        {/* Work list */}
        <div>
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}`}
              className="group flex items-center gap-6 px-6 md:px-16 py-7 md:py-9 border-b border-[#e8e8e8] hover:bg-[#faf9f7] transition-colors duration-200"
            >
              {/* Number */}
              <span
                className="shrink-0 tabular-nums select-none"
                style={{
                  fontFamily: "var(--font-fauna)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  color: "#c4c0b8",
                  width: "1.8rem",
                }}
              >
                {String(work.index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="mb-1.5"
                  style={{
                    fontFamily: "var(--font-fauna)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#a8a49e",
                  }}
                >
                  Case Study
                </p>
                <p
                  className="transition-colors duration-200 group-hover:text-[#7c3aed] mb-2"
                  style={{
                    fontFamily: "var(--font-didot)",
                    fontSize: "clamp(1.1rem, 2vw, 1.55rem)",
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    color: "#2a2822",
                  }}
                >
                  {work.title}
                </p>
                <p
                  className="hidden md:block"
                  style={{
                    fontFamily: "var(--font-fauna)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    color: "#78746c",
                    maxWidth: "60ch",
                  }}
                >
                  {work.description}
                </p>
              </div>

              {/* Arrow */}
              <svg
                className="shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ color: "#c4c0b8" }}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          ))}
        </div>

        {/* Footer strip */}
        <div className="px-6 md:px-16 py-10 flex items-center justify-between">
          <span
            className="text-[9px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
          >
            © {new Date().getFullYear()} Law Levisay
          </span>
          <Link
            href="/#contact"
            className="text-[9px] uppercase tracking-[0.2em] text-[#2a2822] hover:text-[#7c3aed] transition-colors duration-200"
            style={{ fontFamily: "var(--font-fauna)" }}
          >
            Get in touch →
          </Link>
        </div>
      </main>
    </>
  );
}

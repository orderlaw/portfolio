"use client";

import Image from "next/image";
import Link from "next/link";
import HeadingReveal from "./HeadingReveal";

const WORKS = [
  {
    id: "1",
    slug: "the-store-that-ran-itself",
    title: "The Store That Ran Itself",
    desc: "How I turned five disconnected tools into one operating system for a D2C electronics store — so orders, payments, shipping, and customer messages all handled themselves without anyone in the middle.",
    pill: "Case Study →",
    headerBg: "#2a2822",
    textColor: "#eceae4",
    hasImage: true,
    imgSrc: "/images/work/the-store-that-ran-itself/google-datacenter.jpg",
    rotation: "-1.8deg",
    zIndex: 10,
  },
  {
    id: "2",
    slug: "razorpay-payment-automation",
    title: "The Money Was Coming In. Nobody Knew Where It Was Going.",
    desc: "How I made every payment log itself automatically — fees, net amount, and all — so the daily copy-paste ritual disappeared and the numbers were always right without anyone checking.",
    pill: "Case Study →",
    headerBg: "#302832",
    textColor: "#ede8f0",
    hasImage: true,
    imgSrc: "/images/work/razorpay-payment-automation/payments.jpg",
    rotation: "1.2deg",
    zIndex: 20,
  },
  {
    id: "3",
    slug: "cod-order-confirmation",
    title: "The Order That Nobody Confirmed",
    desc: "How I built a COD confirmation flow that turned ghost orders from a constant inventory drain into a problem that handles itself — automatically, every day, without anyone watching it.",
    pill: "Case Study →",
    headerBg: "#3d3028",
    textColor: "#f0ebe0",
    hasImage: true,
    imgSrc: "/images/work/cod-order-confirmation/order-confirmatoin.jpg",
    rotation: "-0.7deg",
    zIndex: 30,
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="relative bg-white pt-16 md:pt-24 pb-0">
      <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-16 border-b border-[#e8e8e8]">
        <p
          className="text-[9px] uppercase text-[#78746c] tracking-[0.28em] mb-4"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          Selected Works
        </p>
        <HeadingReveal
          lines={[
            { text: "Projects that", color: "#2a2822", delay: 0.05 },
            { text: "stayed running.", color: "#7c3aed", italic: true, delay: 0.18 },
          ]}
        />
      </div>

      <div className="relative z-10 pt-16 md:pt-24">
        {WORKS.map((work, i) => (
          <div
            key={work.id}
            className="mx-6 md:mx-16 relative"
            style={{
              zIndex: work.zIndex,
              marginTop: i === 0 ? 0 : "-160px",
              transform: `rotate(${work.rotation})`,
              transition: "transform 0.35s cubic-bezier(0.65, 0, 0.35, 1)",
              background: work.headerBg,
              boxShadow: "-7px 0px 10px rgba(0,0,0,0.35), 2px 2px 6px rgba(0,0,0,0.07)",
              willChange: "transform",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) translateY(-44px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = `rotate(${work.rotation})`;
            }}
          >

            {/* Header */}
            <div
              className="relative overflow-hidden"
              style={{ padding: "1.5rem 1.5rem" }}
            >
              {/* Mobile: stack. Desktop: 2-col grid */}
              <div className="relative z-10 flex flex-col gap-3 md:grid md:gap-10 md:items-start"
                style={{ gridTemplateColumns: "34% 1fr" }}
              >
                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(1.3rem, 2.4vw, 2.2rem)",
                    color: work.textColor,
                    lineHeight: 1.1,
                    margin: 0,
                  }}
                >
                  {work.title}
                </h3>

                {/* Desc + button */}
                <div className="flex flex-col gap-4">
                  <p
                    style={{
                      fontFamily: "var(--font-fauna)",
                      fontSize: "0.78rem",
                      lineHeight: 1.7,
                      color: work.textColor,
                      opacity: 0.85,
                      margin: 0,
                      maxWidth: "58ch",
                    }}
                  >
                    {work.desc}
                  </p>

                  <div className="flex md:justify-end">
                    <Link
                      href={`/work/${work.slug}`}
                      style={{
                        border: `1px solid ${work.textColor}`,
                        color: work.textColor,
                        borderRadius: 9999,
                        padding: "0.35rem 1rem",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        fontFamily: "var(--font-fauna)",
                        background: "transparent",
                        opacity: 0.9,
                        display: "inline-block",
                        textDecoration: "none",
                      }}
                    >
                      {work.pill}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Image — inset with padding so card bg frames it */}
            {work.hasImage && (
              <div style={{ padding: "0 2rem 1.5rem 2rem" }}>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <Image
                    src={work.imgSrc}
                    alt={work.title}
                    fill
                    className="object-cover"
                    sizes="82vw"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View all */}
      <div className="relative z-10 px-6 md:px-16 py-8 flex justify-end border-b border-[#e8e8e8]">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-[#78746c] hover:text-[#7c3aed] transition-colors duration-200"
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          View all works
          <svg
            width="10"
            height="10"
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
      </div>
    </section>
  );
}

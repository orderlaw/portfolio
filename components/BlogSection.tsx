"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeadingReveal from "./HeadingReveal";
import { posts } from "@/content/blog/manifest";

const PREVIEW_COUNT = 3;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const row = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function BlogSection() {
  const preview = posts.slice(0, PREVIEW_COUNT);

  return (
    <section id="blog" className="relative bg-white border-t border-[#e8e8e8]">
      {/* Heading */}
      <div className="px-6 md:px-16 pt-16 md:pt-24 pb-10 md:pb-14 border-b border-[#e8e8e8]">
        <p
          className="text-[9px] uppercase text-[#78746c] tracking-[0.28em] mb-4"
          style={{ fontFamily: "var(--font-fauna)" }}
        >
          Writing
        </p>
        <HeadingReveal
          lines={[
            { text: "Latest", color: "#2a2822", delay: 0.05 },
            { text: "from the blog.", color: "#7c3aed", italic: true, delay: 0.18 },
          ]}
        />
      </div>

      {/* Rows */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-5%" }}
      >
        {preview.map((post, i) => (
          <motion.div key={post.slug} variants={row}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-6 px-6 md:px-16 py-7 md:py-8 border-b border-[#e8e8e8] hover:bg-[#faf9f7] transition-colors duration-200"
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
                {String(i + 1).padStart(2, "0")}
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
                  {post.date}&nbsp;&nbsp;·&nbsp;&nbsp;{post.readTime} read
                </p>
                <p
                  className="truncate transition-colors duration-200 group-hover:text-[#7c3aed]"
                  style={{
                    fontFamily: "var(--font-didot)",
                    fontSize: "clamp(1.1rem, 2vw, 1.55rem)",
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    color: "#2a2822",
                  }}
                >
                  {post.title}
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
          </motion.div>
        ))}
      </motion.div>

      {/* View all */}
      <div className="px-6 md:px-16 py-8 flex justify-end border-b border-[#e8e8e8]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#78746c] hover:text-[#7c3aed] transition-colors duration-200"
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          View all posts
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

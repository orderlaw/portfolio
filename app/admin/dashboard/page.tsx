"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
}

interface Work {
  slug: string;
  title: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const { signOut } = useClerk();
  const [posts, setPosts] = useState<Post[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data.posts ?? []);
        setWorks(data.works ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "#fff" }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-5 md:px-12 h-14 border-b bg-white gap-3"
        style={{ borderColor: "#e8e8e8" }}
      >
        <span
          className="shrink-0 text-sm tracking-widest uppercase select-none"
          style={{ fontFamily: "var(--font-didot)", color: "#2a2822" }}
        >
          LL
        </span>

        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
          <Link
            href="/admin/edit?type=blog&new=1"
            className="shrink-0 text-[9px] uppercase tracking-[0.22em] px-3 md:px-4 py-2 rounded-full border transition-colors duration-200 hover:border-accent hover:text-accent"
            style={{ fontFamily: "var(--font-fauna)", color: "#2a2822", borderColor: "#d2cec4" }}
          >
            + Post
          </Link>
          <Link
            href="/admin/edit?type=work&new=1"
            className="shrink-0 text-[9px] uppercase tracking-[0.22em] px-3 md:px-4 py-2 rounded-full transition-colors duration-200"
            style={{ fontFamily: "var(--font-fauna)", background: "#7c3aed", color: "#fff" }}
          >
            + Case Study
          </Link>
          <button
            onClick={() => signOut({ redirectUrl: "/admin" })}
            className="shrink-0 text-[9px] uppercase tracking-[0.22em] transition-colors duration-200 hover:text-accent"
            style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
          >
            Log out
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
          >
            Loading…
          </p>
        </div>
      ) : (
        <div className="px-8 md:px-12 py-10 grid md:grid-cols-2 gap-12">
          {/* Blog Posts */}
          <section>
            <p
              className="text-[9px] uppercase tracking-[0.28em] mb-6"
              style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
            >
              Blog Posts
            </p>
            <div className="flex flex-col">
              {posts.length === 0 && (
                <p className="text-sm" style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}>
                  No posts yet.
                </p>
              )}
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/admin/edit?type=blog&slug=${post.slug}`}
                  className="group flex items-start justify-between py-4 border-b transition-colors duration-150"
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p
                      className="text-sm leading-snug mb-1 group-hover:text-accent transition-colors duration-150"
                      style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "#2a2822" }}
                    >
                      {post.title}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
                    >
                      {post.date} · {post.readTime} read
                    </p>
                  </div>
                  <svg
                    className="shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                    style={{ color: "#d2cec4" }}
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>

          {/* Case Studies */}
          <section>
            <p
              className="text-[9px] uppercase tracking-[0.28em] mb-6"
              style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
            >
              Case Studies
            </p>
            <div className="flex flex-col">
              {works.length === 0 && (
                <p className="text-sm" style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}>
                  No case studies yet.
                </p>
              )}
              {works.map((work) => (
                <Link
                  key={work.slug}
                  href={`/admin/edit?type=work&slug=${work.slug}`}
                  className="group flex items-start justify-between py-4 border-b transition-colors duration-150"
                  style={{ borderColor: "#e8e8e8" }}
                >
                  <p
                    className="text-sm leading-snug group-hover:text-accent transition-colors duration-150"
                    style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", color: "#2a2822" }}
                  >
                    {work.title}
                  </p>
                  <svg
                    className="shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                    style={{ color: "#d2cec4" }}
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

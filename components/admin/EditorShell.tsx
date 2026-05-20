"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SnippetBar from "./SnippetBar";
import MetadataPanel from "./MetadataPanel";

const EMPTY_BLOG_META = {
  slug: "",
  title: "",
  date: "",
  readTime: "",
  excerpt: "",
  tags: [] as string[],
  seoTitle: "",
  seoDescription: "",
};

const EMPTY_WORK_META = {
  slug: "",
  title: "",
  description: "",
  image: "",
  seoTitle: "",
  seoDescription: "",
};

type Meta = typeof EMPTY_BLOG_META | typeof EMPTY_WORK_META;

export default function EditorShell() {
  const params = useSearchParams();
  const router = useRouter();

  const type = (params.get("type") ?? "blog") as "blog" | "work";
  const slug = params.get("slug") ?? "";
  const isNew = params.get("new") === "1" || !slug;

  const [meta, setMeta] = useState<Meta>(
    type === "blog" ? { ...EMPTY_BLOG_META } : { ...EMPTY_WORK_META }
  );
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [error, setError] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing content
  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/content/${slug}?type=${type}`)
      .then((r) => r.json())
      .then((data) => {
        setMeta(data.metadata ?? (type === "blog" ? { ...EMPTY_BLOG_META } : { ...EMPTY_WORK_META }));
        setBody(data.body ?? "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, type, isNew]);

  // Insert snippet at cursor
  const insertSnippet = useCallback((snippet: string, cursorOffset = 0) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = el.value.slice(start, end);
    const before = el.value.slice(0, start);
    const after = el.value.slice(end);

    const insertion = selected
      ? snippet.replace("text", selected)
      : snippet;

    const newVal = before + insertion + after;
    setBody(newVal);

    requestAnimationFrame(() => {
      el.focus();
      const pos = start + cursorOffset;
      el.setSelectionRange(pos, pos + (selected ? selected.length : 0));
    });
  }, []);

  // Upload image
  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const folder =
      type === "blog"
        ? `blog/${(meta as typeof EMPTY_BLOG_META).slug || "uploads"}`
        : `work/${(meta as typeof EMPTY_WORK_META).slug || "uploads"}`;

    const form = new FormData();
    form.append("file", file);
    form.append("folder", folder);

    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Upload failed");
    return data.url as string;
  }, [type, meta]);

  // Tab key → 2 spaces
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      insertSnippet("  ", 2);
    }
  }

  async function publish() {
    const currentSlug =
      type === "blog"
        ? (meta as typeof EMPTY_BLOG_META).slug
        : (meta as typeof EMPTY_WORK_META).slug;

    if (!currentSlug) {
      setError("Slug is required.");
      return;
    }

    setSaving(true);
    setError("");

    const blogMeta = type === "blog" ? (meta as typeof EMPTY_BLOG_META) : null;
    const workMeta = type === "work" ? (meta as typeof EMPTY_WORK_META) : null;

    const payload = {
      metadata:
        type === "blog"
          ? {
              slug: blogMeta!.slug,
              title: blogMeta!.title,
              date: blogMeta!.date,
              readTime: blogMeta!.readTime,
              excerpt: blogMeta!.excerpt,
              tags: blogMeta!.tags,
            }
          : {
              title: workMeta!.title + " — Law Levisay",
              description: workMeta!.description,
              image: workMeta!.image,
            },
      body,
      isNew,
    };

    try {
      const res = await fetch(`/api/admin/content/${currentSlug}?type=${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Save failed");
      }

      setSavedAt(new Date().toLocaleTimeString());
      if (isNew) {
        router.replace(`/admin/edit?type=${type}&slug=${currentSlug}`);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#080706" }}
      >
        <p
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ fontFamily: "var(--font-fauna)", color: "#4e4a44" }}
        >
          Loading…
        </p>
      </div>
    );
  }

  const title =
    type === "blog"
      ? (meta as typeof EMPTY_BLOG_META).title
      : (meta as typeof EMPTY_WORK_META).title;

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#080706" }}>
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 h-14 border-b shrink-0"
        style={{ borderColor: "#1a1816" }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="text-[9px] uppercase tracking-[0.22em] transition-colors duration-150"
            style={{ fontFamily: "var(--font-fauna)", color: "#4e4a44" }}
          >
            ← Dashboard
          </button>
          {title && (
            <>
              <span style={{ color: "#1a1816" }}>/</span>
              <span
                className="text-[10px] truncate max-w-[30ch]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontStyle: "italic",
                  color: "#706c66",
                }}
              >
                {title}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {savedAt && !error && (
            <span
              className="text-[9px] uppercase tracking-[0.2em]"
              style={{ fontFamily: "var(--font-fauna)", color: "#2a8a3e" }}
            >
              Saved {savedAt}
            </span>
          )}
          {error && (
            <span
              className="text-[9px]"
              style={{ fontFamily: "var(--font-fauna)", color: "#ef4444" }}
            >
              {error}
            </span>
          )}

          {/* Preview */}
          {!isNew && (
            <a
              href={type === "blog" ? `/blog/${slug}` : `/work/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[9px] uppercase tracking-[0.22em] transition-colors duration-150"
              style={{ fontFamily: "var(--font-fauna)", color: "#4e4a44" }}
            >
              Preview ↗
            </a>
          )}

          <button
            onClick={publish}
            disabled={saving}
            className="text-[9px] uppercase tracking-[0.22em] px-4 py-2 rounded-full transition-colors duration-150 disabled:opacity-50"
            style={{
              fontFamily: "var(--font-fauna)",
              background: "#7c3aed",
              color: "#fff",
            }}
          >
            {saving ? "Publishing…" : isNew ? "Publish" : "Update"}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Metadata sidebar */}
        <aside
          className="w-72 shrink-0 border-r px-6 py-8 overflow-y-auto"
          style={{ borderColor: "#1a1816" }}
        >
          <MetadataPanel
            type={type}
            meta={meta}
            onChange={setMeta}
            isNew={isNew}
          />
        </aside>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <SnippetBar
            onInsert={insertSnippet}
            onUpload={uploadImage}
            type={type}
          />
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck
            className="flex-1 w-full bg-transparent outline-none resize-none p-6 text-sm leading-relaxed"
            style={{
              fontFamily: "'Geist Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
              fontSize: "0.82rem",
              color: "#c4c0b8",
              caretColor: "#7c3aed",
              lineHeight: 1.8,
            }}
            placeholder={
              type === "blog"
                ? "Start writing your post…\n\n## Section heading\n\nYour prose here."
                : "Start writing your case study…\n\n## The Problem\n\nDescribe what was broken."
            }
          />
        </div>
      </div>
    </div>
  );
}

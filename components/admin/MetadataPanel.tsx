"use client";

import { useState } from "react";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

interface WorkMeta {
  slug: string;
  title: string;
  description: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
}

interface Props {
  type: "blog" | "work";
  meta: BlogMeta | WorkMeta;
  onChange: (meta: BlogMeta | WorkMeta) => void;
  isNew: boolean;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[9px] uppercase tracking-[0.25em]"
        style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-transparent text-sm outline-none placeholder-[#c4c0b8] pb-1.5";
const inputStyle = { fontFamily: "var(--font-fauna)", color: "#2a2822", borderBottom: "1px solid #e8e8e8" };

export default function MetadataPanel({ type, meta, onChange, isNew }: Props) {
  const [tagInput, setTagInput] = useState("");

  function set(key: string, value: unknown) {
    onChange({ ...meta, [key]: value } as BlogMeta | WorkMeta);
  }

  function handleTitleChange(title: string) {
    const updates: Partial<BlogMeta & WorkMeta> = { title };
    if (isNew) updates.slug = slugify(title);
    onChange({ ...meta, ...updates } as BlogMeta | WorkMeta);
  }

  function addTag(e: React.KeyboardEvent) {
    if (e.key !== "Enter" && e.key !== ",") return;
    e.preventDefault();
    const tag = tagInput.trim();
    if (!tag) return;
    const blogMeta = meta as BlogMeta;
    if (!blogMeta.tags.includes(tag)) set("tags", [...blogMeta.tags, tag]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    set("tags", (meta as BlogMeta).tags.filter((t) => t !== tag));
  }

  const scrollStyle = { maxHeight: "calc(100vh - 56px)", overflowY: "auto" as const };

  if (type === "blog") {
    const m = meta as BlogMeta;
    return (
      <div className="flex flex-col gap-7" style={scrollStyle}>
        <Field label="Title">
          <textarea value={m.title} onChange={(e) => handleTitleChange(e.target.value)}
            rows={2} className={inputClass + " resize-none"} style={inputStyle} placeholder="Post title" />
        </Field>

        <Field label="Slug">
          <input value={m.slug} onChange={(e) => set("slug", e.target.value)}
            className={inputClass} style={inputStyle} placeholder="post-slug" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <input value={m.date} onChange={(e) => set("date", e.target.value)}
              className={inputClass} style={inputStyle} placeholder="May 2025" />
          </Field>
          <Field label="Read Time">
            <input value={m.readTime} onChange={(e) => set("readTime", e.target.value)}
              className={inputClass} style={inputStyle} placeholder="8 min" />
          </Field>
        </div>

        <Field label="Excerpt">
          <textarea value={m.excerpt} onChange={(e) => set("excerpt", e.target.value)}
            rows={3} className={inputClass + " resize-none"} style={inputStyle}
            placeholder="One-line hook for the post listing…" />
        </Field>

        <Field label="Tags — Enter or comma to add">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {m.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full"
                style={{ fontFamily: "var(--font-fauna)", background: "#eceae4", color: "#2a2822" }}>
                {tag}
                <button type="button" onClick={() => removeTag(tag)}
                  className="opacity-40 hover:opacity-100 transition-opacity leading-none">×</button>
              </span>
            ))}
          </div>
          <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={addTag}
            className={inputClass} style={inputStyle} placeholder="Add a tag…" />
        </Field>

        <div className="pt-4 border-t" style={{ borderColor: "#e8e8e8" }}>
          <p className="text-[9px] uppercase tracking-[0.25em] mb-5"
            style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}>SEO</p>
          <div className="flex flex-col gap-5">
            <Field label="SEO Title">
              <input value={m.seoTitle} onChange={(e) => set("seoTitle", e.target.value)}
                className={inputClass} style={inputStyle} placeholder="Defaults to title" />
            </Field>
            <Field label="SEO Description">
              <textarea value={m.seoDescription} onChange={(e) => set("seoDescription", e.target.value)}
                rows={2} className={inputClass + " resize-none"} style={inputStyle}
                placeholder="Defaults to excerpt" />
            </Field>
          </div>
        </div>
      </div>
    );
  }

  const m = meta as WorkMeta;
  return (
    <div className="flex flex-col gap-7" style={scrollStyle}>
      <Field label="Title">
        <textarea value={m.title} onChange={(e) => handleTitleChange(e.target.value)}
          rows={2} className={inputClass + " resize-none"} style={inputStyle} placeholder="Case study title" />
      </Field>

      <Field label="Slug">
        <input value={m.slug} onChange={(e) => set("slug", e.target.value)}
          className={inputClass} style={inputStyle} placeholder="case-study-slug" />
      </Field>

      <Field label="Description">
        <textarea value={m.description} onChange={(e) => set("description", e.target.value)}
          rows={4} className={inputClass + " resize-none"} style={inputStyle}
          placeholder="One-paragraph summary for the work listing…" />
      </Field>

      <Field label="Cover Image Path">
        <input value={m.image} onChange={(e) => set("image", e.target.value)}
          className={inputClass} style={inputStyle} placeholder="/images/work/slug/cover.jpg" />
      </Field>

      <div className="pt-4 border-t" style={{ borderColor: "#e8e8e8" }}>
        <p className="text-[9px] uppercase tracking-[0.25em] mb-5"
          style={{ fontFamily: "var(--font-fauna)", color: "#a8a49e" }}>SEO</p>
        <div className="flex flex-col gap-5">
          <Field label="SEO Title">
            <input value={m.seoTitle} onChange={(e) => set("seoTitle", e.target.value)}
              className={inputClass} style={inputStyle} placeholder="Defaults to title" />
          </Field>
          <Field label="SEO Description">
            <textarea value={m.seoDescription} onChange={(e) => set("seoDescription", e.target.value)}
              rows={2} className={inputClass + " resize-none"} style={inputStyle}
              placeholder="Defaults to description" />
          </Field>
        </div>
      </div>
    </div>
  );
}

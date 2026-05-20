"use client";

import { useRef } from "react";

interface Props {
  onInsert: (snippet: string, cursorOffset?: number) => void;
  onUpload: (file: File) => Promise<string>;
  type: "blog" | "work";
}

const SNIPPETS = [
  { label: "H2",      insert: "## ",                     offset: 3  },
  { label: "H3",      insert: "### ",                    offset: 4  },
  { label: "Bold",    insert: "**text**",                offset: 2  },
  { label: "Italic",  insert: "*text*",                  offset: 1  },
  { label: "Quote",   insert: "> ",                      offset: 2  },
  { label: "—",       insert: "\n---\n",                 offset: 5  },
  { label: "Link",    insert: "[text](url)",             offset: 1  },
  { label: "Code",    insert: "```\n\n```",              offset: 4  },
  { label: "Slider",  insert: '<ImageSlider images={["url1", "url2"]} />', offset: 16 },
  { label: "Flow",    insert: '<FlowDiagram id="n8n-stack" />',            offset: 13 },
  { label: "Mermaid", insert: '<MermaidDiagram chart={`\ngraph TD\n  A --> B\n`} />', offset: 19 },
];

export default function SnippetBar({ onInsert, onUpload, type }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await onUpload(file);
    onInsert(`![alt text](${url})`, 2);
    e.target.value = "";
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1 px-3 py-2 border-b"
      style={{ borderColor: "#1a1816", background: "#0d0b09" }}
    >
      {SNIPPETS.map((s) => (
        <button
          key={s.label}
          type="button"
          onClick={() => onInsert(s.insert, s.offset)}
          className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded transition-colors duration-150"
          style={{
            fontFamily: "var(--font-fauna)",
            color: "#706c66",
            background: "transparent",
            border: "1px solid #1a1816",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#eceae4";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2822";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#706c66";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a1816";
          }}
        >
          {s.label}
        </button>
      ))}

      {/* Image upload */}
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 rounded transition-colors duration-150"
        style={{
          fontFamily: "var(--font-fauna)",
          color: "#7c3aed",
          background: "transparent",
          border: "1px solid #3b1d8a",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#3b1d8a22";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        ↑ Image
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      <span
        className="ml-auto text-[9px] uppercase tracking-[0.22em]"
        style={{ fontFamily: "var(--font-fauna)", color: "#2a2822" }}
      >
        {type === "blog" ? "Blog Post" : "Case Study"}
      </span>
    </div>
  );
}

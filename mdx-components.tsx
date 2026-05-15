import type { MDXComponents } from "mdx/types";
import ImageSlider from "@/components/ImageSlider";
import MermaidDiagram from "@/components/MermaidDiagram";
import FlowDiagram from "@/components/FlowDiagram";

export function useMDXComponents(): MDXComponents {
  return {
    ImageSlider,
    MermaidDiagram,
    FlowDiagram,
    img: ({ src, alt }) => (
      <span className="block my-8">
        <img
          src={src}
          alt={alt ?? ""}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </span>
    ),
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: "var(--font-didot)",
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
          color: "#2a2822",
          marginBottom: "2rem",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: "var(--font-didot)",
          fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          color: "#2a2822",
          marginTop: "3.5rem",
          marginBottom: "1rem",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
          fontStyle: "italic",
          color: "#7c3aed",
          marginTop: "2.5rem",
          marginBottom: "0.75rem",
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          fontFamily: "var(--font-fauna)",
          fontSize: "1rem",
          lineHeight: 1.85,
          color: "#2a2822",
          marginBottom: "1.5rem",
          maxWidth: "68ch",
        }}
      >
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          fontFamily: "var(--font-fauna)",
          fontSize: "1rem",
          lineHeight: 1.85,
          color: "#2a2822",
          marginBottom: "1.5rem",
          paddingLeft: "1.5rem",
          listStyleType: "disc",
          maxWidth: "68ch",
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          fontFamily: "var(--font-fauna)",
          fontSize: "1rem",
          lineHeight: 1.85,
          color: "#2a2822",
          marginBottom: "1.5rem",
          paddingLeft: "1.5rem",
          listStyleType: "decimal",
          maxWidth: "68ch",
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: "0.4rem" }}>{children}</li>
    ),
    strong: ({ children }) => (
      <strong style={{ color: "#2a2822", fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em style={{ color: "#7c3aed", fontStyle: "italic" }}>{children}</em>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "2px solid #7c3aed",
          paddingLeft: "1.5rem",
          marginLeft: 0,
          marginBottom: "1.5rem",
          color: "#78746c",
          fontFamily: "var(--font-playfair)",
          fontStyle: "italic",
          fontSize: "1.1rem",
          lineHeight: 1.7,
        }}
      >
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e8e8e8",
          margin: "3rem 0",
        }}
      />
    ),
    code: ({ children }) => (
      <code
        style={{
          fontFamily: "monospace",
          fontSize: "0.85em",
          background: "#f0ede7",
          color: "#7c3aed",
          padding: "0.15em 0.4em",
          borderRadius: "3px",
        }}
      >
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre
        style={{
          background: "#2a2822",
          color: "#eceae4",
          padding: "1.5rem",
          borderRadius: "4px",
          overflowX: "auto",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          lineHeight: 1.7,
          maxWidth: "68ch",
        }}
      >
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        style={{
          color: "#7c3aed",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {children}
      </a>
    ),
  };
}

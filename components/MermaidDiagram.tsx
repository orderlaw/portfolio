"use client";

import { useEffect, useRef, useState } from "react";

const ZOOM_MIN = 0.4;
const ZOOM_MAX = 3;

let mermaidReady = false;

async function getMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!mermaidReady) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
      themeVariables: {
        background: "#13161c",
        primaryColor: "#1e222b",
        primaryTextColor: "#e6edf3",
        lineColor: "#444c56",
      },
      htmlLabels: true,
      securityLevel: "antiscript",
    });
    mermaidReady = true;
  }
  return mermaid;
}

export default function MermaidDiagram({ code }: { code: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const zoom = useRef(1);
  const pan = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragOrigin = useRef({ x: 0, y: 0 });

  const applyTransform = () => {
    const el = contentRef.current;
    if (!el) return;
    el.style.transform = `translate(${pan.current.x}px, ${pan.current.y}px) scale(${zoom.current})`;
  };

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const mermaid = await getMermaid();

        const cleaned = code
          .split("\n")
          .filter((l) => !/^\s*theme\s*:/.test(l))
          .filter((l) => !/^\s*linkStyle\b/.test(l))
          .filter((l) => !/^\s*classDef\s+default\b/.test(l))
          .join("\n");

        const id = `md-${Math.random().toString(36).slice(2, 9)}`;
        const { svg } = await mermaid.render(id, cleaned);

        if (cancelled || !contentRef.current) return;

        contentRef.current.innerHTML = svg;

        const svgEl = contentRef.current.querySelector<SVGElement>("svg");
        if (svgEl) {
          svgEl.removeAttribute("height");
          svgEl.style.width = "100%";
          svgEl.style.maxWidth = "none";
          svgEl.style.display = "block";
        }

        setReady(true);
      } catch (e) {
        console.error("Mermaid render error:", e);
      }
    };

    render();
    return () => { cancelled = true; };
  }, [code]);

  useEffect(() => {
    if (!ready) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = wrapper.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      const prev = zoom.current;
      zoom.current = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, prev + delta));
      const ratio = zoom.current / prev;
      pan.current.x = cx - ratio * (cx - pan.current.x);
      pan.current.y = cy - ratio * (cy - pan.current.y);
      applyTransform();
    };

    const onMouseDown = (e: MouseEvent) => {
      dragging.current = true;
      dragOrigin.current = {
        x: e.clientX - pan.current.x,
        y: e.clientY - pan.current.y,
      };
      wrapper.style.cursor = "grabbing";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      pan.current = {
        x: e.clientX - dragOrigin.current.x,
        y: e.clientY - dragOrigin.current.y,
      };
      applyTransform();
    };

    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      wrapper.style.cursor = "grab";
    };

    wrapper.addEventListener("wheel", onWheel, { passive: false });
    wrapper.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      wrapper.removeEventListener("wheel", onWheel);
      wrapper.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [ready]);

  const reset = () => {
    zoom.current = 1;
    pan.current = { x: 0, y: 0 };
    applyTransform();
  };

  return (
    <div className="my-10" style={{ border: "1px solid #e8e8e8" }}>
      <div
        ref={wrapperRef}
        style={{
          overflow: "hidden",
          height: "480px",
          cursor: "grab",
          background: "#13161c",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          ref={contentRef}
          style={{ transformOrigin: "0 0", willChange: "transform" }}
        />
        {!ready && (
          <span
            style={{
              position: "absolute",
              fontFamily: "var(--font-fauna)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              color: "#444c56",
              textTransform: "uppercase",
            }}
          >
            Loading…
          </span>
        )}
      </div>

      <div
        style={{
          background: "#faf9f7",
          borderTop: "1px solid #e8e8e8",
          padding: "0.6rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-fauna)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            color: "#a8a49e",
            textTransform: "uppercase",
          }}
        >
          Scroll to zoom · Drag to pan
        </span>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {([["−", () => { zoom.current = Math.max(ZOOM_MIN, zoom.current - 0.15); applyTransform(); }],
             ["Reset", reset],
             ["+", () => { zoom.current = Math.min(ZOOM_MAX, zoom.current + 0.15); applyTransform(); }]] as [string, () => void][])
            .map(([label, action]) => (
              <button
                key={label}
                onClick={action}
                style={{
                  fontFamily: "var(--font-fauna)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#78746c",
                  background: "transparent",
                  border: "1px solid #e8e8e8",
                  borderRadius: "9999px",
                  padding: "0.25rem 0.75rem",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

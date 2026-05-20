import { Suspense } from "react";
import EditorShell from "@/components/admin/EditorShell";

export default function EditPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#080706" }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-fauna)", color: "#4e4a44" }}
          >
            Loading editor…
          </p>
        </div>
      }
    >
      <EditorShell />
    </Suspense>
  );
}

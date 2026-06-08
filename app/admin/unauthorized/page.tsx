"use client";

import { useClerk } from "@clerk/nextjs";

export default function Unauthorized() {
  const { signOut } = useClerk();

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "#fff" }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.3em]"
        style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
      >
        You don't have access to this page.
      </p>
      <button
        onClick={() => signOut({ redirectUrl: "/" })}
        className="text-[9px] uppercase tracking-[0.22em] px-4 py-2 rounded-full"
        style={{ fontFamily: "var(--font-fauna)", background: "#7c3aed", color: "#fff" }}
      >
        Sign out
      </button>
    </main>
  );
}

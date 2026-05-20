"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      setError("Wrong password.");
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#eceae4" }}
    >
      <div className="w-full max-w-sm px-8">
        <div className="text-center mb-10">
          <span
            className="text-2xl tracking-widest uppercase select-none"
            style={{ fontFamily: "var(--font-didot)", color: "#2a2822" }}
          >
            LL
          </span>
          <p
            className="mt-2 text-[9px] uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
          >
            Admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[9px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "var(--font-fauna)", color: "#78746c" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full bg-transparent pb-2.5 text-sm outline-none placeholder-[#c4c0b8]"
              style={{
                fontFamily: "var(--font-fauna)",
                color: "#2a2822",
                borderBottom: "1px solid #d2cec4",
              }}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-xs" style={{ fontFamily: "var(--font-fauna)", color: "#ef4444" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="group relative inline-block text-[10px] tracking-[0.2em] uppercase rounded-full overflow-hidden self-start disabled:opacity-40"
            style={{
              fontFamily: "var(--font-fauna)",
              padding: "0.65rem 2rem",
              border: "1px solid #2a2822",
            }}
          >
            <span
              className="block group-hover:-translate-y-[150%] transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ color: "#2a2822" }}
            >
              {loading ? "Entering…" : "Enter"}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center translate-y-[150%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ color: "#2a2822" }}
            >
              {loading ? "Entering…" : "Enter"}
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}

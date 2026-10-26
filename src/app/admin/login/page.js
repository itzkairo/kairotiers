"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { LogoMark } from "../../components/CodeIcons";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Incorrect Password");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-white">
      <div className="w-full max-w-[380px]">
        <div className="mb-7 flex items-center justify-center gap-2.5">
          <LogoMark className="h-8 w-8" />

          <span className="text-[18px] font-semibold tracking-[-0.03em] text-white">
            Kairo<span className="text-[#E05252]">Tiers</span>
          </span>
        </div>

        <div className="rounded-[16px] border border-line bg-surface p-6 sm:p-7">
          <h1 className="text-[26px] font-bold tracking-[-0.035em] text-white">
            Admin login
          </h1>

          <p className="mt-1.5 text-[13px] leading-relaxed text-[#8B8B94]">
            Enter your administrator password to continue.
          </p>

          <form onSubmit={handleLogin} className="mt-6">
            <label
              htmlFor="admin-password"
              className="text-[12px] font-medium text-[#A1A1AA]"
            >
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field mt-2 h-11 px-3.5"
            />

            {error && (
              <div className="mt-3 rounded-[8px] border border-line-red bg-[#120909] px-3 py-2.5">
                <p className="text-[12px] text-[#F87171]">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-4
                h-11
                w-full
                rounded-[9px]
                bg-[#DC2626]
                text-[14px]
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-[#B91C1C]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center border-t border-line-soft pt-4">
            <span className="text-[12px] text-[#4A4A52]">
              KairoTiers administration
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

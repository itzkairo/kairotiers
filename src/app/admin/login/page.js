"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B] px-4">
      <div className="w-full max-w-md bg-[#151515] border border-[#2A2A2A] rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.4)]">

        <h1 className="text-4xl font-black text-center mb-2">
          <span className="text-red-600">Admin</span>{" "}
          <span className="text-white">Login</span>
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your administrator password
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              p-4
              rounded-xl
              bg-[#101010]
              border
              border-[#333]
              text-white
              outline-none
              focus:border-red-600
              transition
            "
          />

          {error && (
            <p className="text-red-500 text-sm mt-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              mt-6
              w-full
              bg-red-600
              hover:bg-red-700
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition
              rounded-xl
              py-4
              font-bold
              text-lg
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B] px-4">
      <div className="w-full max-w-md bg-[#151515] border border-red-700 rounded-2xl p-8 shadow-[0_0_40px_rgba(220,38,38,0.12)]">

        <h1 className="text-4xl font-black text-center mb-8">
          <span className="text-red-600">Admin</span>{" "}
          <span className="text-white">Login</span>
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
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
          <p className="text-red-500 mt-3 text-sm">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
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

      </div>
    </main>
  );
}
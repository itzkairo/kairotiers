"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      document.cookie = `kairo_admin=${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}; path=/; max-age=3600; SameSite=Lax`;
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect Password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0B0B]">

      <div className="w-full max-w-md bg-[#151515] border border-red-700 rounded-2xl p-8">

        <h1 className="text-4xl font-black text-center mb-8">
          <span className="text-red-600">Admin</span>{" "}
          <span className="text-white">Login</span>
        </h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#101010] border border-[#333] text-white outline-none focus:border-red-600"
        />

        {error && (
          <p className="text-red-500 mt-3">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-4 font-bold text-lg"
        >
          Login
        </button>

      </div>

    </main>
  );
}
"use client";

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Player..."
      className="w-full bg-[#111111] border border-[#2c2c2c] rounded-2xl px-6 py-4 text-lg outline-none transition-all duration-300 focus:border-red-600 focus:shadow-[0_0_20px_rgba(255,0,0,.30)]"
      value={search}
onChange={(e) => setSearch(e.target.value)}
    />
  );
}
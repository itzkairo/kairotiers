"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0B0B] text-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black">
            <span className="text-red-600 drop-shadow-[0_0_25px_red]">
              Kairo
            </span>

            <span className="text-white drop-shadow-[0_0_25px_white]">
              Tiers
            </span>
          </h1>

          <p className="text-gray-400 text-2xl mt-6">
            Professional Minecraft Tier List
          </p>

          <Link
            href="/ranking"
            className="mt-12 inline-block bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-300 px-12 py-5 rounded-xl text-2xl font-bold shadow-[0_0_40px_rgba(255,0,0,.45)] hover:shadow-[0_0_60px_rgba(255,0,0,.75)]"
          >
            View Rankings
          </Link>
        </motion.div>
      </main>
    </>
  );
}
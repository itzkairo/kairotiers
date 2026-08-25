"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import { getPlayers } from "../lib/playerService";

const gamemodes = [
  {
    key: "sword",
    name: "Sword",
    icon: "/icons/sword.svg",
  },
  {
    key: "axe",
    name: "Axe",
    icon: "/icons/axe.svg",
  },
  {
    key: "mace",
    name: "Mace",
    icon: "/icons/mace.svg",
  },
  {
    key: "nethpot",
    name: "NethPot",
    icon: "/icons/nethpot.svg",
  },
  {
    key: "diapot",
    name: "DiaPot",
    icon: "/icons/diapot.svg",
  },
  {
    key: "smp",
    name: "SMP",
    icon: "/icons/smp.svg",
  },
  {
    key: "uhc",
    name: "UHC",
    icon: "/icons/uhc.svg",
  },
  {
    key: "crystal",
    name: "Crystal",
    icon: "/icons/crystal.svg",
  },
];

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData || []);
      } catch (error) {
        console.error("Failed to load players:", error);
      }
    }

    loadPlayers();
  }, []);

  const topPlayers = [...players]
    .filter((player) => player?.overall)
    .sort(
      (a, b) =>
        (b.overall?.points || 0) -
        (a.overall?.points || 0)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      <Navbar />

      <main>

        {/* ================= HERO ================= */}

        <section
          className="
            relative
            min-h-[500px]
            flex
            items-center
            justify-center
            px-4
            sm:px-6
            pt-8
            md:pt-10
            pb-10
          "
        >

          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-[600px]
              h-[320px]
              rounded-full
              bg-red-700/10
              blur-[120px]
              pointer-events-none
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              pointer-events-none
              bg-[linear-gradient(#dc2626_1px,transparent_1px),linear-gradient(90deg,#dc2626_1px,transparent_1px)]
              bg-[size:50px_50px]
            "
          />

          <div className="relative z-10 w-full max-w-[1100px] mx-auto text-center">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-red-900/50
                bg-red-950/20
                text-red-400
                text-xs
                sm:text-sm
                font-bold
                uppercase
                tracking-[0.2em]
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-red-500
                  shadow-[0_0_10px_red]
                "
              />

              Official KairoTiers Rankings
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="
                mt-6
                text-6xl
                sm:text-7xl
                md:text-8xl
                font-black
                tracking-[-0.05em]
                leading-none
              "
            >
              <span
                className="
                  text-red-600
                  drop-shadow-[0_0_35px_rgba(220,38,38,0.3)]
                "
              >
                Kairo
              </span>

              <span className="text-white">
                Tiers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
              }}
              className="
                mt-5
                max-w-2xl
                mx-auto
                text-gray-400
                text-base
                sm:text-lg
                md:text-xl
                leading-relaxed
              "
            >
              Compete against the best Minecraft players,
              climb the rankings, and prove your skill
              across every gamemode.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="
                mt-8
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                gap-3
              "
            >

              <Link
                href="/ranking"
                className="
                  w-full
                  sm:w-auto
                  px-8
                  py-3.5
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  border
                  border-red-500
                  font-bold
                  shadow-[0_0_30px_rgba(220,38,38,0.25)]
                  hover:shadow-[0_0_40px_rgba(220,38,38,0.4)]
                  transition-all
                  duration-200
                "
              >
                View Rankings
              </Link>

              <a
                href="https://discord.gg/EX7ZAaUyVt"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full
                  sm:w-auto
                  px-8
                  py-3.5
                  rounded-xl
                  bg-[#111111]
                  hover:bg-[#181111]
                  border
                  border-[#3a2020]
                  hover:border-red-700
                  text-gray-200
                  font-bold
                  transition-all
                  duration-200
                "
              >
                Join Discord
              </a>

            </motion.div>

          </div>

        </section>


        {/* ================= STATS ================= */}

        <section className="px-4 sm:px-6 pb-16">

          <div className="w-full max-w-[1100px] mx-auto">

            <div className="grid grid-cols-2 gap-3">

              {/* GAMEMODES */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                  rounded-2xl
                  border
                  border-[#2b1719]
                  bg-[#0d0b0c]
                  p-5
                  text-center
                "
              >
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Gamemodes
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  {gamemodes.length}
                </p>
              </motion.div>


              {/* STATUS */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="
                  rounded-2xl
                  border
                  border-[#2b1719]
                  bg-[#0d0b0c]
                  p-5
                  text-center
                "
              >
                <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Status
                </p>

                <div className="mt-2 flex items-center justify-center gap-2">

                  <span
                    className="
                      w-2.5
                      h-2.5
                      rounded-full
                      bg-green-500
                      shadow-[0_0_10px_rgba(34,197,94,0.8)]
                    "
                  />

                  <span className="text-xl font-black text-green-400">
                    Online
                  </span>

                </div>

              </motion.div>

            </div>

          </div>

        </section>


        {/* ================= TOP PLAYERS ================= */}

        <section className="px-4 sm:px-6 pb-20">

          <div className="w-full max-w-[1100px] mx-auto">

            <div className="flex items-end justify-between mb-6">

              <div>
                <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">
                  Leaderboard
                </p>

                <h2 className="mt-1 text-3xl sm:text-4xl font-black">
                  Top Players
                </h2>
              </div>

              <Link
                href="/ranking"
                className="
                  hidden
                  sm:block
                  text-sm
                  font-bold
                  text-gray-400
                  hover:text-red-500
                  transition-colors
                "
              >
                View All →
              </Link>

            </div>

            <div className="space-y-3">

              {topPlayers.length > 0 ? (

                topPlayers.map((player, index) => (

                  <motion.div
                    key={player.ign}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="
                      group
                      flex
                      items-center
                      gap-4
                      p-4
                      sm:p-5
                      rounded-2xl
                      border
                      border-[#251719]
                      bg-[#0c0b0c]
                      hover:bg-[#120c0d]
                      hover:border-red-900
                      transition-all
                    "
                  >

                    <div
                      className={`
                        w-10
                        text-center
                        text-xl
                        font-black
                        ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                            ? "text-gray-300"
                            : "text-orange-500"
                        }
                      `}
                    >
                      #{index + 1}
                    </div>

                    <img
                      src={`https://mc-heads.net/avatar/${player.ign}/64`}
                      alt={player.ign}
                      className="
                        w-12
                        h-12
                        sm:w-14
                        sm:h-14
                        rounded-xl
                        border
                        border-[#302020]
                      "
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://mc-heads.net/avatar/Steve/64";
                      }}
                    />

                    <div className="flex-1 min-w-0">

                      <h3 className="font-bold text-base sm:text-lg truncate">
                        {player.ign}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500">
                        Overall Ranking
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-red-500 font-black text-lg sm:text-xl">
                        {player.overall?.points || 0}
                      </p>

                      <p className="text-[10px] uppercase tracking-widest text-gray-600">
                        Points
                      </p>

                    </div>

                  </motion.div>

                ))

              ) : (

                <div
                  className="
                    py-14
                    text-center
                    rounded-2xl
                    border
                    border-dashed
                    border-[#342022]
                    bg-[#0b0a0b]
                  "
                >
                  <p className="text-gray-500">
                    Rankings will appear here once players are added.
                  </p>
                </div>

              )}

            </div>

          </div>

        </section>


        {/* ================= GAMEMODES ================= */}

        <section className="px-4 sm:px-6 pb-20">

          <div className="w-full max-w-[1100px] mx-auto">

            <div className="text-center mb-8">

              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">
                Competitive Modes
              </p>

              <h2 className="mt-2 text-3xl sm:text-4xl font-black">
                Choose Your Gamemode
              </h2>

              <p className="mt-3 text-gray-500 max-w-xl mx-auto">
                Explore rankings and find out where you stand
                across every KairoTiers gamemode.
              </p>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

              {gamemodes.map((mode) => (

                <Link
                  key={mode.key}
                  href={`/ranking?mode=${mode.key}`}
                  className="
                    group
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center
                    h-36
                    rounded-2xl
                    border
                    border-[#2d181a]
                    bg-[#0c0b0c]
                    hover:bg-[#140b0d]
                    hover:border-red-700
                    hover:-translate-y-1
                    hover:shadow-[0_10px_30px_rgba(220,38,38,0.12)]
                    transition-all
                    duration-200
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      left-1/2
                      -translate-x-1/2
                      w-0
                      group-hover:w-16
                      h-[2px]
                      bg-red-600
                      shadow-[0_0_12px_red]
                      transition-all
                      duration-300
                    "
                  />

                  <img
                    src={mode.icon}
                    alt={mode.name}
                    className="
                      w-10
                      h-10
                      object-contain
                      opacity-80
                      group-hover:opacity-100
                      group-hover:scale-110
                      transition-all
                      duration-200
                    "
                  />

                  <span className="mt-4 font-bold text-gray-300 group-hover:text-white">
                    {mode.name}
                  </span>

                </Link>

              ))}

            </div>

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="px-4 sm:px-6 pb-20">

          <div className="w-full max-w-[1100px] mx-auto">

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-red-900/50
                bg-gradient-to-br
                from-[#19090b]
                via-[#0d090a]
                to-[#080808]
                px-6
                py-16
                text-center
              "
            >

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  w-[400px]
                  h-[250px]
                  rounded-full
                  bg-red-700/10
                  blur-[100px]
                "
              />

              <div className="relative z-10">

                <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">
                  KairoTiers
                </p>

                <h2 className="mt-3 text-3xl sm:text-5xl font-black">
                  Ready To Get Ranked?
                </h2>

                <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                  Check the rankings, compare your skills,
                  and prove that you belong at the top.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">

                  <Link
                    href="/ranking"
                    className="
                      px-8
                      py-3.5
                      rounded-xl
                      bg-red-600
                      hover:bg-red-700
                      font-bold
                      shadow-[0_0_30px_rgba(220,38,38,0.25)]
                      transition-all
                    "
                  >
                    View Rankings
                  </Link>

                  <a
                    href="https://discord.gg/EX7ZAaUyVt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-8
                      py-3.5
                      rounded-xl
                      bg-[#111111]
                      border
                      border-[#3a2020]
                      hover:border-red-700
                      font-bold
                      transition-all
                    "
                  >
                    Join Discord
                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#1d1112] bg-[#050505]">

        <div
          className="
            max-w-[1100px]
            mx-auto
            px-4
            sm:px-6
            py-8
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          <div className="font-black text-xl">

            <span className="text-red-600">
              Kairo
            </span>

            <span className="text-white">
              Tiers
            </span>

          </div>

          <p className="text-gray-600 text-xs sm:text-sm">
            Competitive Minecraft Rankings
          </p>

        </div>

      </footer>

    </div>
  );
}   
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import { getHallOfFame } from "../../lib/hallOfFameService";

export default function HallOfFame() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await getHallOfFame();
        setPlayers(data || []);
      } catch (error) {
        console.error("Failed to load Hall Of Fame:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPlayers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= PAGE ================= */}

      <main className="pt-6 md:pt-8 pb-12 px-4 sm:px-6 md:px-8">

        <div className="w-full max-w-[1270px] mx-auto">

          {/* ================= HEADER ================= */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              <span className="text-white">
                Hall Of{" "}
              </span>

              <span className="text-red-600">
                Fame
              </span>
            </h1>

            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Players who have made their mark in KairoTiers.
            </p>

          </motion.div>

          {/* ================= CONTENT ================= */}

          {loading ? (

            <div
              className="
                rounded-2xl
                border
                border-[#291416]
                bg-gradient-to-br
                from-[#160b0d]
                via-[#0d0d0f]
                to-[#090909]
                py-20
                text-center
              "
            >
              <div className="text-gray-500 font-semibold">
                Loading Hall Of Fame...
              </div>
            </div>

          ) : players.length === 0 ? (

            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-[#3b2022]
                bg-[#0b0a0b]
                py-20
                text-center
              "
            >

              <h2 className="text-xl font-bold text-gray-300">
                No Hall Of Fame Players
              </h2>

              <p className="text-gray-600 text-sm mt-2">
                Hall Of Fame players will appear here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {players.map((player, index) => (

                <motion.div
                  key={player.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: Math.min(index * 0.06, 0.4),
                    duration: 0.35,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#321719]
                    bg-gradient-to-br
                    from-[#160b0d]
                    via-[#0e0d0f]
                    to-[#090909]
                    p-5
                    sm:p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#71262d]
                    hover:shadow-[0_12px_40px_rgba(170,30,45,0.18)]
                  "
                >

                  {/* RED GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -top-20
                      -right-20
                      w-40
                      h-40
                      rounded-full
                      bg-red-600/10
                      blur-3xl
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-300
                    "
                  />

                  {/* TOP RED LINE */}

                  <div
                    className="
                      absolute
                      top-0
                      left-8
                      right-8
                      h-[1px]
                      bg-red-600/60
                      shadow-[0_0_15px_rgba(220,38,38,0.5)]
                    "
                  />

                  {/* PLAYER */}

                  <div className="relative flex items-start gap-5">

                    {/* AVATAR */}

                    <img
                      src={
                        player.image ||
                        `https://mc-heads.net/avatar/${player.ign}/128`
                      }
                      alt={player.ign}
                      className="
                        w-20
                        h-20
                        sm:w-24
                        sm:h-24
                        shrink-0
                        rounded-xl
                        border
                        border-[#3a2022]
                        bg-[#090909]
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://mc-heads.net/avatar/Steve/128";
                      }}
                    />

                    {/* INFO */}

                    <div className="min-w-0 pt-1">

                      <div className="text-[10px] uppercase tracking-[0.18em] text-red-500/70 font-black mb-1">
                        Hall Of Fame
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-black truncate">
                        {player.ign}
                      </h2>

                      <p className="mt-1 text-red-500 font-bold">
                        {player.title}
                      </p>

                    </div>

                  </div>

                  {/* DESCRIPTION */}

                  {player.description && (

                    <div
                      className="
                        relative
                        mt-5
                        pt-4
                        border-t
                        border-[#241416]
                      "
                    >

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {player.description}
                      </p>

                    </div>

                  )}

                </motion.div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}
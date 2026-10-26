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
    <div className="min-h-screen bg-background text-white">
      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= PAGE ================= */}

      <main className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1320px]">
          {/* ================= HEADER ================= */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5 border-b border-line-soft pb-7 pt-8 sm:flex-row sm:items-end sm:justify-between sm:pb-8 sm:pt-10"
          >
            <div>
              <p className="text-[12px] font-semibold text-[#E05252]">
                Community archive
              </p>

              <h1 className="mt-2 text-[36px] font-bold leading-none tracking-[-0.045em] text-white sm:text-[46px]">
                Hall Of Fame
              </h1>

              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#A1A1AA]">
                Players who have made their mark in KairoTiers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <p className="text-[13px] font-medium text-[#8B8B94]">
                {players.length} {players.length === 1 ? "inductee" : "inductees"}
              </p>
            </div>
          </motion.div>

          {/* ================= CONTENT ================= */}

          <div className="mt-6">
            {loading ? (
              <div
                className="
                  rounded-[12px]
                  border
                  border-line
                  bg-surface
                  px-6
                  py-20
                  text-center
                "
              >
                <p className="text-[14px] font-medium text-[#D4D4D8]">
                  Loading Hall Of Fame...
                </p>
              </div>
            ) : players.length === 0 ? (
              <div
                className="
                  rounded-[12px]
                  border
                  border-dashed
                  border-line-red
                  bg-surface
                  px-6
                  py-20
                  text-center
                "
              >
                <h2 className="text-[18px] font-semibold text-[#D4D4D8]">
                  No Hall Of Fame players
                </h2>

                <p className="mt-2 text-[13px] text-[#6F6F78]">
                  Hall Of Fame players will appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {players.map((player, index) => (
                  <motion.article
                    key={player.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(index * 0.04, 0.3),
                      duration: 0.25,
                    }}
                    className="
                      flex
                      flex-col
                      rounded-[12px]
                      border
                      border-line
                      bg-surface
                      p-5
                      transition-colors
                      duration-200
                      hover:border-line-red
                    "
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={
                          player.image ||
                          `https://mc-heads.net/avatar/${player.ign}/128`
                        }
                        alt={player.ign}
                        className="
                          h-14
                          w-14
                          shrink-0
                          rounded-[10px]
                          border
                          border-line
                          bg-[#0A0A0A]
                          object-cover
                        "
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://mc-heads.net/avatar/Steve/128";
                        }}
                      />

                      <div className="min-w-0">
                        <h2 className="truncate text-[17px] font-semibold tracking-[-0.02em] text-white">
                          {player.ign}
                        </h2>

                        <p className="mt-0.5 text-[12px] font-medium text-[#E05252]">
                          {player.title}
                        </p>
                      </div>
                    </div>

                    {player.description && (
                      <p className="mt-4 border-t border-line-soft pt-3.5 text-[13px] leading-relaxed text-[#A1A1AA]">
                        {player.description}
                      </p>
                    )}
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

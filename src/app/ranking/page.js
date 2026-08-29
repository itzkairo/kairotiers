"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import GamemodeBar from "../components/GamemodeBar";
import PlayerRow from "../components/PlayerRow";
import TierColumns from "../components/TierColumns";
import PlayerPopup from "../components/PlayerPopup";
import { getPlayers } from "../../lib/playerService";

function RankingContent() {
  const searchParams = useSearchParams();

  const [selectedMode, setSelectedMode] = useState("overall");
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [players, setPlayers] = useState([]);

  const openPlayer = (player) => {
    setSelectedPlayer(player);
    setPopupOpen(true);
  };

  const closePlayer = () => {
    setPopupOpen(false);
    setSelectedPlayer(null);
  };

  /* ================= URL GAMEMODE ================= */

  useEffect(() => {
    const modeFromUrl = searchParams.get("mode");

    const validModes = [
      "overall",
      "sword",
      "axe",
      "mace",
      "diapot",
      "nethpot",
      "smp",
      "uhc",
      "crystal",
    ];

    if (modeFromUrl && validModes.includes(modeFromUrl)) {
      setSelectedMode(modeFromUrl);
    } else {
      setSelectedMode("overall");
    }
  }, [searchParams]);

  /* ================= LOAD PLAYERS ================= */

  useEffect(() => {
    async function loadPlayers() {
      try {
        const data = await getPlayers();
        setPlayers(data || []);
      } catch (error) {
        console.error("Failed to load players:", error);
      }
    }

    loadPlayers();
  }, []);

  /* ================= SORT PLAYERS ================= */

  const sortedPlayers = [...players]
    .filter((p) => p?.[selectedMode])
    .sort(
      (a, b) =>
        (b[selectedMode]?.points || 0) -
        (a[selectedMode]?.points || 0)
    );

  /* ================= SEARCH ================= */

  const filteredPlayers = sortedPlayers.filter(
    (player) =>
      player?.ign &&
      player.ign.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= NAVBAR ================= */}

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      {/* ================= RANKING AREA ================= */}

      <main className="pt-3 md:pt-4 pb-10 px-3 sm:px-5 md:px-8">

        <div className="w-full max-w-[1270px] mx-auto">

          {/* ================= SERVER IP ================= */}

          <div className="w-full flex justify-end mb-3 md:mb-4 px-1 sm:px-2">

            <div
              className="
                inline-flex
                items-center
                gap-2
                h-10
                md:h-11
                px-4
                md:px-5
                rounded-xl
                border
                border-[#25282d]
                bg-[#090b0e]
                shadow-[0_5px_20px_rgba(0,0,0,0.35)]
              "
            >

              {/* ONLINE DOT */}

              <span
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-green-500
                  shadow-[0_0_10px_rgba(34,197,94,0.8)]
                  shrink-0
                "
              />

              {/* SERVER IP */}

              <span
                className="
                  text-sm
                  md:text-base
                  font-bold
                  text-gray-200
                  whitespace-nowrap
                "
              >
                play.rearmc.club
              </span>

            </div>

          </div>

          {/* ================= MAIN RANKING CONTAINER ================= */}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-hidden"
          >

            {/* ================= GAMEMODE BAR ================= */}

            <div
              className="
                w-full
                px-0
                sm:px-2
                md:px-3
                pb-5
                sm:pb-6
              "
            >

              <div className="flex justify-center w-full">

                <div className="w-full overflow-x-auto scrollbar-hide">

                  <div className="flex justify-center items-center min-w-max">

                    <GamemodeBar
                      selectedMode={selectedMode}
                      setSelectedMode={setSelectedMode}
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ================= RANKING BACKGROUND ================= */}

            <div
              className="
                relative
                rounded-2xl
                overflow-hidden
                border
                border-[#3b1717]
                bg-gradient-to-br
                from-[#160b0d]
                via-[#0d0d0f]
                to-[#090909]
                shadow-[0_15px_50px_rgba(0,0,0,0.55)]
              "
            >

              {/* ================= RED TOP LINE ================= */}

              <div
                className="
                  absolute
                  top-0
                  left-1/2
                  -translate-x-1/2
                  w-[70%]
                  h-[1px]
                  bg-red-600
                  shadow-[0_0_20px_rgba(220,38,38,0.8)]
                "
              />

              {/* ================= TABLE HEADER ================= */}

              <div
                className="
                  hidden
                  md:grid
                  grid-cols-[80px_minmax(250px,1fr)_120px_330px]
                  items-center
                  gap-4
                  px-6
                  py-4
                  bg-[#090a0c]
                  border-b
                  border-[#281518]
                  text-[11px]
                  text-red-500/80
                  font-black
                  uppercase
                  tracking-[0.15em]
                "
              >

                <div>#</div>

                <div>Player</div>

                <div>Region</div>

                <div className="text-right">
                  Tiers
                </div>

              </div>

              {/* ================= CONTENT ================= */}

              <AnimatePresence mode="wait">

                {/* ================= OVERALL ================= */}

                {selectedMode === "overall" ? (

                  <motion.div
                    key="overall"
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -15,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >

                    <div className="p-3 sm:p-4 md:p-5 space-y-3">

                      {filteredPlayers.length > 0 ? (

                        filteredPlayers.map((player, index) => (

                          <motion.div
                            key={player.ign}
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay: Math.min(
                                index * 0.025,
                                0.35
                              ),
                              duration: 0.25,
                            }}
                            className="w-full"
                          >

                            <div
                              onClick={() => openPlayer(player)}
                              className="
                                cursor-pointer
                                w-full
                                rounded-xl
                                transition-all
                                duration-200
                                hover:-translate-y-[1px]
                                hover:border-red-900
                                hover:shadow-[0_8px_30px_rgba(0,0,0,0.45)]
                              "
                            >

                              <PlayerRow
                                player={player}
                                rank={index + 1}
                                mode={selectedMode}
                              />

                            </div>

                          </motion.div>

                        ))

                      ) : (

                        <div
                          className="
                            py-16
                            text-center
                            rounded-xl
                            border
                            border-dashed
                            border-[#3b2022]
                            bg-[#0b0a0b]
                          "
                        >

                          <p className="text-gray-400 font-semibold">
                            No players found
                          </p>

                          {search && (
                            <p className="text-gray-600 text-sm mt-1">
                              Try searching for another player.
                            </p>
                          )}

                        </div>

                      )}

                    </div>

                  </motion.div>

                ) : (

                  /* ================= INDIVIDUAL GAMEMODE ================= */

                  <motion.div
                    key={selectedMode}
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -15,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="p-3 sm:p-4 md:p-5"
                  >

                    <TierColumns
                      players={sortedPlayers}
                      mode={selectedMode}
                      onPlayerClick={openPlayer}
                    />

                  </motion.div>

                )}

              </AnimatePresence>

            </div>

          </motion.section>

        </div>

      </main>

      {/* ================= PLAYER POPUP ================= */}

      <PlayerPopup
        player={selectedPlayer}
        mode={selectedMode}
        isOpen={popupOpen}
        onClose={closePlayer}
      />

    </div>
  );
}

export default function Ranking() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-gray-400 font-semibold">
            Loading rankings...
          </div>
        </div>
      }
    >
      <RankingContent />
    </Suspense>
  );
}
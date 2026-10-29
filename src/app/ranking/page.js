"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../components/Navbar";
import GamemodeBar from "../components/GamemodeBar";
import PlayerRow from "../components/PlayerRow";
import TierColumns from "../components/TierColumns";
import PlayerPopup from "../components/PlayerPopup";
import { CheckIcon, CopyIcon } from "../components/CodeIcons";
import { getPlayers } from "../../lib/playerService";

const modeNames = {
  overall: "Overall",
  sword: "Sword",
  axe: "Axe",
  mace: "Mace",
  diapot: "DiaPot",
  nethpot: "NethPot",
  smp: "SMP",
  uhc: "UHC",
  crystal: "Crystal",
};

function RankingContent() {
  const searchParams = useSearchParams();

  const [selectedMode, setSelectedMode] = useState("overall");
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [ipCopied, setIpCopied] = useState(false);

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

  /* ================= COPY IP ================= */

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText("play.swiftmc.fun");

      setIpCopied(true);

      setTimeout(() => {
        setIpCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy IP:", error);
    }
  };

  const visibleCount =
    selectedMode === "overall"
      ? filteredPlayers.length
      : sortedPlayers.length;

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar search={search} setSearch={setSearch} />

      <main className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1320px]">
          {/* ================= PAGE HEADER ================= */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 border-b border-line-soft pb-7 pt-8 sm:flex-row sm:items-end sm:justify-between sm:pb-8 sm:pt-10"
          >
            <div>
              <p className="text-[12px] font-semibold text-[#E05252]">
                Leaderboard
              </p>

              <h1 className="mt-2 text-[36px] font-bold leading-none tracking-[-0.045em] text-white sm:text-[46px]">
                Player rankings
              </h1>

              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#A1A1AA]">
                Overall standings and tier placements across every KairoTiers
                gamemode.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyIP}
                title="Copy server IP"
                className="
                  group
                  flex
                  h-10
                  items-center
                  gap-2.5
                  rounded-[9px]
                  border
                  border-line
                  bg-surface
                  px-3.5
                  transition-colors
                  duration-200
                  hover:border-line-red
                  hover:bg-surface-hover
                "
              >
                {ipCopied ? (
                  <CheckIcon className="h-4 w-4 text-emerald-400" />
                ) : (
                  <CopyIcon className="h-4 w-4 text-[#6F6F78]" />
                )}

                <span
                  aria-live="polite"
                  className="code text-[12px] font-medium text-[#D4D4D8]"
                >
                  {ipCopied ? "Copied" : "play.swiftmc.fun"}
                </span>
              </button>
            </div>
          </motion.div>

          {/* ================= GAMEMODE SELECTOR ================= */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6"
          >
            <GamemodeBar
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
            />
          </motion.div>

          {/* ================= STANDINGS ================= */}

          <section className="mt-5">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-3 flex items-end justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <h2 className="text-[15px] font-semibold text-white">
                  {modeNames[selectedMode] || selectedMode}{" "}
                  {selectedMode === "overall" ? "standings" : "tiers"}
                </h2>

                {selectedMode === "overall" && (
                  <span className="rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] font-medium tabular-nums text-[#A1A1AA]">
                    {visibleCount}
                  </span>
                )}
              </div>

              <p className="hidden text-[12px] text-[#6F6F78] sm:block">
                {selectedMode === "overall"
                  ? "Ranked by total points"
                  : `${sortedPlayers.length} players · Grouped by tier placement`}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {selectedMode === "overall" ? (
                <motion.div
                  key="overall"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="
                    overflow-hidden
                    rounded-[12px]
                    border
                    border-line
                    bg-surface
                  "
                >
                  <div
                    className="
                      hidden
                      items-center
                      border-b
                      border-line-soft
                      bg-[#080808]
                      md:grid
                      md:grid-cols-[64px_228px_minmax(0,1fr)_84px]
                      xl:grid-cols-[72px_292px_minmax(0,1fr)_104px]
                    "
                  >
                    <div className="py-2.5 text-center">
                      <span className="text-[12px] font-medium text-[#6F6F78]">
                        Rank
                      </span>
                    </div>

                    <div className="px-3 py-2.5">
                      <span className="text-[12px] font-medium text-[#6F6F78]">
                        Player
                      </span>
                    </div>

                    <div className="px-4 py-2.5 text-right">
                      <span className="text-[12px] font-medium text-[#6F6F78]">
                        Tier matrix
                      </span>
                    </div>

                    <div className="px-4 py-2.5 text-right">
                      <span className="text-[12px] font-medium text-[#6F6F78]">
                        Points
                      </span>
                    </div>
                  </div>

                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player, index) => (
                      <motion.div
                        key={player.ign}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: Math.min(index * 0.015, 0.2),
                          duration: 0.2,
                        }}
                      >
                        <div
                          onClick={() => openPlayer(player)}
                          className="cursor-pointer"
                        >
                          <PlayerRow
                            player={player}
                            rank={index + 1}
                            mode={selectedMode}
                            isLast={index === filteredPlayers.length - 1}
                          />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="px-6 py-16 text-center">
                      <p className="text-[15px] font-semibold text-[#D4D4D8]">
                        No players found
                      </p>

                      {search && (
                        <p className="mt-1.5 text-[13px] text-[#6F6F78]">
                          Try searching for another player.
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={selectedMode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <TierColumns
                    players={sortedPlayers}
                    mode={selectedMode}
                    onPlayerClick={openPlayer}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
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
        <div className="flex min-h-screen items-center justify-center bg-background px-4 text-white">
          <p className="text-[14px] text-[#A1A1AA]">Loading rankings...</p>
        </div>
      }
    >
      <RankingContent />
    </Suspense>
  );
}

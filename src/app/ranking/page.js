"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import GamemodeBar from "../components/GamemodeBar";
import PlayerRow from "../components/PlayerRow";
import TierColumns from "../components/TierColumns";
import PlayerPopup from "../components/PlayerPopup";
import { getPlayers } from "../../lib/playerService";

export default function Ranking() {
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
useEffect(() => {
  async function loadPlayers() {
    const data = await getPlayers();
    setPlayers(data);
  }

  loadPlayers();
  async function loadPlayers() {
  const data = await getPlayers();
  console.log("DATA:", JSON.stringify(data, null, 2));

  console.log("PAGE RECEIVED:", data);
console.log(data);
  setPlayers(data);
}
}, []);
console.log("STATE PLAYERS:", players);
const sortedPlayers = [...players]
  .filter((p) => p?.[selectedMode])
  .sort((a, b) => b[selectedMode].points - a[selectedMode].points);
const filteredPlayers = sortedPlayers.filter(
  (player) =>
    player?.ign &&
    player.ign.toLowerCase().includes(search.toLowerCase())
);
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#080808] via-[#0F0F0F] to-[#050505] text-white pt-28 px-8">

        <div className="max-w-7xl mx-auto overflow-visible">

          {/* Heading */}

          <motion.h1
            initial={{ opacity: 0, y: -35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
           className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 md:mb-10"
          >
            <span className="text-red-600 drop-shadow-[0_0_18px_red]">
              Player
            </span>{" "}

            <span className="text-white">
              Rankings
            </span>

          </motion.h1>

          {/* Search */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .15, duration: .5 }}
          >
            <SearchBar
  search={search}
  setSearch={setSearch}
/>
          </motion.div>

          {/* Gamemodes */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .25, duration: .5 }}
          >

          <GamemodeBar
  selectedMode={selectedMode}
  setSelectedMode={setSelectedMode}
/>

{selectedMode === "overall" ? (

  <>
    {/* Header */}

    
<div className="hidden md:grid grid-cols-[80px_1fr_120px_120px] px-6 py-4 bg-[#1D1D1D] text-gray-400 font-bold uppercase tracking-wider rounded-t-2xl">
      <div>#</div>
      <div>Player</div>
      <div>Tier</div>
      <div>Points</div>

    </div>

    {/* Rows */}

    <div className="p-3 space-y-3 bg-[#151515] border border-[#252525] rounded-b-2xl">

      {filteredPlayers.map((player, index) => (

        <motion.div
          key={player.ign}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: .45 + index * .08,
            duration: .45
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
            />
          </div>

        </motion.div>

      ))}

    </div>

  </>

) : (

<TierColumns
  players={sortedPlayers}
  mode={selectedMode}
  onPlayerClick={openPlayer}
/>


)}          </motion.div>

        </div>

      </main>

      <PlayerPopup
        player={selectedPlayer}
        mode={selectedMode}
        isOpen={popupOpen}
        onClose={closePlayer}
      />

    </>
  );
}
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { getHallOfFame } from "../../lib/hallOfFameService";

export default function HallOfFame() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getHallOfFame();
      setPlayers(data);
    }

    load();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-[#080808] via-[#0F0F0F] to-[#050505] text-white pt-28 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-black mb-12 text-center">

            <span className="text-yellow-400">
              Hall
            </span>{" "}

            <span className="text-red-600">
              Of
            </span>{" "}

            <span className="text-white">
              Fame
            </span>

          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {players.map((player) => (

    <motion.div
      key={player.id}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      className="group relative overflow-hidden rounded-3xl border border-[#2d2d2d] bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] p-8 transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_35px_rgba(220,38,38,.25)]"
    >

      <img
        src={
          player.image
            ? player.image
            : `https://mc-heads.net/avatar/${player.ign}/128`
        }
        alt={player.ign}
        className="w-32 h-32 mx-auto rounded-2xl border border-red-700 p-1 mb-6 transition duration-300 group-hover:scale-105"
      />

      <h2 className="text-4xl font-black tracking-wide text-center text-white">
        {player.ign}
      </h2>

      <p className="text-red-500 uppercase tracking-[3px] text-sm text-center mt-3 font-bold">
        {player.title}
      </p>

      <p className="text-gray-400 text-center mt-6 leading-7">
        {player.description}
      </p>

    </motion.div>

  ))}

</div>
</div>

</main>

</>
);
}
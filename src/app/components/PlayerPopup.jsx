"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function PlayerPopup({
  player,
  mode,
  isOpen,
  onClose,
}) {
  if (!player) return null;

  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >

          <motion.div
            initial={{ opacity: 0, scale: .92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .92 }}
            transition={{ duration: .22 }}
            onClick={(e)=>e.stopPropagation()}
            className="relative w-full max-w-md rounded-[32px] overflow-hidden border border-[#2b2b2b] bg-[#111111] shadow-[0_0_60px_rgba(255,0,0,.18)]"
          >

            {/* Close */}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1d1d1d] hover:bg-red-600 transition"
            >
              ✕
            </button>

            {/* Header */}

            <div className="h-24 bg-gradient-to-r from-red-700 via-red-600 to-red-500 flex justify-center">

              <img
                src={`https://mc-heads.net/avatar/${player.ign}/128`}
                alt={player.ign}
                onError={(e)=>{
                  e.currentTarget.src="https://mc-heads.net/avatar/Steve/128";
                }}
                className="w-28 h-28 rounded-2xl border-4 border-[#111111] mt-10 shadow-[0_0_30px_rgba(255,0,0,.35)]"
              />

            </div>

            {/* Body */}

            <div className="pt-16 pb-8 px-7">

              <h1 className="text-center text-3xl font-black">
                {player.ign}
              </h1>

              <p className="text-center text-gray-500 mt-2">
                Minecraft Ranked Player
              </p>

              {mode === "overall" ? (

                <>
                  <div className="flex justify-center mt-6">

                    <div className="px-5 py-2 rounded-xl bg-[#191919] border border-red-600">

                      🏆 Overall •{" "}
                      <span className="font-bold text-red-500">
                        {player.overall.tier}
                      </span>

                    </div>

                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-8">

<Game
  icon="/icons/sword.svg"
  tier={player.sword?.tier}
/>

<Game
  icon="/icons/axe.svg"
  tier={player.axe?.tier}
/>

<Game
  icon="/icons/mace.svg"
  tier={player.mace?.tier}
/>

<Game
  icon="/icons/pot.svg"
  tier={player.pot?.tier}
/>

<Game
  icon="/icons/nethpot.svg"
  tier={player.nethpot?.tier}
/>

<Game
  icon="/icons/smp.svg"
  tier={player.smp?.tier}
/>

<Game
  icon="/icons/uhc.svg"
  tier={player.uhc?.tier}
/>

<Game
  icon="/icons/vanilla.svg"
  tier={player.vanilla?.tier}
/>

                  </div>

                </>

              ) : (

                <div className="mt-8">

                  <div className="bg-[#181818] rounded-2xl border border-red-600 p-6 flex justify-between items-center">

                    <span className="text-lg font-semibold uppercase">
                      {mode}
                    </span>

                    <span className="text-2xl font-black text-red-500">
                      {player[mode].tier}
                    </span>

                  </div>

                </div>

              )}

              <button
                onClick={onClose}
                className="mt-8 w-full rounded-2xl bg-red-600 hover:bg-red-700 py-3 font-bold transition"
              >
                Close
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}

function Game({icon,tier}){

  tier = tier || "-";

  const high=tier.startsWith("HT");

  return(

    <div className="rounded-2xl border border-[#2a2a2a] bg-[#181818] py-4 hover:border-red-600 transition text-center">

<img
  src={icon}
  alt=""
  className="w-8 h-8 object-contain mx-auto"
/>

      <div
        className={`mt-3 font-black ${
          high
          ? "text-red-400"
          : "text-cyan-400"
        }`}
      >
        {tier}
      </div>

    </div>

  );

}
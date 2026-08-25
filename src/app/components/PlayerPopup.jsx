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
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/80
            backdrop-blur-md
            p-3
            sm:p-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 15,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-[470px]
              rounded-[28px]
              border
              border-[#303034]
              bg-[#0d0d0f]
              shadow-[0_0_80px_rgba(220,38,38,0.14)]
              overflow-hidden
            "
          >

            {/* ================= TOP GLOW ================= */}

            <div
              className="
                absolute
                top-0
                left-1/2
                -translate-x-1/2
                w-[280px]
                h-[150px]
                rounded-full
                bg-red-600/10
                blur-[75px]
                pointer-events-none
              "
            />

            {/* ================= CLOSE ================= */}

            <button
              onClick={onClose}
              className="
                absolute
                top-4
                right-4
                z-30
                w-9
                h-9
                rounded-full
                flex
                items-center
                justify-center
                bg-[#19191c]
                border
                border-[#333338]
                text-gray-300
                text-lg
                hover:text-white
                hover:bg-red-600
                hover:border-red-500
                transition-all
                duration-200
              "
            >
              ×
            </button>

            {/* ================= HEADER ================= */}

            <div className="relative pt-7">

              <div className="flex justify-center">

                <div
                  className="
                    relative
                    p-[3px]
                    rounded-[21px]
                    bg-gradient-to-br
                    from-red-500
                    via-red-700
                    to-[#350909]
                    shadow-[0_0_30px_rgba(220,38,38,0.25)]
                  "
                >

                  <img
                    src={`https://mc-heads.net/avatar/${player.ign}/128`}
                    alt={player.ign}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://mc-heads.net/avatar/Steve/128";
                    }}
                    className="
                      w-24
                      h-24
                      sm:w-28
                      sm:h-28
                      rounded-[18px]
                      bg-[#111113]
                      object-cover
                    "
                  />

                </div>

              </div>

              {/* PLAYER NAME */}

              <div className="text-center mt-3 px-6">

                <h1
                  className="
                    text-2xl
                    sm:text-3xl
                    font-black
                    tracking-tight
                    text-white
                  "
                >
                  {player.ign}
                </h1>

                <p className="mt-1 text-sm text-gray-300 font-medium">
                  KairoTiers Ranked Player
                </p>

              </div>

            </div>

            {/* ================= BODY ================= */}

            <div className="px-4 sm:px-6 pb-5 pt-5">

              {/* ================= OVERALL ================= */}

              {mode === "overall" ? (
                <>
                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#402326]
                      bg-gradient-to-r
                      from-[#190b0e]
                      via-[#130e10]
                      to-[#101012]
                      p-4
                    "
                  >

                    <div
                      className="
                        absolute
                        right-0
                        top-0
                        w-28
                        h-28
                        rounded-full
                        bg-red-600/10
                        blur-[45px]
                      "
                    />

                    <div className="relative flex items-center justify-between">

                      <div>

                        <p
                          className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            font-bold
                            text-white
                          "
                        >
                          Overall Rating
                        </p>

                        <p className="mt-1 text-xs text-white">
                          Across all gamemodes
                        </p>

                      </div>

                      <div className="text-right">

                        <p
                          className={`text-3xl font-black ${
                            player?.overall?.tier
                              ? getTierColor(player?.overall?.tier)
                              : "text-white"
                          }`}
                        >
                          {player?.overall?.tier || "Unranked"}
                        </p>

                        <p className="text-[10px] text-white font-bold">
                          {player?.overall?.points || 0} POINTS
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ================= GAMEMODES ================= */}

                  <div className="grid grid-cols-4 gap-2.5 mt-4">

                    <Game
                      icon="/icons/sword.svg"
                      name="Sword"
                      tier={player.sword?.tier}
                    />

                    <Game
                      icon="/icons/axe.svg"
                      name="Axe"
                      tier={player.axe?.tier}
                    />

                    <Game
                      icon="/icons/mace.svg"
                      name="Mace"
                      tier={player.mace?.tier}
                    />

                    <Game
                      icon="/icons/diapot.svg"
                      name="DiaPot"
                      tier={player.diapot?.tier}
                    />

                    <Game
                      icon="/icons/nethpot.svg"
                      name="NethPot"
                      tier={player.nethpot?.tier}
                    />

                    <Game
                      icon="/icons/smp.svg"
                      name="SMP"
                      tier={player.smp?.tier}
                    />

                    <Game
                      icon="/icons/uhc.svg"
                      name="UHC"
                      tier={player.uhc?.tier}
                    />

                    <Game
                      icon="/icons/crystal.svg"
                      name="Crystal"
                      tier={player.crystal?.tier}
                    />

                  </div>
                </>
              ) : (

                /* ================= SINGLE MODE ================= */

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[#402326]
                    bg-gradient-to-r
                    from-[#190b0e]
                    via-[#130e10]
                    to-[#101012]
                    p-6
                  "
                >

                  <div className="text-center">

                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-gray-400
                        font-bold
                      "
                    >
                      {mode}
                    </p>

                    <p
                      className={`mt-3 text-5xl font-black ${
                        player?.[mode]?.tier
                          ? getTierColor(player?.[mode]?.tier)
                          : "text-white"
                      }`}
                    >
                      {player?.[mode]?.tier || "Unranked"}
                    </p>

                    <p className="mt-2 text-xs text-white font-bold">
                      {player?.[mode]?.points || 0} POINTS
                    </p>

                  </div>

                </div>

              )}

              {/* ================= CLOSE BUTTON ================= */}

              <button
                onClick={onClose}
                className="
                  mt-4
                  w-full
                  rounded-2xl
                  bg-red-600
                  hover:bg-red-700
                  hover:shadow-[0_0_25px_rgba(220,38,38,0.25)]
                  py-3
                  font-bold
                  text-white
                  transition-all
                  duration-200
                "
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


/* ========================================================= */
/* TIER COLOR */
/* ========================================================= */

function getTierColor(tier) {
  if (!tier) return "text-white";

  const value = tier.toUpperCase();

  if (value.includes("HT1")) return "text-yellow-400";
  if (value.includes("LT1")) return "text-yellow-300";

  if (value.includes("HT2")) return "text-blue-400";
  if (value.includes("LT2")) return "text-blue-300";

  if (value.includes("HT3")) return "text-orange-400";
  if (value.includes("LT3")) return "text-orange-300";

  if (value.includes("HT4")) return "text-purple-400";
  if (value.includes("LT4")) return "text-purple-300";

  if (value.includes("HT5")) return "text-gray-300";
  if (value.includes("LT5")) return "text-gray-400";

  return "text-gray-400";
}


/* ========================================================= */
/* GAMEMODE CARD */
/* ========================================================= */

function Game({ icon, name, tier }) {
  const tierColor = getTierColor(tier);

  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-xl
        border
        border-[#2b2b30]
        bg-[#141416]
        py-2.5
        px-1
        text-center
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-[#4a292d]
        hover:bg-[#191416]
        hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
      "
    >

      {/* TOP RED LINE */}

      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-0
          h-[2px]
          bg-red-600
          group-hover:w-9
          shadow-[0_0_10px_rgba(220,38,38,0.7)]
          transition-all
          duration-200
        "
      />

      {/* ICON */}

      <div
        className="
          w-9
          h-9
          mx-auto
          rounded-lg
          flex
          items-center
          justify-center
          bg-[#0d0d0f]
          border
          border-[#29292e]
          group-hover:border-[#3c3032]
          transition-all
        "
      >

        <img
          src={icon}
          alt={name}
          className="
            w-[22px]
            h-[22px]
            object-contain
            opacity-90
            group-hover:opacity-100
            group-hover:scale-110
            transition-all
          "
        />

      </div>

      {/* NAME */}

      <p
        className="
          mt-1.5
          text-[9px]
          uppercase
          tracking-wider
          font-bold
          text-gray-300
        "
      >
        {name}
      </p>

      {/* TIER */}

      <p
        className={`
          mt-0.5
          text-sm
          font-black
          ${tierColor}
        `}
      >
        {tier || "—"}
      </p>

    </div>
  );
}
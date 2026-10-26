"use client";

import { AnimatePresence, motion } from "framer-motion";

import { CloseIcon } from "./CodeIcons";
import { getTierText } from "./tierStyles";

const modeIcons = {
  sword: "/icons/sword.svg",
  axe: "/icons/axe.svg",
  mace: "/icons/mace.svg",
  diapot: "/icons/diapot.svg",
  nethpot: "/icons/nethpot.svg",
  smp: "/icons/smp.svg",
  uhc: "/icons/uhc.svg",
  crystal: "/icons/crystal.svg",
};

export default function PlayerPopup({ player, mode, isOpen, onClose }) {
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
            bg-black/75
            p-3
            sm:p-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${player.ign} player profile`}
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="
              relative
              max-h-[calc(100dvh-1.5rem)]
              w-full
              max-w-[480px]
              overflow-y-auto
              rounded-[16px]
              border
              border-line
              bg-surface
              shadow-[0_18px_50px_rgba(0,0,0,0.55)]
            "
          >
            {/* ================= HEADER ================= */}

            <div className="flex items-center gap-4 border-b border-line-soft px-5 py-5 sm:px-6">
              <img
                src={`https://mc-heads.net/avatar/${player.ign}/128`}
                alt={player.ign}
                onError={(event) => {
                  event.currentTarget.src =
                    "https://mc-heads.net/avatar/Steve/128";
                }}
                className="
                  h-16
                  w-16
                  shrink-0
                  rounded-[10px]
                  border
                  border-[#2A2A2A]
                  bg-[#0A0A0A]
                  object-cover
                "
              />

              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-[#6F6F78]">
                  Player profile
                </p>

                <h1 className="mt-1 truncate text-[24px] font-bold tracking-[-0.035em] text-white">
                  {player.ign}
                </h1>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close player details"
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-[9px]
                  text-[#8B8B94]
                  transition-colors
                  duration-200
                  hover:bg-surface-hover
                  hover:text-white
                "
              >
                <CloseIcon className="h-[18px] w-[18px]" />
              </button>
            </div>

            {/* ================= BODY ================= */}

            <div className="px-5 py-5 sm:px-6">
              {mode === "overall" ? (
                <>
                  <div className="grid grid-cols-2 overflow-hidden rounded-[12px] border border-line bg-[#0A0A0A]">
                    <div className="border-r border-line-soft px-4 py-4">
                      <p className="text-[11px] font-medium text-[#6F6F78]">
                        Overall tier
                      </p>

                      <p
                        className={`mt-1.5 text-[26px] font-bold leading-none tracking-[-0.03em] ${getTierText(
                          player?.overall?.tier
                        )}`}
                      >
                        {player?.overall?.tier || "Unranked"}
                      </p>
                    </div>

                    <div className="px-4 py-4">
                      <p className="text-[11px] font-medium text-[#6F6F78]">
                        Points
                      </p>

                      <p className="mt-1.5 text-[26px] font-bold leading-none tabular-nums text-white">
                        {player?.overall?.points || 0}
                      </p>
                    </div>
                  </div>

                  <div className="mb-2 mt-5 flex items-center justify-between gap-3">
                    <p className="text-[13px] font-semibold text-[#D4D4D8]">
                      Gamemode tiers
                    </p>

                    <span className="text-[11px] text-[#6F6F78]">
                      Tier placement
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
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
                <div className="overflow-hidden rounded-[12px] border border-line bg-[#0A0A0A]">
                  <div className="flex items-center justify-between gap-3 border-b border-line-soft px-4 py-3">
                    <span className="text-[13px] font-semibold text-[#D4D4D8]">
                      {mode} tier
                    </span>

                    <span className="text-[11px] text-[#6F6F78]">
                      KairoTiers
                    </span>
                  </div>

                  <div className="flex items-center gap-4 px-4 py-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#151111]">
                      <img
                        src={modeIcons[mode] || "/icons/overall.svg"}
                        alt=""
                        className="h-6 w-6 object-contain"
                      />
                    </span>

                    <div>
                      <p
                        className={`text-[32px] font-bold leading-none tracking-[-0.04em] ${getTierText(
                          player?.[mode]?.tier
                        )}`}
                      >
                        {player?.[mode]?.tier || "Unranked"}
                      </p>

                      <p className="mt-1.5 text-[12px] text-[#6F6F78]">
                        <span className="font-semibold tabular-nums text-[#A1A1AA]">
                          {player?.[mode]?.points || 0}
                        </span>{" "}
                        points
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={onClose}
                className="
                  mt-5
                  h-11
                  w-full
                  rounded-[9px]
                  border
                  border-line
                  bg-[#0A0A0A]
                  text-[14px]
                  font-semibold
                  text-[#D4D4D8]
                  transition-colors
                  duration-200
                  hover:border-line-red
                  hover:bg-surface-hover
                  hover:text-white
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
/* GAMEMODE CELL                                             */
/* ========================================================= */

function Game({ icon, name, tier }) {
  return (
    <div className="rounded-[9px] border border-line bg-[#0A0A0A] px-1 py-2.5 text-center">
      <img src={icon} alt="" className="mx-auto h-[18px] w-[18px] object-contain" />

      <p className="mt-1.5 text-[10px] font-medium text-[#6F6F78]">{name}</p>

      <p
        className={`mt-0.5 text-[11px] font-semibold ${getTierText(tier)}`}
      >
        {tier || "—"}
      </p>
    </div>
  );
}

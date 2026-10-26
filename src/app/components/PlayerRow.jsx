"use client";

import RankBadge from "./RankBadge";
import { formatTier, getTierText } from "./tierStyles";

const modes = [
  { icon: "/icons/nethpot.svg", key: "nethpot" },
  { icon: "/icons/diapot.svg", key: "diapot" },
  { icon: "/icons/sword.svg", key: "sword" },
  { icon: "/icons/smp.svg", key: "smp" },
  { icon: "/icons/crystal.svg", key: "crystal" },
  { icon: "/icons/mace.svg", key: "mace" },
  { icon: "/icons/axe.svg", key: "axe" },
  { icon: "/icons/uhc.svg", key: "uhc" },
];

export default function PlayerRow({
  player,
  rank,
  mode,
  isLast = false,
}) {
  const activePoints =
    mode === "overall"
      ? player?.overall?.points || 0
      : player?.[mode]?.points || 0;

  const activeTier =
    mode === "overall"
      ? player?.overall?.tier
      : player?.[mode]?.tier;

  return (
    <div
      className={`
        group
        relative
        transition-colors
        duration-200
        hover:bg-[#0D0A0A]
        ${rank === 1 ? "bg-[#0B0808]" : ""}
        ${isLast ? "" : "border-b border-[#1A1A1A]"}
      `}
    >
      {/* ================= DESKTOP ================= */}

      <div
        className="
          hidden
          items-center
          md:grid
          md:grid-cols-[64px_228px_minmax(0,1fr)_84px]
          xl:grid-cols-[72px_292px_minmax(0,1fr)_104px]
        "
      >
        {/* RANK */}

        <div className="flex items-center justify-center py-3.5">
          <RankBadge rank={rank} />
        </div>

        {/* PLAYER */}

        <div className="flex min-w-0 items-center gap-3 px-3 py-3.5">
          <img
            src={`https://mc-heads.net/avatar/${player?.ign}/64`}
            alt={player?.ign || "Player"}
            className="
              h-11
              w-11
              shrink-0
              rounded-[9px]
              border
              border-[#2A2A2A]
              bg-surface
              object-cover
            "
            onError={(event) => {
              event.currentTarget.src =
                "https://mc-heads.net/avatar/Steve/64";
            }}
          />

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[16px] font-semibold text-[#F4F4F5] transition-colors group-hover:text-white">
              {player?.ign || "Unknown"}
            </h2>

            <p className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[12.5px]">
              {mode === "overall" ? (
                <span className="truncate text-[#6F6F78]">
                  Overall ranking
                </span>
              ) : (
                <>
                  <span
                    className={`shrink-0 font-medium ${getTierText(
                      activeTier
                    )}`}
                  >
                    {activeTier || "Unranked"}
                  </span>

                  <span className="text-[#3A3A42]">·</span>

                  <span className="truncate text-[#6F6F78]">{mode}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* TIER MATRIX */}

        <div className="flex items-center gap-1 px-4 py-3.5 xl:gap-1.5">
          {modes.map((item) => {
            const data = player?.[item.key];
            const selected = item.key === mode;

            return (
              <div
                key={item.key}
                className={`
                  flex
                  min-w-0
                  flex-1
                  shrink
                  flex-col
                  items-center
                  gap-1.5
                  rounded-[7px]
                  py-1.5
                  ${selected ? "bg-[#151111]" : ""}
                `}
              >
                <img
                  src={item.icon}
                  alt={item.key}
                  className="h-[18px] w-[18px] object-contain xl:h-5 xl:w-5"
                />

                <span
                  className={`
                    text-[10.5px]
                    font-semibold
                    leading-none
                    xl:text-[11.5px]
                    ${getTierText(data?.tier)}
                  `}
                >
                  {formatTier(data?.tier)}
                </span>
              </div>
            );
          })}
        </div>

        {/* POINTS */}

        <div className="px-4 py-3.5 text-right">
          <span className="text-[16px] font-semibold tabular-nums text-white">
            {activePoints}
          </span>

          <span className="ml-1 text-[11px] font-medium text-[#6F6F78]">
            pts
          </span>
        </div>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="md:hidden">
        <div className="flex items-center gap-3 px-4 py-4">
          <RankBadge rank={rank} compact />

          <img
            src={`https://mc-heads.net/avatar/${player?.ign}/64`}
            alt={player?.ign || "Player"}
            className="
              h-11
              w-11
              shrink-0
              rounded-[9px]
              border
              border-[#2A2A2A]
              bg-surface
              object-cover
            "
            onError={(event) => {
              event.currentTarget.src =
                "https://mc-heads.net/avatar/Steve/64";
            }}
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h2 className="truncate text-[15px] font-semibold text-[#F4F4F5]">
                {player?.ign || "Unknown"}
              </h2>

              <span className="shrink-0 text-[15px] font-semibold tabular-nums text-white">
                {activePoints}
                <span className="ml-1 text-[10.5px] font-medium text-[#6F6F78]">
                  pts
                </span>
              </span>
            </div>

            <div className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[12px]">
              {mode === "overall" ? (
                <span className="truncate text-[#6F6F78]">
                  Overall ranking
                </span>
              ) : (
                <>
                  <span
                    className={`shrink-0 font-semibold ${getTierText(
                      activeTier
                    )}`}
                  >
                    {activeTier || "Unranked"}
                  </span>

                  <span className="text-[#3A3A42]">·</span>

                  <span className="truncate text-[#6F6F78]">{mode}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE TIER STRIP */}

        <div className="border-t border-[#1A1A1A] bg-[#080808]">
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto px-4 py-3">
            {modes.map((item) => {
              const data = player?.[item.key];
              const selected = item.key === mode;

              return (
                <div
                  key={item.key}
                  className={`
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-[6px]
                    border
                    px-2
                    py-1.5
                    ${
                      selected
                        ? "border-line-red bg-[#151111]"
                        : "border-transparent"
                    }
                  `}
                >
                  <img
                    src={item.icon}
                    alt={item.key}
                    className="h-4 w-4 object-contain"
                  />

                  <span
                    className={`
                      text-[10.5px]
                      font-semibold
                      leading-none
                      ${getTierText(data?.tier)}
                    `}
                  >
                    {formatTier(data?.tier)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

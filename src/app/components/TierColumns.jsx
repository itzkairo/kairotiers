"use client";

import { getTierText, tierColumnStyles } from "./tierStyles";

export default function TierColumns({ players = [], mode, onPlayerClick }) {
  const tiers = [1, 2, 3, 4, 5].map((number) => ({
    number,
    title: `Tier ${number}`,
    players: players.filter(
      (player) =>
        player[mode]?.tier &&
        player[mode].tier.endsWith(number.toString())
    ),
  }));

  return (
    <div className="no-scrollbar md:overflow-x-auto">
      <div className="grid grid-cols-1 gap-3 md:min-w-[980px] md:grid-cols-5 md:pb-1">
        {tiers.map((tier) => {
          const style = tierColumnStyles[tier.number];

          return (
            <section
              key={tier.title}
              style={{ animationDelay: `${tier.number * 30}ms` }}
              className="animate-rise min-w-0 self-start overflow-hidden rounded-[12px] border border-line bg-surface"
            >
              <div className="flex items-center justify-between gap-2 border-b border-line-soft bg-[#080808] px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${style.bar}`} />

                  <span className="text-[13px] font-semibold text-[#D4D4D8]">
                    Tier {tier.number}
                  </span>
                </div>

                <span className="text-[12px] font-medium tabular-nums text-[#6F6F78]">
                  {tier.players.length}
                </span>
              </div>

              <div className="p-1.5">
                {tier.players.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2.5 py-9 text-center">
                    <img
                      src={`/icons/${mode}.svg`}
                      alt=""
                      className="h-7 w-7 object-contain opacity-30"
                    />

                    <p className="text-[12px] text-[#5F5F68]">No players</p>
                  </div>
                ) : (
                  <div>
                    {tier.players.map((player) => (
                      <button
                        key={player.ign}
                        type="button"
                        onClick={() => onPlayerClick(player)}
                        className="
                          flex
                          w-full
                          items-center
                          gap-3
                          rounded-[8px]
                          px-2.5
                          py-2.5
                          text-left
                          transition-colors
                          duration-200
                          hover:bg-[#101010]
                        "
                      >
                        <img
                          src={`https://mc-heads.net/avatar/${player.ign}/32`}
                          alt={player.ign}
                          className="
                            h-9
                            w-9
                            shrink-0
                            rounded-[7px]
                            border
                            border-line
                            bg-[#0A0A0A]
                            object-cover
                          "
                          onError={(event) => {
                            event.currentTarget.src =
                              "https://mc-heads.net/avatar/Steve/32";
                          }}
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[14px] font-medium text-[#D4D4D8]">
                            {player.ign}
                          </span>

                          <span className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[11px]">
                            <span
                              className={`shrink-0 font-semibold ${getTierText(
                                player[mode].tier
                              )}`}
                            >
                              {player[mode].tier}
                            </span>

                            <span className="text-[#3A3A42]">·</span>

                            <span className="truncate tabular-nums text-[#6F6F78]">
                              {player[mode]?.points || 0} pts
                            </span>
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

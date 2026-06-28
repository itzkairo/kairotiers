"use client";

const modes = [
  { icon: "/icons/sword.svg", key: "sword" },
  { icon: "/icons/axe.svg", key: "axe" },
  { icon: "/icons/mace.svg", key: "mace" },
  { icon: "/icons/pot.svg", key: "pot" },
  { icon: "/icons/nethpot.svg", key: "nethpot" },
  { icon: "/icons/smp.svg", key: "smp" },
  { icon: "/icons/uhc.svg", key: "uhc" },
  { icon: "/icons/vanilla.svg", key: "vanilla" },
];

export default function PlayerRow({ player, rank, mode }) {
  return (
<div
  className={`mt-3 rounded-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1

  ${
    rank === 1
      ? "bg-gradient-to-r from-yellow-950/30 to-[#1A1A1A] border border-yellow-500 hover:shadow-[0_0_35px_rgba(255,215,0,.35)]"

      : rank === 2
      ? "bg-gradient-to-r from-gray-800/40 to-[#1A1A1A] border border-gray-400 hover:shadow-[0_0_35px_rgba(255,255,255,.20)]"

      : rank === 3
      ? "bg-gradient-to-r from-orange-950/30 to-[#1A1A1A] border border-orange-500 hover:shadow-[0_0_35px_rgba(255,140,0,.25)]"

      : "bg-gradient-to-r from-[#141414] to-[#1A1A1A] border border-[#262626] hover:border-red-600 hover:shadow-[0_0_25px_rgba(255,0,0,.18)]"
  }`}
>

      <div className="grid grid-cols-[70px_1fr_120px_120px_420px] items-center p-5">

        {/* Rank */}
<div
  className={`text-3xl font-black ${
    rank === 1
      ? "text-yellow-400 drop-shadow-[0_0_15px_gold]"
      : rank === 2
      ? "text-gray-300 drop-shadow-[0_0_15px_white]"
      : rank === 3
      ? "text-orange-500 drop-shadow-[0_0_15px_orange]"
      : "text-red-500"
  }`}
>
  {rank === 1
    ? "🥇"
    : rank === 2
    ? "🥈"
    : rank === 3
    ? "🥉"
    : `#${rank}`}
</div>

        {/* Player */}
        <div className="flex items-center gap-4">

          <img
            src={`https://mc-heads.net/avatar/${player.ign}/64`}
            alt={player.ign}
            className="w-14 h-14 rounded-xl border border-[#333]"
            onError={(e) => {
              e.currentTarget.src = "https://mc-heads.net/avatar/Steve/64";
            }}
          />

          <div>
            <h2 className="text-xl font-bold">
              {player.ign}
            </h2>

            <p className="text-gray-500">
              ⭐ {player[mode].points} Points
            </p>
          </div>

        </div>

        {/* Selected Mode Tier */}
        <div className="text-center">
          <span className="bg-red-600 px-4 py-2 rounded-lg font-bold shadow-[0_0_18px_rgba(255,0,0,.45)]">
            {player[mode].tier}
          </span>
        </div>

        {/* Selected Mode Points */}
        <div className="text-center font-bold text-yellow-400">
          {player[mode].points}
        </div>

        {/* All Gamemode Tiers */}
        <div className="flex justify-end gap-5">

          {modes.map((item) => (
            <div
              key={item.key}
              className="flex flex-col items-center"
            >
              <img
  src={item.icon}
  alt={item.key}
  className="w-6 h-6 object-contain"
/>

              <span
                className={`text-sm font-bold ${
                  item.key === mode
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {player[item.key].tier}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}
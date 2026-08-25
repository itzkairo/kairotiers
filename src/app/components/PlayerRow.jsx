"use client";

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

function getTierColor(tier) {
  if (!tier) return "text-gray-600";

  const value = tier.toUpperCase();

  if (value.includes("HT1")) return "text-yellow-400";
  if (value.includes("LT1")) return "text-yellow-300";

  if (value.includes("HT2")) return "text-blue-300";
  if (value.includes("LT2")) return "text-blue-400";

  if (value.includes("HT3")) return "text-orange-400";
  if (value.includes("LT3")) return "text-orange-500";

  if (value.includes("HT4")) return "text-purple-400";
  if (value.includes("LT4")) return "text-purple-500";

  if (value.includes("HT5")) return "text-gray-300";
  if (value.includes("LT5")) return "text-gray-400";

  return "text-gray-500";
}

function getRankStyle(rank) {
  if (rank === 1) {
    return {
      card:
        "bg-gradient-to-r from-[#181713] via-[#101112] to-[#0c1015] border-[#4d4018] hover:border-[#75621f]",
      rankArea:
        "bg-gradient-to-br from-[#403814] via-[#29240f] to-[#17150b] border-r border-[#5b4b17]",
      medal:
        "text-[#d6aa00] drop-shadow-[0_0_8px_rgba(214,170,0,0.75)] drop-shadow-[0_0_20px_rgba(214,170,0,0.35)]",
      glow:
        "shadow-[0_0_25px_rgba(214,170,0,0.10)]",
    };
  }

  if (rank === 2) {
    return {
      card:
        "bg-gradient-to-r from-[#17191a] via-[#101214] to-[#0c1015] border-[#3f4548] hover:border-[#626a6f]",
      rankArea:
        "bg-gradient-to-br from-[#353b3e] via-[#252a2d] to-[#15191b] border-r border-[#4b5357]",
      medal:
        "text-[#9ba3a7] drop-shadow-[0_0_8px_rgba(155,163,167,0.65)] drop-shadow-[0_0_20px_rgba(155,163,167,0.25)]",
      glow:
        "shadow-[0_0_25px_rgba(155,163,167,0.08)]",
    };
  }

  if (rank === 3) {
    return {
      card:
        "bg-gradient-to-r from-[#191512] via-[#111213] to-[#0c1015] border-[#4b3220] hover:border-[#704a2d]",
      rankArea:
        "bg-gradient-to-br from-[#4a2e1a] via-[#302014] to-[#1b140f] border-r border-[#5b3a23]",
      medal:
        "text-[#9a5c2c] drop-shadow-[0_0_8px_rgba(154,92,44,0.7)] drop-shadow-[0_0_20px_rgba(154,92,44,0.3)]",
      glow:
        "shadow-[0_0_25px_rgba(154,92,44,0.08)]",
    };
  }

  return {
    card:
      "bg-gradient-to-r from-[#11161c] via-[#0e1318] to-[#0b1015] border-[#202b36] hover:border-[#334250]",
    rankArea:
      "bg-[#121922] border-r border-[#202b36]",
    medal:
      "text-gray-400",
    glow:
      "",
  };
}

function getMedal(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

export default function PlayerRow({ player, rank, mode }) {
  const rankStyle = getRankStyle(rank);
  const medal = getMedal(rank);

  return (
    <div
      className={`
        group
        relative
        w-full
        rounded-2xl
        border
        overflow-hidden
        transition-all
        duration-300
        ${rankStyle.card}
        ${rankStyle.glow}
        hover:-translate-y-[2px]
        hover:shadow-[0_10px_35px_rgba(0,0,0,0.35)]
      `}
    >
      {/* ================= DESKTOP ================= */}

      <div
        className="
          hidden
          md:flex
          items-stretch
          min-h-[88px]
        "
      >
        {/* ================= RANK / MEDAL ================= */}

        <div
          className={`
            relative
            shrink-0
            w-[100px]
            flex
            items-center
            justify-center
            ${rankStyle.rankArea}
          `}
        >
          {rank <= 3 && (
            <div
              className={`
                absolute
                inset-0
                opacity-40
                blur-xl
                pointer-events-none
                ${
                  rank === 1
                    ? "bg-[#8f7200]"
                    : rank === 2
                    ? "bg-[#6d7579]"
                    : "bg-[#70401f]"
                }
              `}
            />
          )}

          {medal ? (
            <div
              className={`
                relative
                z-10
                text-[42px]
                leading-none
                select-none
                ${rankStyle.medal}
                transition-transform
                duration-300
                group-hover:scale-110
              `}
            >
              {medal}
            </div>
          ) : (
            <div
              className="
                relative
                z-10
                text-2xl
                lg:text-3xl
                font-black
                text-gray-400
              "
            >
              {rank}.
            </div>
          )}
        </div>

        {/* ================= PLAYER ================= */}

        <div
          className="
            flex
            items-center
            gap-4
            min-w-0
            flex-1
            px-5
          "
        >
          {/* AVATAR */}

          <div
            className="
              relative
              shrink-0
              w-14
              h-14
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-xl
                bg-red-600/10
                blur-md
                opacity-0
                group-hover:opacity-100
                transition-opacity
              "
            />

            <img
              src={`https://mc-heads.net/avatar/${player?.ign}/64`}
              alt={player?.ign || "Player"}
              className="
                relative
                z-10
                w-14
                h-14
                rounded-xl
                border
                border-[#303b47]
                bg-[#0d141b]
                object-cover
                transition-all
                duration-300
                group-hover:border-[#4b5968]
                group-hover:scale-[1.03]
              "
              onError={(e) => {
                e.currentTarget.src =
                  "https://mc-heads.net/avatar/Steve/64";
              }}
            />
          </div>

          {/* NAME */}

          <div className="min-w-0 flex-1">
            <h2
              className="
                text-lg
                lg:text-xl
                font-black
                text-gray-100
                truncate
                group-hover:text-white
                transition-colors
              "
            >
              {player?.ign || "Unknown"}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
                truncate
              "
            >
              {mode === "overall"
                ? `${player?.overall?.points || 0} points`
                : `${player?.[mode]?.tier || "Unranked"} · ${
                    player?.[mode]?.points || 0
                  } points`}
            </p>
          </div>
        </div>

        {/* ================= TIERS ================= */}

        <div
          className="
            shrink-0
            flex
            items-center
            justify-end
            gap-3
            lg:gap-4
            px-5
            min-w-[390px]
          "
        >
          {modes.map((item) => {
            const data = player?.[item.key];

            return (
              <div
                key={item.key}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  min-w-[32px]
                "
              >
                {/* ICON */}

                <div
                  className={`
                    relative
                    flex
                    items-center
                    justify-center
                    w-9
                    h-9
                    rounded-full
                    border
                    transition-all
                    duration-300
                    ${
                      item.key === mode
                        ? "bg-[#1b2733] border-[#596b7c] scale-110 shadow-[0_0_12px_rgba(120,140,160,0.18)]"
                        : "bg-[#0b1117] border-[#26313d]"
                    }
                  `}
                >
                  <img
                    src={item.icon}
                    alt={item.key}
                    className="
                      w-[20px]
                      h-[20px]
                      object-contain
                    "
                  />
                </div>

                {/* TIER */}

                <span
                  className={`
                    text-[11px]
                    lg:text-xs
                    font-black
                    leading-none
                    ${getTierColor(data?.tier)}
                  `}
                >
                  {data?.tier || "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="md:hidden">
        {/* PLAYER HEADER */}

        <div className="flex items-center gap-3 p-4">
          {/* RANK / MEDAL */}

          <div
            className={`
              relative
              shrink-0
              w-11
              h-11
              rounded-xl
              flex
              items-center
              justify-center
              overflow-hidden
              ${rankStyle.rankArea}
            `}
          >
            {rank <= 3 ? (
              <>
                <div
                  className={`
                    absolute
                    inset-0
                    blur-md
                    opacity-40
                    ${
                      rank === 1
                        ? "bg-[#8f7200]"
                        : rank === 2
                        ? "bg-[#6d7579]"
                        : "bg-[#70401f]"
                    }
                  `}
                />

                <span
                  className={`
                    relative
                    z-10
                    text-2xl
                    ${rankStyle.medal}
                  `}
                >
                  {medal}
                </span>
              </>
            ) : (
              <span className="text-lg font-black text-gray-400">
                {rank}.
              </span>
            )}
          </div>

          {/* AVATAR */}

          <img
            src={`https://mc-heads.net/avatar/${player?.ign}/64`}
            alt={player?.ign || "Player"}
            className="
              w-12
              h-12
              shrink-0
              rounded-xl
              border
              border-[#303b47]
              bg-[#0d141b]
              object-cover
            "
            onError={(e) => {
              e.currentTarget.src =
                "https://mc-heads.net/avatar/Steve/64";
            }}
          />

          {/* NAME */}

          <div className="min-w-0 flex-1">
            <h2
              className="
                text-base
                font-black
                text-gray-100
                truncate
              "
            >
              {player?.ign || "Unknown"}
            </h2>

            <p className="mt-1 text-xs text-gray-500 truncate">
              {mode === "overall"
                ? `${player?.overall?.points || 0} points`
                : `${player?.[mode]?.tier || "Unranked"} · ${
                    player?.[mode]?.points || 0
                  } points`}
            </p>
          </div>
        </div>

        {/* ================= MOBILE TIERS ================= */}

        <div
          className="
            border-t
            border-[#202b36]
            px-4
            py-3
            overflow-x-auto
            touch-pan-x
            [scrollbar-width:none]
            [-ms-overflow-style:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div className="flex items-center gap-4 w-max">
            {modes.map((item) => {
              const data = player?.[item.key];

              return (
                <div
                  key={item.key}
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    min-w-[34px]
                    shrink-0
                  "
                >
                  {/* ICON */}

                  <div
                    className={`
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      border
                      transition-all
                      duration-200
                      ${
                        item.key === mode
                          ? "bg-[#1b2733] border-[#526273] shadow-[0_0_10px_rgba(100,120,140,0.18)]"
                          : "bg-[#0d141b] border-[#26313d]"
                      }
                    `}
                  >
                    <img
                      src={item.icon}
                      alt={item.key}
                      className="
                        w-5
                        h-5
                        object-contain
                      "
                    />
                  </div>

                  {/* TIER */}

                  <span
                    className={`
                      text-[10px]
                      font-black
                      leading-none
                      ${getTierColor(data?.tier)}
                    `}
                  >
                    {data?.tier || "—"}
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
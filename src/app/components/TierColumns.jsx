"use client";


export default function TierColumns({
  players = [],
  mode,
  onPlayerClick,
}) {

  const tiers = [1, 2, 3, 4, 5].map((number) => ({
    title: `Tier ${number}`,
    color:
      number === 1
        ? "border-yellow-500"
        : number === 2
        ? "border-gray-400"
        : number === 3
        ? "border-orange-500"
        : number === 4
        ? "border-red-600"
        : "border-[#333]",

    players: players.filter(
      (player) =>
        player[mode]?.tier &&
        player[mode].tier.endsWith(number.toString())
    ),
  }));
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

      {tiers.map((tier) => (

        <div
          key={tier.title}
          className={`bg-[#151515] border ${tier.color} rounded-2xl overflow-hidden shadow-lg`}
        >

          {/* Header */}

          <div className="bg-[#1E1E1E] py-4 text-center border-b border-[#2A2A2A]">

            <h2 className="text-xl font-black">
              {tier.title}
            </h2>

          </div>

          {/* Players */}

          <div className="p-4 min-h-[500px]">

            {tier.players.length === 0 ? (

              <div className="h-full flex flex-col justify-center items-center text-center text-gray-500">

<img
  src={`/icons/${mode}.svg`}
  alt={mode}
  className="w-16 h-16 mx-auto mb-4"
/>

                <p className="font-semibold">
                  No Players Yet
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {tier.players.map((player) => (

<div
  key={player.ign}
  onClick={() => onPlayerClick(player)}
  className="bg-[#101010] border border-[#2A2A2A] rounded-xl p-3 hover:border-red-600 transition cursor-pointer"
>

                    <div className="flex items-center gap-3">

                      <img
                        src={`https://mc-heads.net/avatar/${player.ign}/32`}
                        alt={player.ign}
                        className="w-10 h-10 rounded"
                      />

                      <div>

                        <div className="font-bold">
                          {player.ign}
                        </div>

                        <div className="text-red-500 text-sm">
                          {player[mode].tier}
                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      ))}

    </div>
  );
}
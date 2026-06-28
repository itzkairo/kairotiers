"use client";

const modes = [
  { name: "Overall", icon: "/icons/overall.svg" },
  { name: "Sword", icon: "/icons/sword.svg" },
  { name: "Axe", icon: "/icons/axe.svg" },
  { name: "Mace", icon: "/icons/mace.svg" },
  { name: "Pot", icon: "/icons/pot.svg" },
  { name: "NethPot", icon: "/icons/nethpot.svg" },
  { name: "SMP", icon: "/icons/smp.svg" },
  { name: "Vanilla", icon: "/icons/vanilla.svg" },
  { name: "UHC", icon: "/icons/uhc.svg" },
];

export default function GamemodeBar({
  selectedMode,
  setSelectedMode,
}) {
  return (
    <div className="mt-8 pt-2 overflow-x-auto overflow-y-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      <div className="flex gap-3 min-w-max py-2 px-2">
        {modes.map((mode) => {
          const modeKey = mode.name.toLowerCase();

          return (
            <button
              key={mode.name}
              onClick={() => setSelectedMode(modeKey)}
              className={`group relative w-28 h-24 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:scale-105

                ${
                  selectedMode === modeKey
                    ? "border-red-600 bg-[#1A1A1A] shadow-[0_0_25px_rgba(255,0,0,.35)]"
                    : "border-[#2a2a2a] bg-[#141414] hover:border-red-600 hover:bg-[#1b1b1b] hover:shadow-[0_0_20px_rgba(255,0,0,.18)]"
                }`}
            >

              <div className="flex flex-col items-center justify-center h-full">

                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                 <img
  src={mode.icon}
  alt={mode.label}
  className="w-8 h-8 object-contain mx-auto"
/> 
                </span>

                <span
                  className={`mt-2 font-semibold text-sm transition-colors duration-300 ${
                    selectedMode === modeKey
                      ? "text-white"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                >
                  {mode.name}
                </span>

              </div>

              {selectedMode === modeKey && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-full shadow-[0_0_10px_red]" />
              )}

            </button>
          );
        })}

      </div>

    </div>
  );
}
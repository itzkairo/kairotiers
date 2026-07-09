"use client";

const modes = [
  { name: "Overall", icon: "/icons/overall.svg" },
  { name: "Sword", icon: "/icons/sword.svg" },
  { name: "Axe", icon: "/icons/axe.svg" },
  { name: "Mace", icon: "/icons/mace.svg" },
  { name: "diapot", icon: "/icons/diapot.svg" },
  { name: "NethPot", icon: "/icons/nethpot.svg" },
  { name: "SMP", icon: "/icons/smp.svg" },
  { name: "Crystal", icon: "/icons/crystal.svg" },
  { name: "UHC", icon: "/icons/uhc.svg" },
];

export default function GamemodeBar({
  selectedMode,
  setSelectedMode,
}) {
  const currentIndex = modes.findIndex(
    (m) => m.name.toLowerCase() === selectedMode
  );

  const prevMode = () => {
    if (currentIndex > 0) {
      setSelectedMode(modes[currentIndex - 1].name.toLowerCase());
    }
  };

  const nextMode = () => {
    if (currentIndex < modes.length - 1) {
      setSelectedMode(modes[currentIndex + 1].name.toLowerCase());
    }
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block mt-8 pt-2 overflow-x-auto overflow-y-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

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
                    : "border-[#2a2a2a] bg-[#141414] hover:border-red-600 hover:bg-[#1b1b1b]"
                }`}
              >
                <div className="flex flex-col items-center justify-center h-full">

                  <img
                    src={mode.icon}
                    alt={mode.name}
                    className="w-8 h-8 object-contain"
                  />

                  <span className="mt-2 font-semibold text-sm">
                    {mode.name}
                  </span>

                </div>

                {selectedMode === modeKey && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}

        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden mt-8 flex items-center justify-center gap-4">

        <button
          onClick={prevMode}
          disabled={currentIndex === 0}
          className="text-3xl disabled:opacity-30"
        >
          ◀
        </button>

        <button
          className="w-28 h-24 rounded-2xl border border-red-600 bg-[#1A1A1A] shadow-[0_0_25px_rgba(255,0,0,.35)]"
        >
          <div className="flex flex-col items-center justify-center h-full">

            <img
              src={modes[currentIndex].icon}
              alt={modes[currentIndex].name}
              className="w-8 h-8 object-contain"
            />

            <span className="mt-2 font-semibold text-sm text-white">
              {modes[currentIndex].name}
            </span>

          </div>

          <div className="h-1 bg-red-600 rounded-full mt-1" />
        </button>

        <button
          onClick={nextMode}
          disabled={currentIndex === modes.length - 1}
          className="text-3xl disabled:opacity-30"
        >
          ▶
        </button>

      </div>
    </>
  );
}
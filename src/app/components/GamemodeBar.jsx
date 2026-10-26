"use client";

const modes = [
  { name: "Overall", icon: "/icons/overall.svg" },
  { name: "Sword", icon: "/icons/sword.svg" },
  { name: "Axe", icon: "/icons/axe.svg" },
  { name: "Mace", icon: "/icons/mace.svg" },
  { name: "DiaPot", icon: "/icons/diapot.svg" },
  { name: "NethPot", icon: "/icons/nethpot.svg" },
  { name: "SMP", icon: "/icons/smp.svg" },
  { name: "Crystal", icon: "/icons/crystal.svg" },
  { name: "UHC", icon: "/icons/uhc.svg" },
];

export default function GamemodeBar({ selectedMode, setSelectedMode }) {
  return (
    <div className="no-scrollbar overflow-x-auto rounded-[12px] border border-line bg-surface p-1.5">
      <div className="flex min-w-max gap-1 md:grid md:min-w-0 md:grid-cols-9">
        {modes.map((mode) => {
          const modeKey = mode.name.toLowerCase();
          const active = selectedMode === modeKey;

          return (
            <button
              key={mode.name}
              type="button"
              onClick={() => setSelectedMode(modeKey)}
              aria-pressed={active}
              className={`
                flex
                min-w-[76px]
                flex-col
                items-center
                justify-center
                gap-1.5
                rounded-[9px]
                px-2
                py-2.5
                text-[12px]
                font-semibold
                transition-colors
                duration-200
                md:min-w-0
                ${
                  active
                    ? "bg-[#DC2626] text-white"
                    : "text-[#9A9AA3] hover:bg-[#101010] hover:text-white"
                }
              `}
            >
              <img
                src={mode.icon}
                alt=""
                className={`h-[18px] w-[18px] object-contain ${
                  active ? "opacity-100" : "opacity-65"
                }`}
              />

              <span className="leading-none">{mode.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

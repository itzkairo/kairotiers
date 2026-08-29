"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ search = "", setSearch }) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Ranking",
      href: "/ranking",
      icon: "fa-solid fa-list",
    },
    {
      name: "Hall Of Fame",
      href: "/hall-of-fame",
      icon: "fa-solid fa-crown",
    },
  ];

  return (
    <header className="w-full px-3 sm:px-6 pt-4">
      <div
        className="
          w-full
          max-w-[1430px]
          mx-auto
          rounded-2xl
          border
          border-[#252525]
          bg-[#0b0b0b]
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          overflow-hidden
        "
      >
        {/* ================= TOP ROW ================= */}

        <div
          className="
            min-h-[78px]
            px-5
            sm:px-7
            lg:px-8
            flex
            items-center
            gap-6
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            className="
              shrink-0
              text-2xl
              sm:text-3xl
              font-black
              tracking-[-0.04em]
              hover:opacity-90
              transition
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>

          {/* NAVIGATION */}

          <nav className="hidden md:flex items-center gap-2 ml-8">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex
                    items-center
                    gap-2.5
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    lg:text-base
                    font-bold
                    transition-all
                    duration-200
                    ${
                      active
                        ? "text-white bg-[#171010]"
                        : "text-gray-400 hover:text-white hover:bg-[#121212]"
                    }
                  `}
                >
                  <i
                    className={`
                      ${item.icon}
                      text-[15px]
                      ${
                        active
                          ? "text-red-500"
                          : "text-gray-500"
                      }
                    `}
                  />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}

          <div className="hidden md:flex items-center gap-2 ml-auto">
            {/* SERVER */}

            <a
              href="https://play.rearmc.club"
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-12
                px-5
                rounded-xl
                border
                border-[#292929]
                bg-[#111111]
                flex
                items-center
                gap-2.5
                text-gray-200
                font-bold
                text-sm
                hover:border-[#3b3b3b]
                hover:bg-[#151515]
                transition
              "
            >
              <span
                className="
                  w-2.5
                  h-2.5
                  rounded-full
                  bg-green-500
                  shadow-[0_0_10px_rgba(34,197,94,0.8)]
                "
              />

              play.rearmc.club
            </a>

            {/* DISCORD */}

            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-12
                px-6
                rounded-xl
                bg-red-600
                hover:bg-red-700
                border
                border-red-500
                flex
                items-center
                justify-center
                text-white
                font-black
                text-sm
                transition-all
                shadow-[0_0_20px_rgba(220,38,38,0.15)]
              "
            >
              Discord
            </a>
          </div>

          {/* MOBILE NAV */}

          <div className="md:hidden ml-auto flex items-center gap-2">
            <Link
              href="/"
              className="w-10 h-10 rounded-lg bg-[#151515] border border-[#292929] flex items-center justify-center"
            >
              <i className="fa-solid fa-house text-red-500" />
            </Link>

            <Link
              href="/ranking"
              className="w-10 h-10 rounded-lg bg-[#151515] border border-[#292929] flex items-center justify-center"
            >
              <i className="fa-solid fa-list text-red-500" />
            </Link>

            <Link
              href="/hall-of-fame"
              className="w-10 h-10 rounded-lg bg-[#151515] border border-[#292929] flex items-center justify-center"
            >
              <i className="fa-solid fa-crown text-red-500" />
            </Link>
          </div>
        </div>

        {/* ================= SEARCH ROW ================= */}

        <div className="px-5 sm:px-6 pb-5">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                if (setSearch) {
                  setSearch(e.target.value);
                }
              }}
              placeholder="Search player"
              className="
                w-full
                h-[52px]
                rounded-xl
                border
                border-[#252525]
                bg-[#101010]
                px-5
                pr-14
                text-white
                text-sm
                outline-none
                placeholder:text-gray-600
                focus:border-red-800
                focus:bg-[#111111]
                transition
              "
            />

            <div
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
              "
            >
              <i className="fa-solid fa-magnifying-glass" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
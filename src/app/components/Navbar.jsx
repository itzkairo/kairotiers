"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar({ search = "", setSearch = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="w-full px-3 sm:px-5 pt-4 sm:pt-5">
      <nav
        className="
          relative
          w-full
          max-w-[1430px]
          mx-auto
          rounded-2xl
          border
          border-[#291719]
          bg-[#0b0b0c]
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          overflow-hidden
        "
      >
        {/* TOP NAVIGATION */}
        <div
          className="
            min-h-[76px]
            px-5
            sm:px-7
            flex
            items-center
            gap-6
            sm:gap-10
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="
              shrink-0
              text-2xl
              sm:text-[30px]
              font-black
              tracking-[-0.04em]
              leading-none
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 lg:gap-9">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  text-[#9b9ca3]
                  hover:text-white
                  font-bold
                  text-[15px]
                  transition-colors
                "
              >
                <i
                  className={`
                    ${item.icon}
                    text-[14px]
                    text-[#85868d]
                    group-hover:text-red-500
                    transition-colors
                  `}
                />

                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="ml-auto hidden md:flex items-center gap-2.5">
            {/* SERVER STATUS */}
            <div
              className="
                flex
                items-center
                gap-2.5
                px-4
                py-3
                rounded-xl
                border
                border-[#302021]
                bg-[#111112]
                text-[#dedee1]
                font-bold
                text-sm
                whitespace-nowrap
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
            </div>

            {/* DISCORD */}
            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-red-600
                hover:bg-red-700
                border
                border-red-500
                text-white
                font-black
                text-sm
                transition-all
                shadow-[0_0_20px_rgba(220,38,38,0.15)]
                hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]
              "
            >
              <i className="fa-brands fa-discord text-[15px]" />
              Discord
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="
              md:hidden
              ml-auto
              w-10
              h-10
              rounded-xl
              border
              border-[#302021]
              bg-[#111112]
              text-gray-300
              hover:text-white
              hover:border-red-700
              transition
            "
            aria-label="Toggle menu"
          >
            <i
              className={
                menuOpen
                  ? "fa-solid fa-xmark"
                  : "fa-solid fa-bars"
              }
            />
          </button>
        </div>

        {/* SEARCH ROW */}
        <div
          className="
            border-t
            border-[#211415]
            px-4
            sm:px-5
            py-3
            bg-[#0d0d0e]
          "
        >
          <div className="flex justify-end">
            <div
              className="
                relative
                w-full
                md:w-[320px]
                lg:w-[360px]
              "
            >
              <i
                className="
                  fa-solid
                  fa-magnifying-glass
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#555963]
                  text-sm
                  pointer-events-none
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search player"
                className="
                  w-full
                  h-[44px]
                  pl-11
                  pr-4
                  rounded-xl
                  bg-[#111112]
                  border
                  border-[#29292c]
                  text-white
                  placeholder:text-[#555963]
                  outline-none
                  focus:border-red-700
                  transition
                  text-sm
                "
              />
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            className="
              md:hidden
              border-t
              border-[#211415]
              bg-[#0d0d0e]
              px-4
              py-4
              space-y-2
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-gray-400
                  hover:text-white
                  hover:bg-[#151112]
                  hover:border-red-900
                  border
                  border-transparent
                  font-bold
                  transition
                "
              >
                <i
                  className={`${item.icon} w-5 text-center text-red-500`}
                />

                {item.name}
              </Link>
            ))}

            <div className="pt-2 flex gap-2">
              <div
                className="
                  flex-1
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-3
                  py-3
                  rounded-xl
                  border
                  border-[#302021]
                  bg-[#111112]
                  text-gray-300
                  text-xs
                  font-bold
                "
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                play.rearmc.club
              </div>

              <a
                href="https://discord.gg/EX7ZAaUyVt"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  font-bold
                  text-sm
                "
              >
                <i className="fa-brands fa-discord" />
                Discord
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
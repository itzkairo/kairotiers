"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      href: "/",
      icon: "/icons/home.svg",
      label: "Home",
    },
    {
      href: "/ranking",
      icon: "/icons/ranking.svg",
      label: "Ranking",
    },
    {
      href: "/hall-of-fame",
      icon: "/icons/fame.svg",
      label: "Hall Of Fame",
    },
  ];

  return (
    <nav className="w-full pt-4 md:pt-6 px-3 sm:px-6 relative z-50">
      <div
        className="
          w-full
          max-w-[1480px]
          mx-auto
          h-[62px]
          md:h-[66px]
          rounded-2xl
          border
          border-[#3a3d43]
          bg-[#080b10]/95
          backdrop-blur-xl
          shadow-[0_10px_35px_rgba(0,0,0,0.35)]
        "
      >

        {/* ================= DESKTOP ================= */}

        <div className="hidden md:flex h-full items-center px-5 lg:px-7 relative">

          {/* LOGO */}

          <Link
            href="/"
            className="
              text-3xl
              lg:text-4xl
              font-black
              tracking-tight
              shrink-0
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>


          {/* ================= CENTER NAV ================= */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              flex
              items-center
              gap-2
              lg:gap-3
            "
          >

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  group
                  flex
                  items-center
                  justify-center
                  gap-3
                  h-12
                  lg:h-13
                  px-6
                  lg:px-7
                  rounded-xl
                  bg-transparent
                  border
                  border-transparent
                  text-gray-300
                  font-semibold
                  text-base
                  lg:text-lg
                  whitespace-nowrap
                  hover:bg-[#15191f]/80
                  hover:text-white
                  hover:border-transparent
                  transition-all
                  duration-200
                "
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  className="
                    w-5
                    h-5
                    lg:w-[21px]
                    lg:h-[21px]
                    object-contain
                    opacity-80
                    group-hover:opacity-100
                    group-hover:scale-110
                    transition-all
                    duration-200
                  "
                />

                <span>
                  {item.label}
                </span>
              </Link>
            ))}


            {/* DISCORD */}

            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                flex
                items-center
                justify-center
                gap-3
                h-12
                lg:h-13
                px-6
                lg:px-7
                rounded-xl
                bg-transparent
                border
                border-transparent
                text-gray-300
                font-semibold
                text-base
                lg:text-lg
                whitespace-nowrap
                hover:bg-[#15191f]/80
                hover:text-white
                hover:border-transparent
                transition-all
                duration-200
              "
            >
              <img
                src="/icons/discord.svg"
                alt="Discord"
                className="
                  w-5
                  h-5
                  lg:w-[21px]
                  lg:h-[21px]
                  object-contain
                  opacity-80
                  group-hover:opacity-100
                  group-hover:scale-110
                  transition-all
                  duration-200
                "
              />

              <span>Discord</span>
            </a>

          </div>


          {/* ================= SEARCH RIGHT ================= */}

          <div className="ml-auto w-[220px] lg:w-[250px]">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

        </div>


        {/* ================= MOBILE ================= */}

        <div className="md:hidden h-full flex items-center justify-between px-4">

          <Link
            href="/"
            className="text-2xl font-black tracking-tight"
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>


          {/* HAMBURGER */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              w-10
              h-10
              rounded-xl
              bg-transparent
              border
              border-transparent
              flex
              flex-col
              items-center
              justify-center
              gap-1.5
              hover:bg-[#15191f]/80
              transition-all
            "
            aria-label="Open navigation"
          >

            <span
              className={`
                block
                w-5
                h-[2px]
                bg-gray-300
                rounded-full
                transition-all
                duration-200
                ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}
              `}
            />

            <span
              className={`
                block
                w-5
                h-[2px]
                bg-gray-300
                rounded-full
                transition-all
                duration-200
                ${menuOpen ? "opacity-0" : ""}
              `}
            />

            <span
              className={`
                block
                w-5
                h-[2px]
                bg-gray-300
                rounded-full
                transition-all
                duration-200
                ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}
              `}
            />

          </button>

        </div>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <div
          className="
            md:hidden
            w-full
            max-w-[1480px]
            mx-auto
            mt-2
            p-2
            rounded-2xl
            border
            border-[#353941]
            bg-[#080b10]/98
            backdrop-blur-xl
            shadow-[0_15px_40px_rgba(0,0,0,0.45)]
          "
        >

          {/* HOME */}

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="
              flex
              items-center
              gap-4
              px-5
              py-4
              rounded-xl
              bg-transparent
              border
              border-transparent
              hover:bg-[#15191f]/80
              transition-all
            "
          >
            <img
              src="/icons/home.svg"
              alt="Home"
              className="w-6 h-6 object-contain"
            />

            <span className="text-gray-200 font-semibold text-base">
              Home
            </span>
          </Link>


          {/* RANKING */}

          <Link
            href="/ranking"
            onClick={() => setMenuOpen(false)}
            className="
              flex
              items-center
              gap-4
              px-5
              py-4
              mt-1
              rounded-xl
              bg-transparent
              border
              border-transparent
              hover:bg-[#15191f]/80
              transition-all
            "
          >
            <img
              src="/icons/ranking.svg"
              alt="Ranking"
              className="w-6 h-6 object-contain"
            />

            <span className="text-gray-200 font-semibold text-base">
              Ranking
            </span>
          </Link>


          {/* HALL OF FAME */}

          <Link
            href="/hall-of-fame"
            onClick={() => setMenuOpen(false)}
            className="
              flex
              items-center
              gap-4
              px-5
              py-4
              mt-1
              rounded-xl
              bg-transparent
              border
              border-transparent
              hover:bg-[#15191f]/80
              transition-all
            "
          >
            <img
              src="/icons/fame.svg"
              alt="Hall Of Fame"
              className="w-6 h-6 object-contain"
            />

            <span className="text-gray-200 font-semibold text-base">
              Hall Of Fame
            </span>
          </Link>


          {/* DISCORD */}

          <a
            href="https://discord.gg/EX7ZAaUyVt"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="
              flex
              items-center
              gap-4
              px-5
              py-4
              mt-1
              rounded-xl
              bg-transparent
              border
              border-transparent
              hover:bg-[#15191f]/80
              transition-all
            "
          >
            <img
              src="/icons/discord.svg"
              alt="Discord"
              className="w-6 h-6 object-contain"
            />

            <span className="text-gray-200 font-semibold text-base">
              Discord
            </span>
          </a>


          {/* SEARCH */}

          <div className="mt-2">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

        </div>
      )}

    </nav>
  );
}
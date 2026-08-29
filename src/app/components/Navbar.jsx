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
    <nav className="w-full pt-4 md:pt-5 px-3 sm:px-5 relative z-50">
      {/* ================= NAVBAR ================= */}
      <div
        className="
          w-full
          max-w-[1480px]
          mx-auto
          min-h-[110px]
          md:min-h-[120px]
          rounded-2xl
          border
          border-[#292c31]
          bg-[#080b10]/95
          backdrop-blur-xl
          shadow-[0_10px_35px_rgba(0,0,0,0.35)]
        "
      >
        {/* ================= DESKTOP ================= */}
        <div
          className="
            hidden
            md:flex
            min-h-[120px]
            items-center
            px-6
            lg:px-10
            gap-6
          "
        >
          {/* ================= LOGO ================= */}

          <Link
            href="/"
            className="
              shrink-0
              text-3xl
              lg:text-4xl
              font-black
              tracking-tight
              leading-none
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>

          {/* ================= CENTER NAV ================= */}

          <div
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              lg:gap-4
              ml-4
              lg:ml-10
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
                  h-14
                  lg:h-16
                  px-6
                  lg:px-8
                  rounded-xl
                  text-gray-300
                  font-bold
                  text-base
                  lg:text-lg
                  whitespace-nowrap
                  hover:bg-[#15191f]
                  hover:text-white
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
                    lg:w-6
                    lg:h-6
                    object-contain
                    opacity-80
                    group-hover:opacity-100
                    group-hover:scale-110
                    transition-all
                    duration-200
                  "
                />

                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div
            className="
              shrink-0
              flex
              items-center
              gap-3
              lg:gap-4
            "
          >
            {/* ================= DISCORD ================= */}

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
                h-[68px]
                px-6
                lg:px-8
                rounded-xl
                bg-[#ed0010]
                border
                border-red-500/40
                text-white
                font-bold
                text-base
                lg:text-lg
                whitespace-nowrap
                shadow-[0_0_25px_rgba(237,0,16,0.12)]
                hover:bg-[#ff0818]
                hover:shadow-[0_0_30px_rgba(237,0,16,0.22)]
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
                  lg:w-6
                  lg:h-6
                  object-contain
                  group-hover:scale-110
                  transition-transform
                  duration-200
                "
              />

              <span>Discord</span>
            </a>

            {/* ================= IP + SEARCH ================= */}

            <div
              className="
                flex
                flex-col
                gap-2
                w-[230px]
                lg:w-[275px]
              "
            >
              {/* SERVER IP */}

              <div
                className="
                  h-[42px]
                  w-full
                  rounded-xl
                  border
                  border-[#292c31]
                  bg-[#0d1014]
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-gray-300
                  font-semibold
                  text-sm
                  lg:text-base
                  select-all
                "
              >
                <span
                  className="
                    w-3
                    h-3
                    rounded-full
                    bg-green-500
                    shadow-[0_0_10px_rgba(34,197,94,0.7)]
                  "
                />

                <span>play.rearmc.club</span>
              </div>

              {/* SEARCH */}

              <div className="w-full h-[42px]">
                <SearchBar
                  search={search}
                  setSearch={setSearch}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE ================= */}

        <div
          className="
            md:hidden
            min-h-[110px]
            flex
            items-center
            justify-between
            px-4
          "
        >
          {/* MOBILE LOGO */}

          <Link
            href="/"
            className="
              text-2xl
              sm:text-3xl
              font-black
              tracking-tight
              leading-none
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>

          {/* HAMBURGER */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              w-11
              h-11
              rounded-xl
              flex
              flex-col
              items-center
              justify-center
              gap-1.5
              hover:bg-[#15191f]
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
                ${
                  menuOpen
                    ? "rotate-45 translate-y-[5px]"
                    : ""
                }
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
                ${
                  menuOpen
                    ? "-rotate-45 -translate-y-[5px]"
                    : ""
                }
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
            border-[#292c31]
            bg-[#080b10]/98
            backdrop-blur-xl
            shadow-[0_15px_40px_rgba(0,0,0,0.45)]
          "
        >
          {/* NAV ITEMS */}

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-xl
                text-gray-200
                font-semibold
                hover:bg-[#15191f]
                transition-all
              "
            >
              <img
                src={item.icon}
                alt={item.label}
                className="
                  w-6
                  h-6
                  object-contain
                "
              />

              <span>{item.label}</span>
            </Link>
          ))}

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
              text-gray-200
              font-semibold
              hover:bg-[#15191f]
              transition-all
            "
          >
            <img
              src="/icons/discord.svg"
              alt="Discord"
              className="
                w-6
                h-6
                object-contain
              "
            />

            <span>Discord</span>
          </a>

          {/* SERVER IP */}

          <div
            className="
              mt-2
              h-11
              rounded-xl
              border
              border-[#292c31]
              bg-[#0d1014]
              flex
              items-center
              justify-center
              gap-3
              text-gray-300
              font-semibold
              text-sm
            "
          >
            <span
              className="
                w-3
                h-3
                rounded-full
                bg-green-500
                shadow-[0_0_10px_rgba(34,197,94,0.7)]
              "
            />

            <span>play.rearmc.club</span>
          </div>

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
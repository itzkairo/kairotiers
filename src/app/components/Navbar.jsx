"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar({ search = "", setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const serverIP = "play.rearmc.club";

  const copyIP = async () => {
    try {
      await navigator.clipboard.writeText(serverIP);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to copy IP:", error);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="w-full px-3 sm:px-5 pt-4">
      <nav
        className="
          relative
          w-full
          max-w-[1250px]
          mx-auto
          rounded-2xl
          border
          border-[#241719]
          bg-[#0d0d0e]/95
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        "
      >
        <div
          className="
            h-[68px]
            px-4
            sm:px-5
            md:px-6
            flex
            items-center
            gap-4
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0 flex items-center"
          >
            <span className="text-xl sm:text-2xl font-black tracking-tight">
              <span className="text-red-600">Kairo</span>
              <span className="text-white">Tiers</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}

          <div className="hidden md:flex items-center ml-6 gap-1">
            <NavLink href="/" label="Home" />

            <NavLink href="/ranking" label="Ranking" />

            <NavLink
              href="/hall-of-fame"
              label="Hall Of Fame"
            />
          </div>

          {/* RIGHT SIDE */}

          <div className="hidden md:flex items-center gap-2 ml-auto">

            {/* IP */}

            <button
              onClick={copyIP}
              title="Copy Server IP"
              className="
                group
                flex
                items-center
                gap-2
                px-3.5
                py-2.5
                rounded-xl
                bg-[#151112]
                border
                border-[#342022]
                hover:border-red-700
                hover:bg-[#1a0d0f]
                transition-all
                duration-200
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-green-500
                  shadow-[0_0_9px_rgba(34,197,94,0.8)]
                  shrink-0
                "
              />

              <span className="text-sm font-bold text-gray-300 group-hover:text-white transition">
                {copied ? "Copied!" : serverIP}
              </span>
            </button>

            {/* DISCORD */}

            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-4
                py-2.5
                rounded-xl
                bg-red-600
                hover:bg-red-700
                border
                border-red-500
                text-white
                text-sm
                font-bold
                transition-all
                duration-200
                shadow-[0_0_20px_rgba(220,38,38,0.12)]
              "
            >
              Discord
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="
              md:hidden
              ml-auto
              w-10
              h-10
              rounded-xl
              border
              border-[#302020]
              bg-[#151112]
              flex
              flex-col
              items-center
              justify-center
              gap-1.5
              hover:border-red-700
              transition
            "
          >
            <span
              className={`
                block
                w-5
                h-[2px]
                bg-white
                transition-all
                duration-200
                ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}
              `}
            />

            <span
              className={`
                block
                w-5
                h-[2px]
                bg-white
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
                bg-white
                transition-all
                duration-200
                ${menuOpen ? "-rotate-45 -translate-y-[4px]" : ""}
              `}
            />
          </button>
        </div>

        {/* SEARCH BAR */}

        {setSearch && (
          <div className="hidden md:block px-5 pb-4">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search player..."
                className="
                  w-full
                  h-11
                  rounded-xl
                  bg-[#111111]
                  border
                  border-[#292020]
                  px-4
                  pr-10
                  text-sm
                  text-white
                  placeholder:text-gray-600
                  outline-none
                  focus:border-red-700
                  transition
                "
              />

              <svg
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  w-4
                  h-4
                  text-gray-600
                  pointer-events-none
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
          </div>
        )}

        {/* MOBILE MENU */}

        {menuOpen && (
          <div
            className="
              md:hidden
              border-t
              border-[#241719]
              px-4
              py-4
              space-y-2
            "
          >
            <MobileNavLink
              href="/"
              label="Home"
              onClick={closeMenu}
            />

            <MobileNavLink
              href="/ranking"
              label="Ranking"
              onClick={closeMenu}
            />

            <MobileNavLink
              href="/hall-of-fame"
              label="Hall Of Fame"
              onClick={closeMenu}
            />

            {/* MOBILE IP */}

            <button
              onClick={copyIP}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-3
                rounded-xl
                bg-[#151112]
                border
                border-[#342022]
                hover:border-red-700
                transition
              "
            >
              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-green-500
                  shadow-[0_0_9px_rgba(34,197,94,0.8)]
                "
              />

              <span className="text-sm font-bold text-gray-300">
                {copied ? "Copied!" : serverIP}
              </span>
            </button>

            {/* MOBILE DISCORD */}

            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="
                block
                w-full
                text-center
                px-4
                py-3
                rounded-xl
                bg-red-600
                hover:bg-red-700
                text-white
                font-bold
                transition
              "
            >
              Discord
            </a>

            {/* MOBILE SEARCH */}

            {setSearch && (
              <div className="relative pt-2">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search player..."
                  className="
                    w-full
                    h-11
                    rounded-xl
                    bg-[#111111]
                    border
                    border-[#292020]
                    px-4
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-red-700
                  "
                />
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

/* ================= DESKTOP NAV LINK ================= */

function NavLink({ href, label }) {
  return (
    <Link
      href={href}
      className="
        px-3.5
        py-2.5
        rounded-xl
        text-sm
        font-bold
        text-gray-400
        hover:text-white
        hover:bg-[#171112]
        transition-all
        duration-200
      "
    >
      {label}
    </Link>
  );
}

/* ================= MOBILE NAV LINK ================= */

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        block
        w-full
        px-4
        py-3
        rounded-xl
        text-gray-300
        font-bold
        bg-[#111111]
        border
        border-[#241719]
        hover:border-red-700
        hover:text-white
        transition
      "
    >
      {label}
    </Link>
  );
}
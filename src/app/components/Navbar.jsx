"use client";

import Link from "next/link";

export default function Navbar({ search = "", setSearch = () => {} }) {
  return (
    <header className="w-full px-4 sm:px-6 pt-4">
      <nav
        className="
          w-full
          max-w-[1430px]
          mx-auto
          rounded-2xl
          border
          border-[#292929]
          bg-[#0d0d0e]
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          overflow-hidden
        "
      >
        {/* ================= TOP ROW ================= */}
        <div
          className="
            min-h-[86px]
            px-5
            sm:px-7
            flex
            items-center
            justify-between
            gap-6
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            className="
              shrink-0
              text-3xl
              sm:text-4xl
              font-black
              tracking-[-0.04em]
              hover:opacity-90
              transition
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>

          {/* NAV BUTTONS */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="
                h-[52px]
                px-5
                rounded-xl
                flex
                items-center
                gap-2.5
                text-[16px]
                font-bold
                text-gray-400
                hover:text-white
                hover:bg-[#171717]
                transition-all
              "
            >
              <i className="fa-solid fa-house text-[16px]" />
              <span>Home</span>
            </Link>

            <Link
              href="/ranking"
              className="
                h-[52px]
                px-5
                rounded-xl
                flex
                items-center
                gap-2.5
                text-[16px]
                font-bold
                text-gray-400
                hover:text-white
                hover:bg-[#171717]
                transition-all
              "
            >
              <i className="fa-solid fa-list text-[16px]" />
              <span>Ranking</span>
            </Link>

            <Link
              href="/hall-of-fame"
              className="
                h-[52px]
                px-5
                rounded-xl
                flex
                items-center
                gap-2.5
                text-[16px]
                font-bold
                text-gray-400
                hover:text-white
                hover:bg-[#171717]
                transition-all
              "
            >
              <i className="fa-solid fa-crown text-[16px]" />
              <span>Hall Of Fame</span>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3">

            {/* IP + SEARCH STACK */}
            <div className="flex flex-col items-end gap-2">

              {/* SERVER IP */}
              <div
                className="
                  h-[40px]
                  px-5
                  min-w-[205px]
                  rounded-xl
                  border
                  border-[#332020]
                  bg-[#111111]
                  flex
                  items-center
                  justify-center
                  gap-2.5
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

                <span className="text-[15px] font-bold text-gray-200">
                  play.rearmc.club
                </span>
              </div>

              {/* SEARCH */}
              <div
                className="
                  w-[280px]
                  h-[42px]
                  rounded-xl
                  border
                  border-[#292929]
                  bg-[#111111]
                  flex
                  items-center
                  px-4
                  gap-3
                "
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search player"
                  className="
                    flex-1
                    min-w-0
                    bg-transparent
                    outline-none
                    text-sm
                    text-white
                    placeholder:text-gray-600
                  "
                />

                <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm" />
              </div>
            </div>

            {/* DISCORD */}
            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-[84px]
                px-6
                rounded-xl
                bg-red-600
                hover:bg-red-700
                border
                border-red-500
                flex
                items-center
                justify-center
                gap-2.5
                text-white
                text-[16px]
                font-black
                shadow-[0_0_25px_rgba(220,38,38,0.18)]
                transition-all
              "
            >
              <i className="fa-brands fa-discord text-[19px]" />
              <span>Discord</span>
            </a>
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/"
              className="
                w-11
                h-11
                rounded-xl
                bg-[#151515]
                border
                border-[#292929]
                flex
                items-center
                justify-center
                text-gray-300
                hover:text-white
                hover:border-red-700
                transition
              "
            >
              <i className="fa-solid fa-house" />
            </Link>

            <Link
              href="/ranking"
              className="
                w-11
                h-11
                rounded-xl
                bg-[#151515]
                border
                border-[#292929]
                flex
                items-center
                justify-center
                text-gray-300
                hover:text-white
                hover:border-red-700
                transition
              "
            >
              <i className="fa-solid fa-list" />
            </Link>

            <Link
              href="/hall-of-fame"
              className="
                w-11
                h-11
                rounded-xl
                bg-[#151515]
                border
                border-[#292929]
                flex
                items-center
                justify-center
                text-gray-300
                hover:text-white
                hover:border-red-700
                transition
              "
            >
              <i className="fa-solid fa-crown" />
            </Link>
          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}
        <div className="md:hidden px-4 pb-4">
          <div
            className="
              w-full
              h-12
              rounded-xl
              border
              border-[#292929]
              bg-[#111111]
              flex
              items-center
              px-4
              gap-3
            "
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player"
              className="
                flex-1
                min-w-0
                bg-transparent
                outline-none
                text-sm
                text-white
                placeholder:text-gray-600
              "
            />

            <i className="fa-solid fa-magnifying-glass text-gray-500" />
          </div>
        </div>
      </nav>
    </header>
  );
}
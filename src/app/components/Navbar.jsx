"use client";

import Link from "next/link";

export default function Navbar({ search = "", setSearch = () => {} }) {
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
    <header className="w-full px-2 sm:px-4 pt-4">
      <nav
        className="
          relative
          w-full
          max-w-[1700px]
          mx-auto
          min-h-[108px]
          rounded-2xl
          border
          border-[#292020]
          bg-[#0c0b0c]
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          px-5
          sm:px-7
          lg:px-9
          py-3
        "
      >
        <div className="flex items-center min-h-[80px] gap-5">

          {/* ================= LOGO ================= */}

          <Link
            href="/"
            className="
              shrink-0
              text-3xl
              sm:text-4xl
              lg:text-[42px]
              font-black
              tracking-[-0.05em]
              leading-none
              select-none
            "
          >
            <span className="text-red-600">Kairo</span>
            <span className="text-white">Tiers</span>
          </Link>


          {/* ================= NAV BUTTONS ================= */}

          <div
            className="
              hidden
              md:flex
              items-center
              justify-center
              gap-2
              lg:gap-3
              flex-1
              ml-4
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  group
                  h-[58px]
                  px-5
                  lg:px-7
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  gap-3
                  text-gray-400
                  hover:text-white
                  hover:bg-[#171112]
                  transition-all
                  duration-200
                  font-bold
                  text-base
                  lg:text-lg
                  whitespace-nowrap
                "
              >
                <i
                  className={`
                    ${item.icon}
                    text-[18px]
                    lg:text-[20px]
                    text-gray-500
                    group-hover:text-red-500
                    transition-colors
                  `}
                />

                <span>{item.name}</span>
              </Link>
            ))}
          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              ml-auto
              shrink-0
            "
          >

            {/* DISCORD */}

            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                h-[58px]
                px-5
                lg:px-7
                rounded-xl
                bg-red-600
                hover:bg-red-700
                border
                border-red-500
                flex
                items-center
                justify-center
                gap-3
                text-white
                font-black
                text-base
                lg:text-lg
                transition-all
                duration-200
                shadow-[0_0_25px_rgba(220,38,38,0.18)]
                hover:shadow-[0_0_35px_rgba(220,38,38,0.3)]
                whitespace-nowrap
              "
            >
              <i className="fa-brands fa-discord text-[21px]" />

              <span>Discord</span>
            </a>


            {/* IP + SEARCH */}

            <div className="flex flex-col gap-2">

              {/* SERVER IP */}

              <div
                className="
                  h-[27px]
                  min-w-[220px]
                  lg:min-w-[240px]
                  px-4
                  rounded-lg
                  border
                  border-[#292020]
                  bg-[#111011]
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-sm
                  font-bold
                  text-gray-300
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

                <span>play.rearmc.club</span>
              </div>


              {/* SEARCH */}

              <div
                className="
                  relative
                  h-[35px]
                  min-w-[220px]
                  lg:min-w-[240px]
                "
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search player"
                  className="
                    w-full
                    h-full
                    rounded-lg
                    border
                    border-[#292020]
                    bg-[#111011]
                    px-4
                    pr-11
                    text-sm
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-red-700
                    transition-all
                  "
                />

                <i
                  className="
                    fa-solid
                    fa-magnifying-glass
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    text-sm
                    pointer-events-none
                  "
                />
              </div>

            </div>

          </div>


          {/* ================= MOBILE ================= */}

          <div className="md:hidden ml-auto flex items-center gap-2">

            {/* Mobile Discord */}

            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-11
                h-11
                rounded-xl
                bg-red-600
                border
                border-red-500
                flex
                items-center
                justify-center
                text-white
              "
            >
              <i className="fa-brands fa-discord text-lg" />
            </a>

          </div>

        </div>


        {/* ================= MOBILE SEARCH ================= */}

        <div className="md:hidden mt-2">

          <div className="relative h-11">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player"
              className="
                w-full
                h-full
                rounded-xl
                border
                border-[#292020]
                bg-[#111011]
                px-4
                pr-11
                text-sm
                text-white
                placeholder:text-gray-600
                outline-none
                focus:border-red-700
              "
            />

            <i
              className="
                fa-solid
                fa-magnifying-glass
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
              "
            />

          </div>

        </div>


        {/* ================= MOBILE NAV ================= */}

        <div
          className="
            md:hidden
            mt-3
            flex
            items-center
            justify-center
            gap-1
            overflow-x-auto
            scrollbar-hide
          "
        >

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="
                shrink-0
                h-11
                px-4
                rounded-lg
                flex
                items-center
                gap-2
                text-gray-400
                hover:text-white
                hover:bg-[#171112]
                font-bold
                text-sm
                transition-all
              "
            >
              <i className={`${item.icon} text-red-500`} />
              <span>{item.name}</span>
            </Link>
          ))}

        </div>

      </nav>
    </header>
  );
}
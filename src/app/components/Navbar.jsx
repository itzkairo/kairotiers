"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SearchBar from "./SearchBar";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  CloseIcon,
  LogoMark,
  MenuIcon,
  NavIcon,
} from "./CodeIcons";

const navItems = [
  { href: "/", icon: "home", label: "Home" },
  { href: "/ranking", icon: "ranking", label: "Ranking" },
  { href: "/hall-of-fame", icon: "hall", label: "Hall Of Fame" },
];

export default function Navbar({ search, setSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 w-full border-b border-line-soft bg-[#050505]"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">
          {/* ================= BRAND ================= */}

          <Link
            href="/"
            aria-label="KairoTiers home"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <LogoMark className="h-7 w-7 transition-transform duration-200 group-hover:scale-105" />

            <span className="text-[17px] font-semibold leading-none tracking-[-0.03em] text-white">
              Kairo<span className="text-[#E05252]">Tiers</span>
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}

          <div className="ml-4 hidden h-16 items-stretch md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    flex
                    items-center
                    gap-2
                    border-b-2
                    px-3
                    text-[14px]
                    font-medium
                    transition-colors
                    duration-200
                    lg:px-4
                    ${
                      active
                        ? "border-[#DC2626] text-white"
                        : "border-transparent text-[#9A9AA3] hover:text-white"
                    }
                  `}
                >
                  <NavIcon
                    name={item.icon}
                    className={`h-4 w-4 shrink-0 ${
                      active ? "text-red-500" : "text-[#6F6F78]"
                    }`}
                  />

                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* ================= DESKTOP ACTIONS ================= */}

          <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
            <a
              href="https://discord.gg/EX7ZAaUyVt"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join the KairoTiers Discord"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-[9px]
                border
                border-line
                bg-surface
                text-[#9A9AA3]
                transition-colors
                duration-200
                hover:border-line-red
                hover:bg-surface-hover
                hover:text-white
              "
            >
              <NavIcon name="discord" className="h-[18px] w-[18px]" />
            </a>

            <div className="w-[170px] lg:w-[220px]">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>

          {/* ================= MOBILE TOGGLE ================= */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="
              ml-auto
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-[9px]
              border
              border-line
              bg-surface
              text-[#A1A1AA]
              transition-colors
              duration-200
              hover:border-line-red
              hover:bg-surface-hover
              hover:text-white
              md:hidden
            "
          >
            {menuOpen ? (
              <CloseIcon className="h-[18px] w-[18px]" />
            ) : (
              <MenuIcon className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-line-soft bg-[#070707] md:hidden"
        >
          <div className="mx-auto w-full max-w-[1320px] px-4 py-4 sm:px-6">
            <div className="grid gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`
                      flex
                      items-center
                      gap-3
                      rounded-[9px]
                      px-3
                      py-3
                      text-[15px]
                      font-medium
                      transition-colors
                      duration-200
                      ${
                        active
                          ? "bg-[#151111] text-white"
                          : "text-[#A1A1AA] hover:bg-surface-hover hover:text-white"
                      }
                    `}
                  >
                    <NavIcon
                      name={item.icon}
                      className={`h-[18px] w-[18px] shrink-0 ${
                        active ? "text-red-500" : "text-[#6F6F78]"
                      }`}
                    />

                    <span className="flex-1">{item.label}</span>

                    <ChevronRightIcon className="h-3.5 w-3.5 text-[#4A4A52]" />
                  </Link>
                );
              })}

              <a
                href="https://discord.gg/EX7ZAaUyVt"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-[9px]
                  px-3
                  py-3
                  text-[15px]
                  font-medium
                  text-[#A1A1AA]
                  transition-colors
                  duration-200
                  hover:bg-surface-hover
                  hover:text-white
                "
              >
                <NavIcon
                  name="discord"
                  className="h-[18px] w-[18px] shrink-0 text-[#6F6F78]"
                />

                <span className="flex-1">Discord</span>

                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#4A4A52]" />
              </a>
            </div>

            <div className="mt-4 border-t border-line-soft pt-4">
              <SearchBar search={search} setSearch={setSearch} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

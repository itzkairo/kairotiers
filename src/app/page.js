"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import RankBadge from "./components/RankBadge";
import {
  Reveal,
  RevealItem,
  RevealList,
} from "./components/Reveal";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronRightIcon,
  LogoMark,
} from "./components/CodeIcons";
import { getPlayers } from "../lib/playerService";

const gamemodes = [
  { key: "sword", name: "Sword", icon: "/icons/sword.svg" },
  { key: "axe", name: "Axe", icon: "/icons/axe.svg" },
  { key: "mace", name: "Mace", icon: "/icons/mace.svg" },
  { key: "nethpot", name: "NethPot", icon: "/icons/nethpot.svg" },
  { key: "diapot", name: "DiaPot", icon: "/icons/diapot.svg" },
  { key: "smp", name: "SMP", icon: "/icons/smp.svg" },
  { key: "uhc", name: "UHC", icon: "/icons/uhc.svg" },
  { key: "crystal", name: "Crystal", icon: "/icons/crystal.svg" },
];

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadPlayers() {
      try {
        const playersData = await getPlayers();
        setPlayers(playersData || []);
      } catch (error) {
        console.error("Failed to load players:", error);
      }
    }

    loadPlayers();
  }, []);

  const topPlayers = [...players]
    .filter((player) => player?.overall)
    .sort(
      (a, b) =>
        (b.overall?.points || 0) -
        (a.overall?.points || 0)
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <main>
        {/* HERO */}

        <section className="border-b border-line-soft">
          <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-[820px] flex-col items-center py-14 text-center sm:py-16 lg:py-20">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center rounded-full border border-line bg-surface px-3 py-1.5"
              >
                <span className="text-[12px] font-medium text-[#D4D4D8]">
                  Competitive Minecraft rankings
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="mt-6 whitespace-nowrap text-[clamp(2.7rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.065em]"
              >
                <span className="text-white">KAIRO</span>
                <span className="text-[#DC2626]">TIERS</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#A1A1AA] sm:text-base"
              >
                Compete against the best Minecraft players, climb the
                rankings, and prove your skill across every gamemode.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.16 }}
                className="mt-7 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row"
              >
                <Link
                  href="/ranking"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] bg-[#DC2626] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#B91C1C]"
                >
                  View rankings
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>

                <a
                  href="https://discord.gg/EX7ZAaUyVt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] border border-line bg-surface px-5 text-[14px] font-semibold text-[#D4D4D8] transition-colors duration-200 hover:border-line-red hover:bg-surface-hover hover:text-white"
                >
                  Join Discord
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.22 }}
                className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
              >
                <div className="flex -space-x-2">
                  {(topPlayers.length > 0
                    ? topPlayers
                    : [
                        { ign: "Steve" },
                        { ign: "Alex" },
                        { ign: "Steve" },
                      ]
                  ).map((player, index) => (
                    <img
                      key={`${player.ign}-${index}`}
                      src={`https://mc-heads.net/avatar/${player.ign}/48`}
                      alt=""
                      className="h-8 w-8 rounded-[6px] border-2 border-[#050505] bg-surface object-cover"
                      onError={(event) => {
                        event.currentTarget.src =
                          "https://mc-heads.net/avatar/Steve/48";
                      }}
                    />
                  ))}
                </div>

                <p className="text-[13px] leading-relaxed text-[#8B8B94]">
                  <span className="font-semibold text-white">
                    {players.length}
                  </span>{" "}
                  players ranked across{" "}
                  <span className="font-semibold text-white">
                    {gamemodes.length}
                  </span>{" "}
                  gamemodes
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVER INFORMATION */}

        <section className="border-b border-line-soft">
          <div className="mx-auto w-full max-w-[1320px] px-4 py-8 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
            <Reveal>
              <div className="grid grid-cols-1 divide-y divide-[#1A1A1A] overflow-hidden rounded-[12px] border border-line bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <div className="flex items-center justify-between gap-4 px-5 py-4 sm:block">
                  <p className="text-[12px] font-medium text-[#6F6F78]">
                    Gamemodes
                  </p>
                  <p className="mt-1 text-[18px] font-semibold text-white sm:mt-1.5">
                    {gamemodes.length}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 px-5 py-4 sm:block">
                  <p className="text-[12px] font-medium text-[#6F6F78]">
                    Server status
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-[15px] font-semibold text-white sm:mt-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 px-5 py-4 sm:block">
                  <p className="text-[12px] font-medium text-[#6F6F78]">
                    Server address
                  </p>
                  <p className="code mt-1 truncate text-[14px] font-medium text-white sm:mt-1.5">
                    play.swiftmc.fun
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* TOP PLAYERS — NOW BELOW SERVER INFORMATION */}

        <section className="border-b border-line-soft">
          <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
                  Top players
                </h2>
                <p className="mt-1.5 hidden text-[14px] leading-relaxed text-[#8B8B94] sm:block">
                  The current leaders in the overall standings.
                </p>
              </div>

              <Link
                href="/ranking"
                className="inline-flex shrink-0 items-center gap-1.5 pb-1 text-[13px] font-semibold text-[#A1A1AA] transition-colors duration-200 hover:text-white"
              >
                Full rankings
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {topPlayers.length > 0 ? (
              <RevealList
                className="mt-6 grid gap-3 lg:grid-cols-3"
                stagger={0.07}
              >
                {topPlayers.map((player, index) => (
                  <RevealItem key={player.ign} className="h-full">
                    <Link
                      href="/ranking"
                      className="group flex h-full items-center gap-4 rounded-[12px] border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-red hover:bg-surface-hover lg:p-5"
                    >
                      <RankBadge rank={index + 1} />

                      <img
                        src={`https://mc-heads.net/avatar/${player.ign}/64`}
                        alt={player.ign}
                        className="h-12 w-12 shrink-0 rounded-[9px] border border-line bg-[#0A0A0A] object-cover transition-transform duration-200 group-hover:scale-[1.03] xl:h-14 xl:w-14"
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://mc-heads.net/avatar/Steve/64";
                        }}
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[16px] font-semibold text-white">
                          {player.ign}
                        </h3>
                        <p className="mt-0.5 truncate text-[12px] text-[#6F6F78]">
                          Overall ranking
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[20px] font-semibold leading-none tabular-nums text-white">
                          {player.overall?.points || 0}
                        </p>
                        <p className="mt-1 text-[11px] text-[#6F6F78]">
                          points
                        </p>
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </RevealList>
            ) : (
              <div className="mt-6 rounded-[12px] border border-line bg-surface px-6 py-14 text-center">
                <p className="text-[14px] font-medium text-[#D4D4D8]">
                  Awaiting rankings
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#6F6F78]">
                  Players will appear here once the ladder is updated.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* GAMEMODES */}

        <section className="border-b border-line-soft">
          <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex items-end justify-between gap-5">
              <div>
                <h2 className="text-[26px] font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
                  Gamemodes
                </h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#8B8B94]">
                  Every KairoTiers ladder in one place.
                </p>
              </div>

              <Link
                href="/ranking"
                className="hidden items-center gap-1.5 pb-1 text-[13px] font-semibold text-[#A1A1AA] transition-colors duration-200 hover:text-white sm:inline-flex"
              >
                Full rankings
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <RevealList
              className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
              stagger={0.035}
            >
              {gamemodes.map((mode) => (
                <RevealItem key={mode.key} className="h-full">
                  <Link
                    href={`/ranking?mode=${mode.key}`}
                    className="group flex h-full items-center gap-3 rounded-[11px] border border-line bg-surface p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-line-red hover:bg-surface-hover"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[9px] bg-[#151111] transition-colors duration-200 group-hover:bg-[#1A1212]">
                      <img
                        src={mode.icon}
                        alt=""
                        className="h-[24px] w-[24px] object-contain"
                      />
                    </span>

                    <span className="min-w-0 flex-1 truncate text-[14px] font-semibold text-white">
                      {mode.name}
                    </span>

                    <ChevronRightIcon className="h-4 w-4 shrink-0 text-[#4A4A52] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-500" />
                  </Link>
                </RevealItem>
              ))}
            </RevealList>

            <Link
              href="/ranking"
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-[9px] border border-line bg-surface py-3 text-[13px] font-semibold text-[#A1A1AA] transition-colors duration-200 hover:border-line-red hover:text-white sm:hidden"
            >
              Full rankings
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CALL TO ACTION */}

        <section className="border-b border-line-soft">
          <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Reveal>
              <div className="overflow-hidden rounded-[14px] border border-line bg-surface">
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
                  <div>
                    <h2 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-white sm:text-[34px]">
                      Ready to get{" "}
                      <span className="text-[#DC2626]">ranked?</span>
                    </h2>
                    <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-[#A1A1AA] sm:text-[15px]">
                      Check the rankings, compare your skills, and prove that
                      you belong at the top.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
                    <Link
                      href="/ranking"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] bg-[#DC2626] px-5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#B91C1C]"
                    >
                      View rankings
                      <ChevronRightIcon className="h-4 w-4" />
                    </Link>

                    <a
                      href="https://discord.gg/EX7ZAaUyVt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] border border-line bg-[#0A0A0A] px-5 text-[14px] font-semibold text-[#D4D4D8] transition-colors duration-200 hover:border-line-red hover:bg-surface-hover hover:text-white"
                    >
                      Join Discord
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer>
        <div className="mx-auto w-full max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <Link
                href="/"
                aria-label="KairoTiers home"
                className="inline-flex items-center gap-2.5"
              >
                <LogoMark className="h-6 w-6" />
                <span className="text-[16px] font-semibold tracking-[-0.03em] text-white">
                  Kairo<span className="text-[#E05252]">Tiers</span>
                </span>
              </Link>

              <p className="mt-3.5 text-[13px] leading-relaxed text-[#6F6F78]">
                Competitive Minecraft rankings across every gamemode.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              <div>
                <p className="text-[12px] font-semibold text-white">
                  Explore
                </p>
                <div className="mt-3 flex flex-col gap-2 text-[13px]">
                  <Link
                    href="/ranking"
                    className="text-[#A1A1AA] transition-colors hover:text-white"
                  >
                    Ranking
                  </Link>
                  <Link
                    href="/hall-of-fame"
                    className="text-[#A1A1AA] transition-colors hover:text-white"
                  >
                    Hall Of Fame
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-white">
                  Community
                </p>
                <div className="mt-3 flex flex-col gap-2 text-[13px]">
                  <a
                    href="https://discord.gg/EX7ZAaUyVt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A1A1AA] transition-colors hover:text-white"
                  >
                    Discord
                  </a>
                  <span className="code text-[12px] text-[#8B8B94]">
                    play.swiftmc.fun
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-line-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-[#4A4A52]">
              © {new Date().getFullYear()} KairoTiers
            </p>
            <p className="text-[12px] text-[#4A4A52]">
              Built for competitive Minecraft PvP.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
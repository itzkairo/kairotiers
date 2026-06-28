import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-20 border-b border-red-900/20 backdrop-blur-xl bg-black/40 z-50">

      <div className="w-full h-full flex items-center justify-between px-10">

        <Link href="/" className="text-4xl font-black">

          <span className="text-red-600">
            Kairo
          </span>

          <span className="text-white">
            Tiers
          </span>

        </Link>

        <div className="flex items-center gap-12 text-lg font-semibold">

          <Link href="/" className="hover:text-red-500 duration-300">
            Home
          </Link>

          <Link href="/ranking" className="hover:text-red-500 duration-300">
            Ranking
          </Link>

          <a
            href="https://discord.gg/97DWkXA5b"
            target="_blank"
            className="bg-red-600 px-8 py-3 rounded-xl hover:bg-red-700 duration-300 shadow-[0_0_30px_rgba(255,0,0,.45)]"
          >
            Discord
          </a>

        </div>

      </div>

    </nav>
  );
}
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 md:h-20 border-b border-red-900/20 backdrop-blur-xl bg-black/40 z-50">

      {/* Desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between px-10">

        <Link href="/" className="text-4xl font-black">
          <span className="text-red-600">Kairo</span>
          <span className="text-white">Tiers</span>
        </Link>

        <div className="flex items-center gap-12 text-lg font-semibold">

          <Link href="/" className="hover:text-red-500 duration-300">
            Home
          </Link>

          <Link href="/ranking" className="hover:text-red-500 duration-300">
            Ranking
          </Link>
<Link
  href="/hall-of-fame"
  className="hover:text-red-500 transition duration-300"
>
  Hall Of Fame
</Link>
          <a
            href="https://discord.gg/97DWkXA5b"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 px-8 py-3 rounded-xl hover:bg-red-700 duration-300 shadow-[0_0_30px_rgba(255,0,0,.45)]"
          >
            Discord
          </a>

        </div>
      </div>

{/* Mobile */}
<div className="md:hidden h-full flex items-center justify-center gap-2 px-3">

  <Link
    href="/"
    className="px-3 py-2 rounded-xl bg-[#181818] border border-[#2b2b2b] text-xs font-semibold hover:border-red-600 hover:bg-[#202020] transition-all duration-300"
  >
    Home
  </Link>

  <Link
    href="/ranking"
    className="px-3 py-2 rounded-xl bg-[#181818] border border-[#2b2b2b] text-xs font-semibold hover:border-red-600 hover:bg-[#202020] transition-all duration-300"
  >
    Ranking
  </Link>

  <Link
    href="/hall-of-fame"
    className="px-3 py-2 rounded-xl bg-[#181818] border border-[#2b2b2b] text-xs font-semibold hover:border-red-600 hover:bg-[#202020] transition-all duration-300"
  >
    Hall Of Fame
  </Link>

  <a
    href="https://discord.gg/97DWkXA5b"
    target="_blank"
    rel="noopener noreferrer"
    className="px-3 py-2 rounded-xl bg-red-600 text-xs font-semibold hover:bg-red-700 transition-all duration-300"
  >
    Discord
  </a>

</div>

    </nav>
  );
}
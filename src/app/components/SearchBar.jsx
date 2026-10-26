"use client";

import { SearchIcon } from "./CodeIcons";

export default function SearchBar({ search, setSearch }) {
  return (
    <div className="group relative w-full">
      <SearchIcon
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-[#6F6F78]
          transition-colors
          duration-200
          group-focus-within:text-red-500
        "
      />

      <input
        type="text"
        placeholder="Search players"
        aria-label="Search player"
        className="field h-9 rounded-[9px] pl-9 pr-3 text-[13px]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

const topRankStyles = {
  1: "rounded-[9px] border border-[#4A3B14] bg-[#211A08] text-[#F4CE6A]",
  2: "rounded-[9px] border border-[#3A4046] bg-[#15181B] text-[#D6DBDF]",
  3: "rounded-[9px] border border-[#4A2E1C] bg-[#20140D] text-[#E0A16A]",
};

export default function RankBadge({ rank, compact = false }) {
  if (rank > 3) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center font-semibold tabular-nums text-[#7A7A84] ${
          compact ? "h-9 w-9 text-[14px]" : "h-10 w-10 text-[16px]"
        }`}
      >
        {rank}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={`Rank ${rank}`}
      className={`flex shrink-0 items-center justify-center font-bold tabular-nums ${
        compact ? "h-9 w-9 text-[14px]" : "h-10 w-10 text-[16px]"
      } ${topRankStyles[rank]}`}
    >
      {rank}
    </span>
  );
}

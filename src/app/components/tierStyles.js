/* Shared, visual-only tier palette.
   Ranking values and grouping logic remain untouched. */

export function formatTier(tier) {
  if (!tier) return "—";

  const value = String(tier).trim();

  if (!value || value.toLowerCase() === "unranked") return "—";

  return value;
}

export function getTierText(tier) {
  if (!tier) return "text-[#5F5F68]";

  const value = tier.toUpperCase();

  if (value.includes("HT1") || value.includes("LT1")) return "text-[#E7C15B]";
  if (value.includes("HT2") || value.includes("LT2")) return "text-[#D4D8DA]";
  if (value.includes("HT3") || value.includes("LT3")) return "text-[#D99A63]";
  if (value.includes("HT4") || value.includes("LT4")) return "text-[#E05252]";
  if (value.includes("HT5") || value.includes("LT5")) return "text-[#A1A1AA]";

  return "text-[#A1A1AA]";
}

export const tierColumnStyles = {
  1: { bar: "bg-[#E7C15B]", text: "text-[#E7C15B]" },
  2: { bar: "bg-[#D4D8DA]", text: "text-[#D4D8DA]" },
  3: { bar: "bg-[#D99A63]", text: "text-[#D99A63]" },
  4: { bar: "bg-[#DC2626]", text: "text-[#E05252]" },
  5: { bar: "bg-[#5F5F68]", text: "text-[#A1A1AA]" },
};

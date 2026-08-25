import { supabase } from "./supabase";

const tierPoints = {
  HT1: 20,
  LT1: 15,
  HT2: 12,
  LT2: 10,
  HT3: 8,
  LT3: 6,
  HT4: 4,
  LT4: 3,
  HT5: 2,
  LT5: 1,
  Unranked: 0,
  null: 0,
};

function getPoints(tier) {
  return tierPoints[tier] ?? 0;
}

function getOverallTier(points) {
  if (points >= 120) return "HT1";
  if (points >= 100) return "LT1";
  if (points >= 80) return "HT2";
  if (points >= 65) return "LT2";
  if (points >= 50) return "HT3";
  if (points >= 35) return "LT3";
  if (points >= 25) return "HT4";
  if (points >= 18) return "LT4";
  if (points >= 10) return "HT5";
  if (points >= 1) return "LT5";
  return "Unranked";
}

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((player) => {

    const sword = getPoints(player.sword_tier);
    const axe = getPoints(player.axe_tier);
    const mace = getPoints(player.mace_tier);
    const diapot = getPoints(player.diapot_tier);
    const nethpot = getPoints(player.nethpot_tier);
    const smp = getPoints(player.smp_tier);
    const uhc = getPoints(player.uhc_tier);
    const crystal = getPoints(player.crystal_tier);

    const overall =
      sword +
      axe +
      mace +
      diapot +
      nethpot +
      smp +
      uhc +
      crystal;

    return {
      ign: player.ign,

      overall: {
        points: overall,
      },

      sword: {
        tier: player.sword_tier,
        points: sword,
      },

      axe: {
        tier: player.axe_tier,
        points: axe,
      },

      mace: {
        tier: player.mace_tier,
        points: mace,
      },

      diapot: {
        tier: player.diapot_tier,
        points: diapot,
      },

      nethpot: {
        tier: player.nethpot_tier,
        points: nethpot,
      },

      smp: {
        tier: player.smp_tier,
        points: smp,
      },

      uhc: {
        tier: player.uhc_tier,
        points: uhc,
      },

      crystal: {
        tier: player.crystal_tier,
        points: crystal,
      },
    };
  });
}
import { supabase } from "./supabase";

export async function getPlayers() {
  const { data, error } = await supabase
    .from("players")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data.map((player) => ({
    ign: player.ign,

    overall: {
      tier: player.overall_tier,
      points: player.overall_points,
    },

    sword: {
      tier: player.sword_tier,
      points: player.sword_points,
    },

    axe: {
      tier: player.axe_tier,
      points: player.axe_points,
    },

    mace: {
      tier: player.mace_tier,
      points: player.mace_points,
    },

    pot: {
      tier: player.pot_tier,
      points: player.pot_points,
    },

    nethpot: {
      tier: player.nethpot_tier,
      points: player.nethpot_points,
    },

    smp: {
      tier: player.smp_tier,
      points: player.smp_points,
    },

    uhc: {
      tier: player.uhc_tier,
      points: player.uhc_points,
    },

    vanilla: {
      tier: player.vanilla_tier,
      points: player.vanilla_points,
    },
  }));
}
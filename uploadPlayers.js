const { createClient } = require("@supabase/supabase-js");

// CHANGE THESE
const supabase = createClient(
  "https://doruqqpjrlcxumesujrp.supabase.co",
  "sb_secret_eYrUhq0aAQNsOtNROJM1XA_53HU-nmx"
);

// CHANGE THIS PATH IF NEEDED
const players = require("./src/data/players.json");

async function upload() {
  const rows = players.map((p) => ({
    ign: p.ign,

    overall_tier: p.overall.tier,
    overall_points: p.overall.points,

    sword_tier: p.sword.tier,
    sword_points: p.sword.points,

    axe_tier: p.axe.tier,
    axe_points: p.axe.points,

    mace_tier: p.mace.tier,
    mace_points: p.mace.points,

    pot_tier: p.pot.tier,
    pot_points: p.pot.points,

    nethpot_tier: p.nethpot.tier,
    nethpot_points: p.nethpot.points,

    smp_tier: p.smp.tier,
    smp_points: p.smp.points,

    uhc_tier: p.uhc.tier,
    uhc_points: p.uhc.points,

    vanilla_tier: p.vanilla.tier,
    vanilla_points: p.vanilla.points,
  }));

  const { error } = await supabase
    .from("players")
    .insert(rows);

  if (error) {
    console.error(error);
  } else {
    console.log("SUCCESS! Uploaded", rows.length, "players");
  }
}

upload();
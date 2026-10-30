import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const PAGE_SIZE = 1000;
const MAX_PLAYERS = 200000;

const TIER_COLUMNS = {
  sword: "sword_tier",
  axe: "axe_tier",
  mace: "mace_tier",
  diapot: "diapot_tier",
  nethpot: "nethpot_tier",
  smp: "smp_tier",
  uhc: "uhc_tier",
  crystal: "crystal_tier",
};

const VALID_TIERS = new Set([
  "LT5",
  "HT5",
  "LT4",
  "HT4",
  "LT3",
  "HT3",
  "LT2",
  "HT2",
  "LT1",
  "HT1",
  "HT",
]);

function normalizeTier(value) {
  if (typeof value !== "string") return null;

  const tier = value.trim().toUpperCase();

  return VALID_TIERS.has(tier) ? tier : null;
}

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Mod API: Supabase environment variables missing.");

      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const columns = [
      "id",
      "ign",
      ...Object.values(TIER_COLUMNS),
    ].join(",");

    const allRows = [];

    for (let offset = 0; offset < MAX_PLAYERS; offset += PAGE_SIZE) {
      const url = new URL("/rest/v1/players", supabaseUrl);

      url.searchParams.set("select", columns);
      url.searchParams.set("order", "id.asc");

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Accept: "application/json",
          Range: `${offset}-${offset + PAGE_SIZE - 1}`,
          "Range-Unit": "items",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error("Mod API Supabase error:", response.status, errorText);

        return NextResponse.json(
          { error: "Unable to load player data" },
          { status: 502 }
        );
      }

      const rows = await response.json();

      if (!Array.isArray(rows)) {
        return NextResponse.json(
          { error: "Invalid database response" },
          { status: 502 }
        );
      }

      allRows.push(...rows);

      if (rows.length < PAGE_SIZE) break;
    }

    const mergedPlayers = new Map();

    for (const row of allRows) {
      if (typeof row.ign !== "string") continue;

      const ign = row.ign.trim();

      if (!ign || ign.length > 64) continue;

      const key = ign.toLowerCase();

      if (!mergedPlayers.has(key)) {
        mergedPlayers.set(key, {
          ign,
          gamemodes: {},
        });
      }

      const player = mergedPlayers.get(key);

      for (const [gamemode, column] of Object.entries(TIER_COLUMNS)) {
        const tier = normalizeTier(row[column]);

        // Keep the first valid tier if duplicate IGN records exist.
        if (tier && !player.gamemodes[gamemode]) {
          player.gamemodes[gamemode] = tier;
        }
      }
    }

    const players = Array.from(mergedPlayers.values()).filter(
      (player) => Object.keys(player.gamemodes).length > 0
    );

    return NextResponse.json(
      {
        success: true,
        players,
        count: players.length,
        updatedAt: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Mod API error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
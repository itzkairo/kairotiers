import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    console.log("========== NEW TIER REQUEST ==========");

    const secret = request.headers.get("x-bot-secret");

    if (!secret || secret !== process.env.BOT_SECRET) {
      console.log("❌ SECRET MISMATCH");

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    console.log("BODY:", body);

    const { ign, tier, gamemode } = body;

    if (!ign || !tier || !gamemode) {
      return NextResponse.json(
        { error: "Missing ign, tier or gamemode" },
        { status: 400 }
      );
    }

    // Convert bot gamemode name to actual database column
    const gamemodeMap = {
      sword: "sword",
      axe: "axe",
      mace: "mace",
      diapot: "diapot",
      nethpot: "nethpot",
      smp: "smp",
      crystal: "crystal",
      uhc: "uhc"
    };

    const mode = gamemodeMap[String(gamemode).toLowerCase()];

    if (!mode) {
      return NextResponse.json(
        { error: `Invalid gamemode: ${gamemode}` },
        { status: 400 }
      );
    }

    const tierColumn = `${mode}_tier`;

    console.log("IGN:", ign);
    console.log("GAMEMODE:", mode);
    console.log("TIER COLUMN:", tierColumn);
    console.log("TIER:", tier);

    // Check player
    const { data: player, error: playerError } = await supabase
      .from("players")
      .select("id, ign")
      .eq("ign", ign)
      .maybeSingle();

    if (playerError) {
      console.error("❌ PLAYER FETCH ERROR:", playerError);

      return NextResponse.json(
        { error: playerError.message },
        { status: 500 }
      );
    }

    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }

    // Update correct tier column
    const { data: updatedPlayer, error: updateError } = await supabase
      .from("players")
      .update({
        [tierColumn]: tier
      })
      .eq("ign", ign)
      .select()
      .single();

    if (updateError) {
      console.error("❌ UPDATE ERROR:", updateError);

      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    console.log("✅ PLAYER UPDATED:", updatedPlayer);

    return NextResponse.json({
      success: true,
      ign,
      gamemode: mode,
      tier,
      column: tierColumn
    });

  } catch (error) {
    console.error("❌ FATAL ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
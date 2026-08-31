import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    console.log("========== NEW TIER REQUEST ==========");

    // Check bot secret
    const secret = request.headers.get("x-bot-secret");

    if (!secret || secret !== process.env.BOT_SECRET) {
      console.log("❌ SECRET MISMATCH");

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("✅ SECRET VERIFIED");

    // Read body
    const body = await request.json();

    console.log("BODY:", body);

    const {
      ign,
      tier,
      gamemode,
      userId,
      guildId
    } = body;

    if (!ign || !tier || !gamemode) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          required: ["ign", "tier", "gamemode"]
        },
        { status: 400 }
      );
    }

    /*
     * Normalize gamemode.
     *
     * This prevents:
     * sword_tier
     * nethpot_tier
     * diapot_tier
     *
     * and keeps the database columns consistent.
     */

    const gamemodeMap = {
      sword: "Sword",
      mace: "Mace",
      axe: "Axe",
      crystal: "Crystal",
      nethpot: "NethPot",
      diapot: "DiaPot",
      smp: "SMP",
      uhc: "UHC"
    };

    const normalizedGamemode =
      gamemodeMap[String(gamemode).toLowerCase()];

    if (!normalizedGamemode) {
      return NextResponse.json(
        {
          error: `Invalid gamemode: ${gamemode}`
        },
        { status: 400 }
      );
    }

    console.log("Gamemode:", normalizedGamemode);
    console.log("Tier:", tier);
    console.log("IGN:", ign);

    // Find player
    const { data: existingPlayer, error: fetchError } = await supabase
      .from("players")
      .select("*")
      .eq("ign", ign)
      .maybeSingle();

    if (fetchError) {
      console.error("❌ FETCH ERROR:", fetchError);

      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // Create player if it doesn't exist
    if (!existingPlayer) {
      console.log("Player doesn't exist. Creating...");

      const { error: insertError } = await supabase
        .from("players")
        .insert({
          ign: ign
        });

      if (insertError) {
        console.error("❌ INSERT ERROR:", insertError);

        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }

      console.log("✅ Player created");
    }

    // Correct tier column
    const tierColumn = `${normalizedGamemode}_tier`;

    const updateData = {
      [tierColumn]: tier
    };

    console.log("Updating:", updateData);

    // Update tier
    const { data, error: updateError } = await supabase
      .from("players")
      .update(updateData)
      .eq("ign", ign)
      .select();

    if (updateError) {
      console.error("❌ UPDATE ERROR:", updateError);

      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    console.log("✅ UPDATED:", data);

    return NextResponse.json({
      success: true,
      ign,
      gamemode: normalizedGamemode,
      tier,
      column: tierColumn
    });

  } catch (err) {
    console.error("❌ FATAL ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
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
      console.log("❌ MISSING DATA");

      return NextResponse.json(
        { error: "Missing ign, tier or gamemode" },
        { status: 400 }
      );
    }

    const cleanIgn = String(ign).trim();
    const mode = String(gamemode).toLowerCase();

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

    const mappedMode = gamemodeMap[mode];

    if (!mappedMode) {
      console.log("❌ INVALID GAMEMODE:", mode);

      return NextResponse.json(
        { error: `Invalid gamemode: ${gamemode}` },
        { status: 400 }
      );
    }

    const tierColumn = `${mappedMode}_tier`;

    console.log("IGN:", cleanIgn);
    console.log("GAMEMODE:", mappedMode);
    console.log("TIER COLUMN:", tierColumn);
    console.log("TIER:", tier);

    // ==========================================
    // CHECK IF PLAYER EXISTS
    // ==========================================

    const { data: existingPlayer, error: findError } = await supabase
      .from("players")
      .select("id, ign")
      .ilike("ign", cleanIgn)
      .maybeSingle();

    if (findError) {
      console.error("❌ PLAYER CHECK ERROR:", findError);

      return NextResponse.json(
        { error: findError.message },
        { status: 500 }
      );
    }

    // ==========================================
    // PLAYER DOES NOT EXIST
    // CREATE PLAYER + TIER
    // ==========================================

    if (!existingPlayer) {
      console.log("🆕 PLAYER DOES NOT EXIST");
      console.log("🆕 CREATING:", cleanIgn);

      const { data: newPlayer, error: createError } = await supabase
        .from("players")
        .insert({
          ign: cleanIgn,
          [tierColumn]: tier
        })
        .select()
        .single();

      if (createError) {
        console.error("❌ CREATE PLAYER ERROR:", createError);

        return NextResponse.json(
          {
            error: createError.message,
            details: createError.details,
            hint: createError.hint
          },
          { status: 500 }
        );
      }

      console.log("✅ PLAYER CREATED:", newPlayer);

      return NextResponse.json({
        success: true,
        created: true,
        ign: cleanIgn,
        tier,
        gamemode: mappedMode
      });
    }

    // ==========================================
    // PLAYER EXISTS
    // ONLY UPDATE TIER
    // ==========================================

    console.log("👤 PLAYER EXISTS:", existingPlayer.ign);
    console.log("🔄 UPDATING:", tierColumn, "=", tier);

    const { data: updatedPlayer, error: updateError } = await supabase
      .from("players")
      .update({
        [tierColumn]: tier
      })
      .eq("id", existingPlayer.id)
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
      created: false,
      ign: updatedPlayer.ign,
      tier,
      gamemode: mappedMode
    });

  } catch (error) {
    console.error("❌ FATAL ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
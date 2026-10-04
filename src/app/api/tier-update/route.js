import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    console.log("========== NEW TIER REQUEST ==========");

    // ==========================================
    // AUTH
    // ==========================================

    const secret = request.headers.get("x-bot-secret");

    if (!secret || secret !== process.env.BOT_SECRET) {
      console.log("❌ SECRET MISMATCH");

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // ==========================================
    // BODY
    // ==========================================

    const body = await request.json();

    console.log("BODY:", body);

    const {
      discordId,
      ign,
      tier,
      gamemode
    } = body;

    if (!discordId || !ign || !tier || !gamemode) {
      console.log("❌ MISSING DATA");

      return NextResponse.json(
        {
          error:
            "Missing discordId, ign, tier or gamemode"
        },
        { status: 400 }
      );
    }

    const cleanDiscordId = String(discordId).trim();
    const cleanIgn = String(ign).trim();
    const mode = String(gamemode).toLowerCase();

    // ==========================================
    // GAMEMODE
    // ==========================================

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
        {
          error: `Invalid gamemode: ${gamemode}`
        },
        { status: 400 }
      );
    }

    const tierColumn = `${mappedMode}_tier`;

    console.log("DISCORD ID:", cleanDiscordId);
    console.log("IGN:", cleanIgn);
    console.log("GAMEMODE:", mappedMode);
    console.log("TIER COLUMN:", tierColumn);
    console.log("TIER:", tier);

    // ==========================================
    // FIND EXISTING PLAYER BY DISCORD ID
    // ==========================================

    const {
      data: existingPlayer,
      error: findError
    } = await supabase
      .from("players")
      .select("*")
      .eq("discord_id", cleanDiscordId)
      .maybeSingle();

    if (findError) {
      console.error(
        "❌ PLAYER CHECK ERROR:",
        findError
      );

      return NextResponse.json(
        {
          error: findError.message
        },
        { status: 500 }
      );
    }

    // ==========================================
    // EXISTING PLAYER
    // UPDATE SAME PROFILE
    // ==========================================

    if (existingPlayer) {

      console.log(
        "👤 EXISTING PLAYER FOUND:",
        existingPlayer.id
      );

      console.log(
        "🔄 OLD IGN:",
        existingPlayer.ign
      );

      console.log(
        "🔄 NEW IGN:",
        cleanIgn
      );

      console.log(
        "🔄 UPDATING:",
        tierColumn,
        "=",
        tier
      );

      const {
        data: updatedPlayer,
        error: updateError
      } = await supabase
        .from("players")
        .update({
          ign: cleanIgn,
          [tierColumn]: tier
        })
        .eq("id", existingPlayer.id)
        .select()
        .single();

      if (updateError) {
        console.error(
          "❌ UPDATE ERROR:",
          updateError
        );

        return NextResponse.json(
          {
            error: updateError.message
          },
          { status: 500 }
        );
      }

      console.log(
        "✅ EXISTING PROFILE UPDATED:",
        updatedPlayer
      );

      return NextResponse.json({
        success: true,
        created: false,
        profileId: updatedPlayer.id,
        discordId: cleanDiscordId,
        oldIgn: existingPlayer.ign,
        ign: updatedPlayer.ign,
        tier,
        gamemode: mappedMode
      });
    }

    // ==========================================
    // NO DISCORD ID FOUND
    // FIRST TIME PLAYER
    // ==========================================

    console.log(
      "🆕 NO PROFILE FOUND FOR DISCORD ID"
    );

    // ==========================================
    // CHECK IGN
    // This prevents another duplicate profile
    // if an old profile already exists.
    // ==========================================

    const {
      data: existingIgnPlayer,
      error: ignError
    } = await supabase
      .from("players")
      .select("*")
      .ilike("ign", cleanIgn)
      .maybeSingle();

    if (ignError) {
      console.error(
        "❌ IGN CHECK ERROR:",
        ignError
      );

      return NextResponse.json(
        {
          error: ignError.message
        },
        { status: 500 }
      );
    }

    // ==========================================
    // SAME IGN ALREADY EXISTS
    // LINK DISCORD ID TO THAT PROFILE
    // ==========================================

    if (existingIgnPlayer) {

      console.log(
        "🔗 EXISTING IGN FOUND:",
        existingIgnPlayer.ign
      );

      const {
        data: linkedPlayer,
        error: linkError
      } = await supabase
        .from("players")
        .update({
          discord_id: cleanDiscordId,
          ign: cleanIgn,
          [tierColumn]: tier
        })
        .eq("id", existingIgnPlayer.id)
        .select()
        .single();

      if (linkError) {
        console.error(
          "❌ LINK ERROR:",
          linkError
        );

        return NextResponse.json(
          {
            error: linkError.message
          },
          { status: 500 }
        );
      }

      console.log(
        "✅ EXISTING IGN PROFILE LINKED:",
        linkedPlayer
      );

      return NextResponse.json({
        success: true,
        created: false,
        linked: true,
        profileId: linkedPlayer.id,
        discordId: cleanDiscordId,
        ign: linkedPlayer.ign,
        tier,
        gamemode: mappedMode
      });
    }

    // ==========================================
    // COMPLETELY NEW PLAYER
    // ==========================================

    console.log(
      "🆕 PLAYER DOES NOT EXIST"
    );

    console.log(
      "🆕 CREATING:",
      cleanIgn
    );

    const {
      data: newPlayer,
      error: createError
    } = await supabase
      .from("players")
      .insert({
        discord_id: cleanDiscordId,
        ign: cleanIgn,
        [tierColumn]: tier
      })
      .select()
      .single();

    if (createError) {
      console.error(
        "❌ CREATE PLAYER ERROR:",
        createError
      );

      return NextResponse.json(
        {
          error: createError.message,
          details: createError.details,
          hint: createError.hint
        },
        { status: 500 }
      );
    }

    console.log(
      "✅ PLAYER CREATED:",
      newPlayer
    );

    return NextResponse.json({
      success: true,
      created: true,
      profileId: newPlayer.id,
      discordId: cleanDiscordId,
      ign: cleanIgn,
      tier,
      gamemode: mappedMode
    });

  } catch (error) {

    console.error(
      "❌ FATAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}
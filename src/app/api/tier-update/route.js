import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Verify bot secret
    const secret = request.headers.get("x-bot-secret");

    if (secret !== process.env.BOT_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { ign, tier, gamemode } = await request.json();

    // Check if player already exists
    const { data: existingPlayer, error: fetchError } = await supabase
      .from("players")
      .select("ign")
      .eq("ign", ign)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error(fetchError);
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // Create player automatically if missing
    if (!existingPlayer) {
      const { error: insertError } = await supabase
        .from("players")
        .insert({
          ign: ign,
        });

      if (insertError) {
        console.error(insertError);
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }
    }

    // Update tier
    const updateData = {};
    updateData[`${gamemode}_tier`] = tier;

    const { error: updateError } = await supabase
      .from("players")
      .update(updateData)
      .eq("ign", ign);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      player: ign,
      tier,
      gamemode,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
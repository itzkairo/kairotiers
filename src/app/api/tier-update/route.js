import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    console.log("========== NEW REQUEST ==========");

    const secret = request.headers.get("x-bot-secret");
    console.log("SECRET RECEIVED:", secret);
    console.log("EXPECTED SECRET:", process.env.BOT_SECRET);

    if (secret !== process.env.BOT_SECRET) {
      console.log("SECRET MISMATCH");

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("SECRET VERIFIED");

    const body = await request.json();
    console.log("BODY:", body);

    const { ign, tier, gamemode } = body;

    console.log("IGN:", ign);
    console.log("TIER:", tier);
    console.log("GAMEMODE:", gamemode);

    const { data: existingPlayer, error: fetchError } = await supabase
      .from("players")
      .select("ign")
      .eq("ign", ign)
      .maybeSingle();

    if (fetchError) {
      console.error("FETCH ERROR:", fetchError);

      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    if (!existingPlayer) {
      console.log("Creating player...");

      const { error: insertError } = await supabase
        .from("players")
        .insert({
          ign: ign,
        });

      if (insertError) {
        console.error("INSERT ERROR:", insertError);

        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }

      console.log("Player created.");
    }

    const updateData = {};
    updateData[`${gamemode}_tier`] = tier;

    console.log("UPDATE:", updateData);

    const { data, error: updateError } = await supabase
      .from("players")
      .update(updateData)
      .eq("ign", ign)
      .select();

    if (updateError) {
      console.error("UPDATE ERROR:", updateError);

      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    console.log("UPDATED:", data);

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("FATAL:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    // Secret verify
    const secret = request.headers.get("x-bot-secret");

    if (secret !== process.env.BOT_SECRET) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Receive data
    const { ign, tier, gamemode } = await request.json();

    // Update correct tier column
    const updateData = {};
    updateData[`${gamemode}_tier`] = tier;

    const { error } = await supabase
      .from("players")
      .update(updateData)
      .eq("ign", ign);

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
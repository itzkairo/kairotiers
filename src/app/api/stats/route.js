import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const {
      data,
      error
    } = await supabase
      .from("site_stats")
      .select("player_count, test_count")
      .eq("id", 1)
      .single();

    if (error) {
      console.error(
        "STATS ERROR:",
        error
      );

      return NextResponse.json(
        {
          error: error.message
        },
        {
          status: 500
        }
      );
    }

    return NextResponse.json({
      player_count: data.player_count,
      test_count: data.test_count
    });

  } catch (error) {
    console.error(
      "STATS API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load stats"
      },
      {
        status: 500
      }
    );
  }
}
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request) {
  try {
    const secret = request.headers.get("x-bot-secret");

    if (!secret || secret !== process.env.BOT_SECRET) {
      return NextResponse.json(
        {
          error: "Unauthorized"
        },
        {
          status: 401
        }
      );
    }

    const body = await request.json();

    const action = body?.action;

    if (action !== "join" && action !== "leave") {
      return NextResponse.json(
        {
          error: "Invalid action"
        },
        {
          status: 400
        }
      );
    }

    let error;

    if (action === "join") {
      const result = await supabase.rpc(
        "increment_player_count"
      );

      error = result.error;
    }

    if (action === "leave") {
      const result = await supabase.rpc(
        "decrement_player_count"
      );

      error = result.error;
    }

    if (error) {
      console.error(
        "PLAYER COUNT ERROR:",
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
      success: true,
      action
    });

  } catch (error) {
    console.error(
      "PLAYER COUNT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to update player count"
      },
      {
        status: 500
      }
    );
  }
}
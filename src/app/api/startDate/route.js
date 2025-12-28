import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// yyyy-mm-dd is format for date entry to db

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  let session;
  let season;
  let now = new Date();
  let month = now.getMonth();
  let date = now.getDate();
  if (month >= 3 && month < 8) {
    session = "springStart";
    season = "spring";
  } else if ((month === 11 && date >= 5) || (month >= 0 && month <= 2)) {
    session = "winterStart";
    season = "winter";
  } else {
    session = "fallStart";
    season = "fall";
  }

  try {
    const { data, error } = await supabase
      .from("tkdCCSdb")
      .select(`id,${session}`)
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    if (data) {
      const sessionDate = data[session];
      return NextResponse.json({
        status: "success",
        date: sessionDate,
        theseason: season,
      });
    }
    return NextResponse.json(
      { error: "No data found", message: "Session start date not found" },
      { status: 404 }
    );
  } catch (err) {
    console.error("api fetching error: ", err);
    return NextResponse.json(
      { error: err, message: "Error fetching data" },
      { status: 500 }
    );
  }
}

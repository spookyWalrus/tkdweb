import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// yyyy-mm-dd is format for date entry to db

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  try {
    const { data, error } = await supabase
      .from("tkdCCSdb")
      .select("id,springStart,fallStart,winterStart")
      .eq("id", 1)
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
    return NextResponse.json({
      status: "success",
      data: {
        spring: data.springStart,
        fall: data.fallStart,
        winter: data.winterStart,
      },
    });
  } catch (err) {
    console.error("api fetching error: ", err);
    return NextResponse.json(
      { error: err, message: "Error fetching data" },
      { status: 500 }
    );
  }
}

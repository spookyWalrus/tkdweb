import { NextResponse } from "next/server";

export async function GET() {
  const apikey = process.env.TIMEZONE_API_KEY;
  try {
    const response = await fetch(
      `http://api.timezonedb.com/v2.1/get-time-zone?key=${apikey}&format=json&by=zone&zone=America/Toronto`
    );

    if (!response.ok) {
      throw new Error(`API call failed with: ${response.status}`);
    }
    const result = await response.json();
    return NextResponse.json({
      status: "success",
      data: {
        timezone: result.zoneName,
        date: result.formatted,
        abbreviation: result.abbreviation,
      },
    });
  } catch (err) {
    console.error("api fetching error: ", err);
    return NextResponse.json(
      { error: "failed api:  timezone fetching" },
      { status: 500 }
    );
  }
}

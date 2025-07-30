import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams, pathname } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  try {
    if (token_hash.startsWith("mock_") && type === "mock_email") {
      return NextResponse.redirect(
        new URL("/auth-pages/auth-confirm", request.url)
      );
    }
    if (token_hash && type) {
      const supabase = createRouteHandlerClient({ cookies });
      const { data, error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });
      if (!error) {
        return NextResponse.redirect(
          new URL("/auth-pages/auth-confirm/", request.url)
        );
      }
    } else {
      return NextResponse.redirect(
        new URL("/auth-pages/auth-error/", request.url)
      );
    }
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth-pages/auth-error", request.url)
    );
  }
}

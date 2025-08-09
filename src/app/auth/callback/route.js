import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    } else {
      await supabase.auth.refreshSession();
    }

    return NextResponse.redirect(new URL("/member/account", requestUrl.origin));
  } catch (error) {
    return NextResponse.redirect("/auth-pages/auth-error", requestUrl.origin);
  }
}

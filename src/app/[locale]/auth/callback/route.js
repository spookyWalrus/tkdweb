import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// to confirm sign up
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const locale = requestUrl.pathname.split("/")[1] || "en";

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    } else {
      await supabase.auth.refreshSession();
    }

    return NextResponse.redirect(
      new URL(`/${locale}/auth-pages/auth-confirm`, requestUrl.origin)
    );
  } catch (error) {
    return NextResponse.redirect(
      `/${locale}/auth-pages/auth-error`,
      requestUrl.origin
    );
  }
}

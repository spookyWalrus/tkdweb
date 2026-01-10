import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// to confirm sign up
export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const errorcode = requestUrl.searchParams.get("error_code");
  const errordescription = requestUrl.searchParams.get("error_description");
  const locale = requestUrl.pathname.split("/")[1] || "en";

  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      const errorMapping = {
        otp_expired: "expired",
        flow_state_expired: "expired",
        flow_state_not_found: "expired",
        bad_code_verifier: "invalid",
        session_not_found: "session_lost",
        user_not_found: "user_not_found",
        validation_failed: "invalid",
      };

      let errorType = errorMapping[error.code] || "unknown";

      return NextResponse.redirect(
        new URL(
          `/${locale}/auth-pages/auth-error?error_code=${errorType}`,
          requestUrl.origin
        )
      );
    } else {
      await supabase.auth.refreshSession();
      return NextResponse.redirect(
        new URL(`/${locale}/auth-pages/auth-confirm`, requestUrl.origin)
      );
    }
  } catch (catchErr) {
    return NextResponse.redirect(
      new URL(`/${locale}/auth-pages/auth-error`, requestUrl.origin)
    );
  }
}

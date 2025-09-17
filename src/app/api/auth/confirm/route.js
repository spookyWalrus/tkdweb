import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const { searchParams, pathname } = requestUrl;
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next");
  const supabase = createRouteHandlerClient({ cookies });

  try {
    if (token_hash?.startsWith("mock_") && type === "mock_email") {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.redirect(
          new URL("/auth-pages/auth-error", request.url)
        );
      }
      const response = NextResponse.redirect(
        new URL("/auth-pages/auth-confirm", request.url)
      );
      response.cookies.set("auth-check", "true", {
        maxAge: 30,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" || "strict",
      });
      return response;
    }

    if (token_hash && type) {
      // console.log("token and type are: ", token_hash, type);
      let otpType;
      switch (type) {
        case "recovery":
          otpType = "recovery";
          break;
        case "email_change":
          otpType = "email_change";
          break;
        default:
          otpType = "email";
      }
      const { data, error } = await supabase.auth.verifyOtp({
        type: otpType,
        token_hash,
      });
      if (!error) {
        let redirectUrl;
        const acceptLanguage = request.headers.get("accept-language");
        const locale = acceptLanguage?.includes("fr") ? "fr" : "en";
        if (next) {
          redirectUrl = `${requestUrl.origin}${next}`;
        } else {
          switch (otpType) {
            case "recovery":
              redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-pwreset`;
              break;
            case "email_change":
              redirectUrl = `${requestUrl.origin}/${locale}/emailRecovery`;
              break;
            default: // signup
              redirectUrl = `${requestUrl.origin}/${locale}/auth-pages/auth-confirm`;
          }
        }
        // console.log("redirect URL is: ", redirectUrl);
        return NextResponse.redirect(redirectUrl);
      } else if (error) {
        // console.log("error from otp: ", error);
      }
    } else {
      // console.log("verification error", error);
      return NextResponse.redirect(
        new URL("/auth-pages/auth-error/", request.url)
      );
    }
    // console.log("Missing token_hash or type");
    // console.log("OTP verification error:", error);
    return NextResponse.redirect(
      new URL("/auth-pages/auth-error", requestUrl.origin)
    );
  } catch (error) {
    return NextResponse.redirect(
      new URL("/auth-pages/auth-error", request.url)
    );
  }
}

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request) {
  const action = request.nextUrl.searchParams.get("action");
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const token = formData.get("captcha");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const success = NextResponse.json({ success: true });

  if (action == "signup") {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        captchaToken: token,
        emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        data: { name: name },
      },
    });
    if (!error) {
      return success;
    } else {
      return NextResponse.json(
        {
          error: {
            message: error.message,
            code: error.code,
            status: error.status,
          },
        },
        { status: 400 }
      );
    }
  }
  if (action == "login") {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        captchaToken: token,
      },
    });
    if (!error) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: error.message || "Authentication fail" },
        { status: 400 }
      );
    }
  }
}

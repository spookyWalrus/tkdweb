import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// endpoint for name change, email change or password change request
export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const firstName = formData.get("name");
  const lastName = formData.get("lastname");
  const token = formData.get("captcha");
  // const action = formData.get("action");
  const action = requestUrl.searchParams.get("action");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    if (action === "nameupdate") {
      const { error } = await supabase.auth.updateUser({
        data: { first_name: firstName, last_name: lastName },
      });
      if (error) {
        return NextResponse.json(
          {
            success: false,
            error: { message: error.message },
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json({ success: "name_updated" }, { status: 200 });
      }
    }

    if (action === "emailupdate") {
      const { data, error } = await supabase.auth.updateUser(
        {
          email: email,
        },
        {
          emailRedirectTo: `${requestUrl.origin}`,
        }
      );
      if (error) {
        return NextResponse.json(
          { success: false, error: { message: error.message } },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: "new_email_requested",
        oldEmail: data?.user?.email,
        newEmail: email,
      });
    }

    if (action === "pwrecover") {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        captchaToken: token,
        emailRedirectTo: `${requestUrl.origin}/api/auth/confirm`,
      });
      if (error) {
        return NextResponse.json(
          {
            success: false,
            error: { message: error.message },
          },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        data,
      });
    }
    // if no action type or code
    return NextResponse.json(
      {
        success: false,
        error: { message: "Invalid action" },
      },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: err.message,
          code: err.code,
        },
      },
      { status: 500 }
    );
  }
}

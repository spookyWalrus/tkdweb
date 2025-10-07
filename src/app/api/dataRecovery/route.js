import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const firstName = formData.get("name");
  const lastName = formData.get("lastname");
  const token = formData.get("captcha");
  const action = formData.get("action");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
    if (action === "nameupdate") {
      const { error } = await supabase.auth.updateUser({
        captchaToken: token,
        data: { first_name: firstName, last_name: lastName },
      });
      if (error) {
        return Response.json({ success: false, error: error.message });
      }
      return Response.json({ success: "name_updated" });
    }

    if (action === "emailupdate") {
      // console.log("updating email with: ", email);
      const { data, error } = await supabase.auth.updateUser(
        {
          email: email,
          captchaToken: token,
        },
        {
          emailRedirectTo: `${requestUrl.origin}/api/auth/confirm`,
        }
      );
      if (error) {
        // console.log("email update request fail: ", error);
        return Response.json({ success: false, error: error.message });
      }
      return Response.json({
        success: "new_email_requested",
        oldEmail: data?.user?.email,
        newEmail: email,
      });
    }

    if (action === "pwrecover") {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw error;
      }
      return NextResponse.json({
        success: true,
        data,
      });
    }
  } catch (error) {
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

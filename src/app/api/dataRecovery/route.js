import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

export async function POST(request) {
  // const action = request.nextUrl.searchParams.get("action");
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
      // console.log("updating email");
      const { error } = await supabase.auth.updateUser({
        email: email,
        captchaToken: token,
      });
      if (error) {
        return Response.json({ success: false, error: error.message });
      }
      return Response.json({ success: "email_success" });
    }

    if (action === "pwrecover") {
      // console.log("making API reset request to supabase");
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      //    {
      //   redirectTo: `${requestUrl.origin}/auth-pages/auth-pwreset`,
      // });
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
    // return NextResponse.json(
    //   {
    //     error: error.message,
    //   },
    //   { status: 400 }
    // );
  }
}

// try {
//   const body = await request.json();
//   const { email } = body;
// const { email, hCaptchaToken } = body;
// if (!email || !/\S+@\S+\.\S+/.test(email)) {
//   return NextResponse.json({ error: "Invalid email" }, { status: 400 });
// }

// const formData = new FormData();
// formData.append("access_key", process.env.NEXT_PUBLIC_WEB3_TKDCCSADM_KEY);
// formData.append("email", email);
// formData.append("h-captcha-response", hCaptchaToken);

// const res = await fetch("https://api.web3forms.com/submit", {
//   method: "POST",
//   body: formData,
// });

//     const result = await res.json();

//     if (result.success) {
//       return NextResponse.json(
//         { message: "Login successful" },
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json({ error: "Login fail" }, { status: 400 });
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to process request" },
//       { status: 500 }
//     );
//   }
// }

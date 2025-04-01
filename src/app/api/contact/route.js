import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, hCaptchaToken } = body;
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3_TKDCCSADM_KEY);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("h-captcha-response", hCaptchaToken);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

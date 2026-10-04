import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json();
  const { name, email, message, token } = body;

  try {
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!message || message.length < 10) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `response=${token}&secret=${process.env.HCAPTCHA_KEY}`,
    });
    const result = await captchaResponse.json();
    if (!result.success) {
      return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Captcha service error" },
      { status: 503 }
    );
  }
  try {
    const brevosend = "https://api.brevo.com/v3/smtp/email";

    const res = await fetch(brevosend, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId: parseInt(process.env.BREVO_TEMPLATE_ID),
        to: [
          {
            name: "TKD Admin",
            email: process.env.BREVO_RECIPIENT_EMAIL,
          },
        ],
        params: {
          senderName: name,
          senderEmail: email,
          message: message,
          submittedAt: new Date().toLocaleString(),
        },
      }),
    });

    if (!res.ok) {
      const result = await res.json();

      return NextResponse.json(
        { error: result.message || "Failed to send message" },
        { status: res.status }
      );
    } else {
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

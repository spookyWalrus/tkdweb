export async function POST(request) {
  let captchaSecret = process.env.HCAPTCHA_KEY;

  try {
    const { token, test } = await request.json();

    if (!token) {
      return Response.json({ error: "Token required" }, { status: 400 });
    }

    if (test) {
      captchaSecret = process.env.HCAPTCHA_TEST_KEY;
      console.warn("test mode");
    }

    const verifyResponse = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `secret=${captchaSecret}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      return Response.json(
        {
          error: "Captcha verification failed",
          details: verifyData["error-codes"],
        },
        { status: 400 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: "Verification & Internal server error" },
      { status: 500 }
    );
  }
}

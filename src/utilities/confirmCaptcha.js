export async function confirmCaptcha(token) {
  // let captchaSecret = process.env.HCAPTCHA_KEY;
  let captchaSecret = process.env.HCAPTCHA_TEST_KEY;

  try {
    // const { token, test } = await request.json();

    if (!token) {
      return Response.json({ error: "Token required" }, { status: 400 });
    }

    // if (test) {
    //   captchaSecret = process.env.HCAPTCHA_TEST_KEY;
    //   console.warn("test mode");
    // }

    const verifyResponse = await fetch("https://api.hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `secret=${captchaSecret}&response=${token}`,
    });

    const verifyData = await verifyResponse.json();
    if (!verifyData.success) {
      const error = new Error("Captcha verificaiton failed");
      error.details = verifyData["error-codes"];
      error.code = "invalid_captcha";
      throw error;
      // return Response.json(
      //   {
      //     error: "Captcha verification failed",
      //     details: verifyData["error-codes"],
      //   },
      //   { status: 400 }
      // );
    }
    return { succes: true };
    // return Response.json({ success: true });
  } catch (error) {
    if (error.message === "Token required") {
      error.code = "missing_token";
      error.status = 400;
    } else if (error.message === "Captcha verification failed") {
      error.status = 400;
    } else {
      error.message = "Verification & Internal server error";
      error.code = "captcha_service_error";
      error.status = 500;
    }
    throw error;
    // return Response.json(
    //   { error: "Verification & Internal server error" },
    //   { status: 500 }
    // );
  }
}

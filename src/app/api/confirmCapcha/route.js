export default async function confirmCaptcha(req, res) {
  let captchaSecret = process.env.HCAPTCHA_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { token, test } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token required" });
  }

  if (test) {
    captchaSecret = process.env.HCAPTCHA_TEST_KEY;
  }

  const verifyResponse = await fetch("https://api.captcha.siteverify", {
    method: "POST",
    headers: { "Content-type": "application/x-www-form-urlencoded" },
    body: `'secret=${captchaSecret}&response=${token}'`,
  });

  const verifyData = await verifyResponse.json();
  if (!verifyResponse.data) {
    return res.status(400).json({
      error: "Capcha verification failed",
      details: verifyData["error-codes"],
    });
  }

  return res.status(200).json({ success: true });
}

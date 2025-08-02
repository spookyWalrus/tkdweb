"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Login() {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");
  // let loginSend = t("loginSend");
  // let loginSending = t("loginSending");
  // let loginSuccess = t("loginSuccess");
  // let loginFailed = t("loginFail");
  let loginSend = "Log in";
  let loginSending = "Logging in";
  let loginSuccess = "Log in Success";
  let loginFailed = "Log in Fail";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin(formData, t);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      return;
    }

    // const isCaptchaRequired = process.env.NODE_ENV !== "test";
    // if (isCaptchaRequired && !captchaToken) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     captcha: t("CaptchaError"),
    //   }));
    //   return;
    // }

    setStatus("submitting");
    // };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // hCaptchaToken: captchaToken,
        }),
      });
      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ email: "", pw: "" });
        // setCaptchaToken(null);
      } else {
        setStatus(loginFailed);
        setErrors({ submit: result.error || loginFailed });
      }
    } catch (error) {
      setStatus("Error on submit");
      setErrors({ submit: "Network error. Try again" });
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>{t2("Login.Header")}</h3>
          {/* <h3>Member Log In</h3> */}
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="email" className="formLabel">
                {t("Email")}
                {/* Email */}
              </label>
              <div className="control">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="dolyochagi@taekwondo.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="help is-danger">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="field">
              <label htmlFor="pw" className="formLabel">
                Password
              </label>
              {/* <p className="help passwordNote">
                Must be min. 8 characters long, 1 number and 1 symbol
              </p> */}
              <div className="control">
                <input
                  type="pw "
                  name="pw"
                  id="pw"
                  placeholder="mysecret"
                  value={formData.pw}
                  onChange={handleChange}
                />
                <Link href="/loginRecovery" className="passwordNoteReset">
                  {t2("Login.ForgotPW")}
                </Link>
                {errors.pw && (
                  <p className="help is-danger" data-testid="pw-error">
                    {errors.pw}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="field">
              <div className="control">
                <HCaptcha
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_FREESITE_KEY || ""}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                />
                {errors.captcha && (
                  <p className="help is-danger">{errors.captcha}</p>
                )}
              </div>
            </div> */}
            <div className="field">
              <div className="control controlCenter">
                <button
                  className="button"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? loginSending : loginSend}
                </button>
                {errors.submit && (
                  <p className="help is-danger">{errors.submit}</p>
                )}
                {status === "success" && (
                  <p className="help is-success sentMessage">{loginSuccess}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

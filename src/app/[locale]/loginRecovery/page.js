"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations } from "next-intl";
import Link from "next/link";

function Recovery() {
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

  let recoverySend = "Recover my password";
  let recoverySending = "Sending recovery request";
  let recoverySuccess = "Recovery code sent";
  let recoveryFailed = "Recovery Fail";

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
      const res = await fetch("/api/loginrecovery", {
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
        setStatus(recoveryFailed);
        setErrors({ submit: result.error || recoveryFailed });
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
          {/* <h3>{t2("Login.Header")}</h3> */}
          <h3>Password recovery</h3>
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="email" className="formLabel">
                {t("Email")}
                {/* Email */}
              </label>
              <p className="help passwordNote">
                We will send a recovery code to this address
              </p>
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
                  {status === "submitting" ? recoverySending : recoverySend}
                </button>
                {errors.submit && (
                  <p className="help is-danger">{errors.submit}</p>
                )}
                {status === "success" && (
                  <p className="help is-success sentMessage">
                    {recoverySuccess}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Recovery;

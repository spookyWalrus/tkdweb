"use client";
import { useState, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { PulseLoader } from "react-spinners";

// import { verifyCaptcha } from "@/utilities/verifyCaptcha";

function Login() {
  const [status, setStatus] = useState("");
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [relogMessage, setRelogMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");
  const router = useRouter();
  const params = useSearchParams();
  const message = params.get("message");

  // let loginSend = t("loginSend");
  // let loginSending = t("loginSending");
  // let loginSuccess = t("loginSuccess");
  // let loginFailed = t("loginFail");
  let loginSend = "Log in";
  let loginSending = "Logging in";
  let loginSuccess = "Log in Success";
  let loginFailed = "Log in Fail";

  let isThisATest =
    process.env.NODE_ENV === "test" ||
    process.env.NEXT_PUBLIC_HCAPTCHA_TEST === "true";

  useEffect(() => {
    const theSession = localStorage.getItem("hadSession");
    const manualLogout = localStorage.getItem("manualLogout");
    if (message === "auth_required") {
      if (theSession === "true" && manualLogout !== "true") {
        setRelogMessage("Session has expired, please log in again");
      } else {
        setRelogMessage("");
      }
      localStorage.removeItem("manualLogout");
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin(inputData, t);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
    // else {
    //   try {
    //     const captchaStatus = await verifyCaptcha(captchaToken, isThisATest);
    //     if (!captchaStatus.success) {
    //       setErrors((prev) => ({
    //         ...prev,
    //         captcha: captchaStatus.error || t("CaptchaError"),
    //       }));
    //       setStatus(captchaStatus.error);

    //       const error = new Error(
    //         `Captcha verification failed: ${captchaStatus.error}`
    //       );
    //       error.details = captchaStatus.details;
    //       error.status = captchaStatus.status;
    //       console.error("Captcha Error:", error);
    //       throw error;
    //     }
    //     return true;
    //   } catch (error) {
    //     console.error("Unexpected error in validateForm:", error);
    //     return {
    //       success: false,
    //       unexpectedError: error.message,
    //     };
    //   }
    // }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const actionType = e.target.dataset.action;

    const isValid = await validateForm(e);
    if (!isValid) {
      return;
    }
    setIsSubmitting(true);
    setStatus("submitting");
    e.target.disabled = true;

    const formData = new FormData();
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("name", inputData.name);
    formData.append("captcha", captchaToken);
    try {
      const res = await fetch(`/api/login?action=${actionType}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error?.message || "Authentication fail");
      }
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("hadSession", "true");
        // setStatus("Log in success");
        setTimeout(() => {
          router.push("/member/account");
        }, 500);
      }
    } catch (err) {
      setStatus("");
      setIsSubmitting(false);
      setErrors({ submit: err.message || "Network error. Try again" });
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>{t2("Login.Header")}</h3>
          {relogMessage && (
            <h4 className="alert-warning" role="alert">
              {relogMessage}
            </h4>
          )}
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="email" className="formLabel">
                {t("Email")}
              </label>
              <div className="control">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="dolyochagi@taekwondo.com"
                  value={inputData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="help is-danger">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="password" className="formLabel">
                Password
              </label>

              <div className="control">
                <input
                  type="password "
                  name="password"
                  id="password"
                  placeholder="secret password"
                  value={inputData.password}
                  onChange={handleChange}
                />
                <Link href="/loginRecovery" className="passwordNoteReset">
                  {t2("Login.ForgotPW")}
                </Link>
                {errors.password && (
                  <p className="help is-danger" data-testid="password-error">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="control h-captcha">
              <HCaptcha
                sitekey={
                  isThisATest
                    ? process.env.NEXT_PUBLIC_HCAPTCHA_TEST_SITE_KEY
                    : process.env.NEXT_PUBLIC_TKD_HCAPTCHA_SITE_KEY
                }
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken(null)}
                data-testid="hcaptcha-widget"
              />
              {errors.captcha && (
                <p className="help is-danger hcapError">{errors.captcha}</p>
              )}
            </div>

            <div className="control controlCenter">
              <div>
                <button
                  className="button"
                  data-action="login"
                  type="submit"
                  onClick={submitForm}
                >
                  {status === "submitting" ? (
                    <>
                      <span>{loginSending}</span>
                      <PulseLoader
                        color="blue"
                        loading={isSubmitting}
                        size={10}
                        aria-label="Loading spinner"
                        margin={5}
                      />
                    </>
                  ) : (
                    <span>{loginSend}</span>
                  )}
                  {/* {status === "submitting" ? loginSending : loginSend} */}
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

"use client";
import { useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { useAuth } from "@/utilities/authContexter";

function Login() {
  const [status, setStatus] = useState("");
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(null);

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");
  const router = useRouter();
  const params = useSearchParams();
  const captchaRef = useRef();
  const resetAttemptRef = useRef(false);
  const message = params.get("message");
  const { refreshUser } = useAuth();

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
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetCaptcha = useCallback(() => {
    setCaptchaToken(null);
    setCaptchaKey(Date.now());
  }, []);

  const validateForm = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateLogin(inputData, t);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    } else {
      return true;
    }

    // const isCaptchaRequired = process.env.NODE_ENV !== "test";
    // if (isCaptchaRequired && !captchaToken) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     captcha: t("CaptchaError"),
    //   }));
    //   return;
    // }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    setStatus("");

    const isValid = await validateForm(e);
    if (!isValid) {
      return;
    }
    if (!captchaToken) {
      setStatus("noCaptcha");
      return;
    }
    setIsSubmitting(true);
    setStatus("submitting");

    const formData = new FormData();
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("name", inputData.name);
    formData.append("captcha", captchaToken);
    try {
      const res = await fetch("/api/login?action=login", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        resetCaptcha();
        e.target.disabled = false;
        throw new Error(
          data.error?.message ||
            data.message ||
            data.error ||
            "Authentication fail"
        );
      }

      if (data.success) {
        e.target.disabled = false;
        await refreshUser();
        setTimeout(() => {
          router.push("/member/account");
        }, 500);
      }
    } catch (err) {
      setStatus("");
      setIsSubmitting(false);
      resetCaptcha();
      e.target.disabled = false;
      if (err instanceof TypeError || err.message.includes("fetch")) {
        resetCaptcha();
        setErrors({ submit: err.message || "Network error. Try again" });
      }
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
            <div className="control controlCenter">
              <div>
                <button
                  className="button"
                  data-action="login"
                  type="submit"
                  onClick={submitForm}
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

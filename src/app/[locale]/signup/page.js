"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations, useLocale } from "next-intl";
import { PulseLoader } from "react-spinners";

function Signup() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");

  let signUpSend =
    status === "success" ? t2("Login.Success") : t2("Login.SignUp");

  let isThisATest =
    process.env.NODE_ENV === "test" ||
    process.env.NEXT_PUBLIC_HCAPTCHA_TEST === "true";

  const showStatus = () => {
    switch (status) {
      case "success":
        return (
          <p className="help is-success sentMessage">
            {t2("Login.SignUpSuccess")}
          </p>
        );
      case "fail":
        return <p className="help is-fail sentMessage">{t2("SignUpFail")}</p>;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyCaptcha = async () => {
    if (!captchaToken) {
      setErrors((prev) => ({
        ...prev,
        captcha: t("CaptchaError"),
      }));
      return false;
    }
    try {
      const response = await fetch("/api/confirmCaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: captchaToken,
          test: isThisATest,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          captcha: data.error || t("CaptchaError"),
        }));
        setStatus("fail");
        return false;
      } else {
        setErrors((prev) => {
          const { captcha, ...rest } = prev;
          return rest;
        });
        return true;
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        captcha: "Network error. Try again.",
      }));
      setStatus("fail");
      return false;
    }
  };

  const validateForm = async (action, e) => {
    setErrors({});
    setStatus("submitting");
    const validationErrors = validateLogin(inputData, t, action);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("");
      setIsSubmitting(false);
      e.target.disabled = false;
      return false;
    }

    const captchaValid = await verifyCaptcha();
    if (!captchaValid) {
      setStatus("fail");
      setIsSubmitting(false);
      e.target.disabled = false;
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const actionType = e.target.dataset.action;
    e.target.disabled = true;
    const isFormValid = await validateForm(actionType, e);
    if (!isFormValid) {
      return;
    }

    const formData = new FormData();
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("name", inputData.name);

    try {
      const res = await fetch(`/api/login?action=${actionType}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || "Authentication fail");
      }
      setStatus("success");
      setIsSubmitting(false);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Network error. Try again",
      }));
      setStatus("fail");
      e.target.disabled = false;
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>Sign up to CCS Taekwondo Academy</h3>
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="name" className="formLabel">
                {t("Name")}
              </label>
              <div className="control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Kick Yourface"
                  value={inputData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p
                    className="help is-danger nameError"
                    data-testid="name-error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
            </div>

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
                  <p
                    className="help is-danger emailError"
                    data-testid="email-error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="password" className="formLabel">
                {t2("Login.Password")}
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
                <p className="help passwordNote">
                  {t2("Login.PasswordRules")}
                  {/* Must be min. 8 characters long, uppercase and lower case
                  letters,1 number and 1 symbol */}
                </p>

                {errors.password && (
                  <p
                    className="help is-danger PWError"
                    data-testid="password-error"
                  >
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <div className="field">
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
            </div>

            <div className="control controlCenter">
              <button
                className="button"
                data-action="signup"
                type="submit"
                onClick={submitForm}
                disabled={false}
              >
                {isSubmitting ? (
                  <>
                    <span>{t2("Login.SigningUp")}</span>
                    <PulseLoader
                      color="blue"
                      loading={isSubmitting}
                      size={10}
                      aria-label="Loading spinner"
                      margin={5}
                    />
                  </>
                ) : (
                  signUpSend
                )}
              </button>
              {errors.submit && (
                <p className="help is-danger">{errors.submit}</p>
              )}
              {showStatus()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

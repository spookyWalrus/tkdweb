"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Signup() {
  // const searchParams = useSearchParams();

  const [status, setStatus] = useState("");
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");
  // const currentLocale = useLocale();
  const router = useRouter();
  // const supabase = createClientComponentClient();

  // let loginSend = t("loginSend");
  // let loginSending = t("loginSending");
  // let loginSuccess = t("loginSuccess");
  // let loginFailed = t("loginFail");
  let loginSend = "Sign up";
  let loginSending = "Signing up";
  let loginSuccess = "Sign up Success";
  let loginFailed = "Sign up Fail";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (e) => {
    console.log("validating form");
    e.preventDefault();
    setErrors({});
    setStatus("submitting");
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
    if (validateForm) {
      const actionType = e.target.dataset.action;
      const formData = new FormData();
      formData.append("email", inputData.email);
      formData.append("password", inputData.password);
      formData.append("name", inputData.name);

      try {
        const res = await fetch(`/api/login?action=${actionType}`, {
          method: "post",
          body: formData,
        });
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error?.message || "Auth fail");
        }
        router.push("/member/account");
      } catch (err) {
        setErrors(err.message || "Network error. Try again");
      }
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
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
                {errors.email && (
                  <p className="help is-danger">{errors.email}</p>
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
                <p className="help passwordNote">
                  Must be min. 8 characters long, uppercase and lower case
                  letters,1 number and 1 symbol
                </p>

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
              <button
                className="button"
                data-action="signup"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

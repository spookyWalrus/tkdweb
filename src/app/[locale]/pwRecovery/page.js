"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PulseLoader } from "react-spinners";

function PWRecovery() {
  const [status, setStatus] = useState("");
  const [inputData, setInputData] = useState({
    email: "",
    action: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const [warning, setWarning] = useState(null);
  const captchaRef = useRef();
  const params = useSearchParams();
  const message = params.get("message");

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");
  const tokenWarning = t2("Recovery.tokenExpired");

  // let recoverySend = "Recover my password";
  // let recoverySending = "Sending recovery request";

  const showStatus = () => {
    switch (status) {
      case "success":
        return (
          <p className="help is-success sentMessage">
            {/* {t2("SignUp.SignUpSuccess")} */}
            {/* Recovery code sent to above email */}
            {t2("Recovery.codeSent")}
          </p>
        );
      // case "fail":
      //   return <p className="help is-fail ">{t2("SignUp.SignUpFail")}</p>;
      case "error":
        return (
          <p className="help is-danger">
            {t2("Login.AuthenticationFail")}
            <br />
            {errors.submit}
          </p>
        );
      case "noCaptcha":
        return (
          <p className="help is-danger hcapError">{t2("Login.CaptchaError")}</p>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (message === "token_expired") {
      setWarning(tokenWarning);
      // setWarning("Token expired. Request another verification link");
    }
  }, [tokenWarning, message]);

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

  const validateForm = async (e, action) => {
    e.preventDefault();
    setErrors({});
    setStatus("submitting");
    const validationErrors = validateLogin(inputData, t, action) || {};

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const actionType = e.target.dataset.action;
    setIsSubmitting(true);
    const isValid = await validateForm(e, actionType);
    if (!isValid) {
      setIsSubmitting(false);
      setStatus("error");
      return;
    }
    if (!captchaToken) {
      setStatus("noCaptcha");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", inputData.email);
    formData.append("action", inputData.action);
    formData.append("captcha", captchaToken);

    try {
      const res = await fetch("/api/dataRecovery?action=pwrecover", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();

        let errorMessage =
          errorData.error.message || "Authentication failed. Try again";
        let errorToThrow = new Error(errorMessage);
        setErrors((prev) => ({
          ...prev,
          submit: errorMessage,
        }));
        setStatus("error");
        resetCaptcha();
        setIsSubmitting(false);
        e.target.disabled = false;
        throw errorToThrow;
      }

      setStatus("success");
      setIsSubmitting(false);
    } catch (error) {
      console.warn("error: ", error.message);
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>{t2("Recovery.PasswordRecover")}</h3>
          {warning && (
            <div
              className="has-text-warning subtitle is-5"
              style={{ margin: "0 auto", width: "50%" }}
            >
              {warning}
            </div>
          )}
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="email" className="formLabel">
                {t("Email")}
                {/* Email */}
              </label>
              <p className="help passwordNote">
                {/* We will send a recovery code to this address */}
                {t2("Recovery.recoveryBlurb")}
              </p>
              <div className="control">
                <input
                  type="text"
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
              <div className="control h-captcha">
                <HCaptcha
                  ref={captchaRef}
                  key={captchaKey}
                  sitekey={process.env.NEXT_PUBLIC_TKD_HCAPTCHA_SITE_KEY}
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={resetCaptcha}
                  onError={resetCaptcha}
                  data-testid="hcaptcha-widget"
                />
                {errors.captcha && (
                  <p className="help is-danger hcapError">{errors.captcha}</p>
                )}
              </div>
            </div>

            <div className="field">
              <div className="control controlCenter">
                <button
                  className="button"
                  data-action="pwrecover"
                  type="submit"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  value={inputData.action}
                  // disabled={status === "submitting"}
                >
                  {isSubmitting ? (
                    <>
                      <span>{t2("Recovery.recoverySending")}</span>
                      <PulseLoader
                        color="blue"
                        loading={isSubmitting}
                        size={10}
                        aria-label="Loading spinner"
                        margin={5}
                      />
                    </>
                  ) : (
                    t2("Recovery.recoverySend")
                  )}
                </button>
                {showStatus()}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PWRecovery;

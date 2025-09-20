"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { validateLogin } from "@/utilities/validateLogin";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";

export default function PWReset() {
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({ dude: "dude" });
  const [inputData, setInputData] = useState({
    nupassword: "",
    passwordrepeat: "",
    oldpassword: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [theUser, setTheUser] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const captchaRef = useRef();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");

  let resetSend = "Reset my password";
  let resetSending = "Resetting new password";

  let isThisATest =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_HCAPTCHA_TEST === "true";

  const showStatus = () => {
    switch (status) {
      case "success":
        return (
          <p className="help is-success sentMessage">
            {/* {t2("SignUp.SignUpSuccess")} */}
            New password set! Redirecting to account page...
          </p>
        );
      case "fail":
        return <p className="help is-fail ">{t2("SignUp.SignUpFail")}</p>;
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
      case "tokenfail":
        return (
          <div
            className="has-text-warning subtitle is-5 has-text-centered"
            style={{ margin: "0 auto", width: "50%" }}
          >
            {/* {t2("SignUp.SignUpFail")}  */}
            Verification link expired. Redirecting to recovery page...
          </div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    const handleTokenVerification = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token_hash = urlParams.get("token_hash");
      const type = urlParams.get("type");

      if (token_hash && type) {
        const { data, error } = await supabase.auth.verifyOtp({
          type: type,
          token_hash,
        });

        if (!error && data.user) {
          // Clean up URL
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );

          setIsUser(true);
          setTheUser(data.user.last_name);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setStatus("tokenfail");
          setTimeout(
            () => router.push("/pwRecovery?message=token_expired"),
            5000
          );
        }
      } else {
        // no token, so checking if user exists or session exists
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // user is logged in
          setIsUser(true);
          setTheUser(
            user.user_metadata.first_name,
            user.user_metadata.last_name
          );
          setIsLoading(false);

          return;
        } else {
          router.push("/signup");
        }
      }
    };
    handleTokenVerification();
  });

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
    setIsSubmitting(true);

    if (inputData.nupassword !== inputData.passwordrepeat) {
      let noMatch = "Passwords do not match";
      setErrors({ passwordNoMatch: noMatch });
      return false;
    }

    const validationErrors = validateLogin(inputData, t, action);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  const updatePassword = async (e) => {
    if (!isUser || !theUser) return;
    e.preventDefault();
    const actionType = e.target.dataset.action;

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

    try {
      const { error } = await supabase.auth.updateUser({
        password: inputData.passwordrepeat,
      });
      if (error) {
        throw new Error(error);
      }
      setStatus("success");
      // setIsSubmitting(false);
      const redirect = router.push(`/member/account?message=password_updated`);
      setTimeout(() => redirect, 10000);
    } catch (error) {
      console.warn("error: ", error.message);
    }
    // }
  };
  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
          <h3>Reset your password</h3>
        </div>

        {isLoading ? (
          <div className="has-text-centered">
            <PulseLoader
              color="blue"
              loading={isLoading}
              size={10}
              aria-label="Loading spinner"
              margin={5}
            />
          </div>
        ) : status === "tokenfail" ? (
          showStatus()
        ) : (
          <div className="loginBlock">
            <form onSubmit={updatePassword} className="contactForm">
              <div className="field">
                <label htmlFor="password" className="formLabel">
                  {/* {t2("Login.Password")} */}
                  Enter new password
                </label>
                <div className="control">
                  <input
                    type="password "
                    name="nupassword"
                    id="nupassword"
                    placeholder="secret password"
                    value={inputData.nupassword}
                    onChange={handleChange}
                  />
                  <p className="help passwordNote">
                    {t2("SignUp.PasswordRules")}
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
                <label htmlFor="password" className="formLabel">
                  {/* {t2("Login.Password")} */}
                  Re-enter your password
                </label>

                <div className="control">
                  <input
                    type="password "
                    name="passwordrepeat"
                    id="passwordreepat"
                    placeholder="repeat password"
                    value={inputData.passwordrepeat}
                    onChange={handleChange}
                  />

                  {errors.passwordNoMatch && (
                    <p
                      className="help is-danger PWError"
                      data-testid="password-error"
                    >
                      {errors.passwordNoMatch}
                    </p>
                  )}
                </div>
              </div>

              <div className="field">
                <div className="control h-captcha">
                  <HCaptcha
                    ref={captchaRef}
                    key={captchaKey}
                    sitekey={
                      isThisATest
                        ? process.env.NEXT_PUBLIC_HCAPTCHA_TEST_SITE_KEY
                        : process.env.NEXT_PUBLIC_TKD_HCAPTCHA_SITE_KEY
                    }
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
                    data-action="pwreset"
                    type="submit"
                    onClick={updatePassword}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span>{resetSending}</span>
                        <PulseLoader
                          color="blue"
                          loading={isSubmitting}
                          size={10}
                          aria-label="Loading spinner"
                          margin={5}
                        />
                      </>
                    ) : (
                      resetSend
                    )}
                  </button>
                  {showStatus()}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState, useRef, useCallback } from "react";
// import HCaptcha from "@hcaptcha/react-hcaptcha";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { validateLogin } from "@/utilities/validateLogin";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";
import PWToggle from "@/components/pwToggle";

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
  // const [captchaToken, setCaptchaToken] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [theUser, setTheUser] = useState(null);
  const [pwtype, setPwtype] = useState("password");
  const [pwtype2, setPwtype2] = useState("password");

  // const [captchaKey, setCaptchaKey] = useState(Date.now());
  const captchaRef = useRef();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");

  const showStatus = () => {
    switch (status) {
      case "success":
        return (
          <p className="help is-success sentMessage">
            {/* {t2("SignUp.SignUpSuccess")} */}
            {/* New password set! Redirecting to account page... */}
            {t2("Reset.ResetSuccess")}
          </p>
        );
      case "fail":
        return <p className="help is-fail ">{t2("SignUp.SignUpFail")}</p>;
      case "error":
        return (
          <p className="help is-danger">
            {t2("Login.AuthenticationFail")}
            <br />
            {errors.message}
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
            {/* Verification link expired. Redirecting to recovery page... */}
            {t2("TokenFail")}
          </div>
        );
      case "passwordsame":
        return (
          <div className="has-text-danger is-5 ">
            {/* Reset failed. New password must not be same as old password. */}
            {t2("Reset.PasswordSame")}
          </div>
        );
      case "sessionerror":
        return (
          <div className="has-text-danger is-5 ">
            {/* Session error. Log in again to continue. */}
            {t2("SessionError")}
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

  // const resetCaptcha = useCallback(() => {
  //   setCaptchaToken(null);
  //   setCaptchaKey(Date.now());
  // }, []);

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

    setStatus(null);
    const actionType = e.target.dataset.action;

    const isValid = await validateForm(e, actionType);
    if (!isValid) {
      setIsSubmitting(false);
      setStatus("error");
      return;
    }
    // if (!captchaToken) {
    //   setStatus("noCaptcha");
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      const { error } = await supabase.auth.updateUser({
        password: inputData.passwordrepeat,
      });
      if (error) {
        if (error.code === "same_password") {
          setIsSubmitting(false);
          setStatus("passwordsame");
          return;
        } else {
          setIsSubmitting(false);
          setStatus(error.message);
          throw error;
        }
      }
      setStatus("success");
      // setIsSubmitting(false);
      const redirect = router.push(`/member/account?message=password_updated`);
      setTimeout(() => redirect, 10000);
    } catch (error) {
      console.warn("error: ", error.message);
      setStatus("sessionerror");
      setErrors(error.message);
    }
    // }
  };
  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
          {/* <h3>Reset your password</h3> */}
          <h3>{t2("Reset.ResetPasswordHeader")}</h3>
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
                  {/* Enter new password */}
                  {t2("Reset.NewPW")}
                </label>
                <div className="control inputContainer">
                  <input
                    type={pwtype}
                    name="nupassword"
                    id="nupassword"
                    placeholder="secret password"
                    value={inputData.nupassword}
                    onChange={handleChange}
                    className="inputBox"
                  />
                  <PWToggle setPwtype={setPwtype} pwtype={pwtype} />

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
                  {/* Re-enter your password */}
                  {t2("Reset.NewPWAgain")}
                </label>

                <div className="control inputContainer">
                  <input
                    type={pwtype2}
                    name="passwordrepeat"
                    id="passwordreepat"
                    placeholder="repeat password"
                    value={inputData.passwordrepeat}
                    onChange={handleChange}
                    className="inputBox"
                  />
                  <PWToggle setPwtype={setPwtype2} pwtype={pwtype2} />

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

              {/* <div className="field">
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
              </div> */}

              <div className="field">
                <div className="control controlCenter">
                  <button
                    className="button pwresetbutton"
                    data-action="pwreset"
                    type="submit"
                    onClick={updatePassword}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span>{t2("Reset.ResetSending")}</span>
                        <PulseLoader
                          color="blue"
                          loading={isSubmitting}
                          size={10}
                          aria-label="Loading spinner"
                          margin={5}
                        />
                      </>
                    ) : (
                      t2("Reset.ResetSend")
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

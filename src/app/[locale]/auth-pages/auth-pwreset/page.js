"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { validateLogin } from "@/utilities/validateLogin";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";

export default function PWReset() {
  // const [password, setPassword] = useState(null);
  // const [confirmPW, setConfirmPW] = useState(null);
  // const [loading, setIsLoading] = useState(null);
  // const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({ dude: "dude" });
  const [inputData, setInputData] = useState({
    nupassword: "",
    passwordrepeat: "",
    oldpassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isUser, setIsUser] = useState(null);
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
      default:
        return null;
    }
  };

  useEffect(() => {
    const detectUserOrigin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const urlParams = new URLSearchParams(window.location.search);
      // Check for parameters that indicate email link origin
      const hasResetParams = urlParams.has("from=email");
      if (!user) {
        setIsUser(false);
        // console.log(
        //   "user not logged in, nor using confirmation link, redirect to login page"
        // );
        const { error } = await supabase.auth.signOut();
        if (!error) {
          router.push("/login");
        }
      }
      if (user && !hasResetParams) {
        setIsUser(true);

        // User is logged in AND didn't come from email link
        // User enters current password to make reset
        // console.log("user logged in, reset with password check");
        // show enter current password field
      } else if (user && hasResetParams) {
        setIsUser(true);

        // User is logged in BUT came from email link
        // or somehow using typed in URL or something
        // This is the confusing scenario - handle appropriately

        // Normal email reset flow
        // console.log("confirmation link, direct pw reset");
      }
    };

    detectUserOrigin();
  });

  //

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
    // console.log("the action is: ", action);

    if (inputData.nupassword !== inputData.passwordrepeat) {
      let noMatch = "Passwords do not match";
      // console.log(
      //   "no match passwrods, ",
      //   inputData.nupassword,
      //   inputData.passwordrepeat
      // );
      setErrors({ passwordNoMatch: noMatch });
      return false;
    }

    const validationErrors = validateLogin(inputData, t, action);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // console.log("validateLogin error source", validationErrors);
      return false;
    }
    return true;
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const actionType = e.target.dataset.action;
    e.target.disabled = true;
    const isValid = await validateForm(e, actionType);
    if (!isValid) {
      setIsSubmitting(false);
      setStatus("error");
      e.target.disabled = false;
      // console.log("form validation error");
      return;
    }
    if (!captchaToken) {
      setStatus("noCaptcha");
      setIsSubmitting(false);
      e.target.disabled = false;
      // console.log("catpcha error");
      return;
    }
    if (isUser) {
      // const { data: user } = await supabase.auth.getUser();

      // const { error: signInError } = await supabase.auth.signInWithPassword({
      //   email: user.email,
      //   password: oldpassword,
      // });

      // if (signInError) {
      // setErrors({ passwordCheck: "Current password is incorrect" });
      // console.log("session and user check error");
      //   return;
      // }

      try {
        // console.log(
        //   "trying update, new password is: ",
        //   inputData,
        //   passwordrepeat
        // );
        const { error } = await supabase.auth.updateUser({
          password: inputData.passwordrepeat,
        });
        if (error) {
          // console.log("error trying to update: ", error);
          throw new Error(error);
        }
        setStatus("success");
        // setIsLoading(false);
        setIsSubmitting(false);
        // console.log("reset succesful");
        // const redirect = router.push(
        //   `/member/account?message=password_updated`
        // );
        // const theTimer = setTimeout(() => {
        //   redirect;
        // }, 3000);

        // return () => {
        //   theTimer();
        //   clearTimeout(theTimer);
        // };
      } catch (error) {
        console.warn("error: ", error.message);
      }
    }
  };
  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
          <h3>Reset your password</h3>
        </div>

        <div className="loginBlock">
          <form onSubmit={updatePassword} className="contactForm">
            {isUser && (
              <div className="field">
                <label htmlFor="password" className="formLabel">
                  {/* {t2("Login.Password")} */}
                  Please enter current password
                </label>
                <div className="control">
                  <input
                    type="password "
                    name="oldpassword"
                    id="oldpassword"
                    placeholder="current password"
                    value={inputData.oldpassword}
                    onChange={handleChange}
                  />
                  {/* <p className="help passwordNote">
                    {t2("SignUp.PasswordRules")}
                  </p> */}

                  {errors.password && (
                    <p
                      className="help is-danger PWError"
                      data-testid="password-error"
                    >
                      {errors.passwordCheck}
                    </p>
                  )}
                </div>
              </div>
            )}

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
                {/* <p className="help passwordNote">
                  {t2("SignUp.PasswordRules")}
                </p> */}

                {errors.password && (
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
                  // disabled={status === "submitting"}
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
      </div>
    </div>
  );
}

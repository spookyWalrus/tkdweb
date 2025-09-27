"use client";
import { useState, useRef, useCallback } from "react";
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
    lastname: "",
  });
  const [errors, setErrors] = useState({ dude: "dude" });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(Date.now());
  const captchaRef = useRef();

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");

  // let signUpSend = t2("SignUp.SignUp");
  // status === "success" ? t2("Login.Success") : t2("SignUp.SignUp");

  let lang = useLocale();
  // let signingUp, name, signUpHeader, noCaptchaSet;
  // if (lang === "en") {
  // signingUp = "Signing Up";
  // name = "First Name";
  // signUpHeader = "Sign up to CCS Taekwondo Academy";
  // noCaptchaSet = "Please complete Captcha verification";
  // } else if (lang === "fr") {
  // signingUp = "Inscription en cours";
  // name = "Pré-nom";
  // signUpHeader = "Inscrivez-vous à la Académie de Taekwondo CCS";
  // noCaptchaSet = "Veuillez compléter la vérification Captcha";
  // }

  let isThisATest = false;
  // process.env.NODE_ENV !== "production" ||
  // process.env.NEXT_PUBLIC_HCAPTCHA_TEST === "true";

  const showStatus = () => {
    switch (status) {
      case "success":
        return (
          <p className="help is-success sentMessage">
            {t2("SignUp.SignUpSuccess")}
          </p>
        );
      case "fail":
        return <p className="help is-fail ">{t2("SignUp.SignUpFail")}</p>;
      case "error":
        return (
          <p className="help is-danger">
            {errors.submit}
            <br />
            {t2("Login.AuthenticationFail")}
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

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const actionType = e.target.dataset.action;
    e.target.disabled = true;
    const isFormValid = await validateForm(actionType, e);
    if (!isFormValid) {
      setIsSubmitting(false);
      return;
    }
    if (!captchaToken) {
      setStatus("noCaptcha");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", inputData.email);
    formData.append("password", inputData.password);
    formData.append("name", inputData.name);
    formData.append("lastname", inputData.lastname);
    formData.append("captcha", captchaToken);
    // formData.append("isTest", isThisATest);

    try {
      const res = await fetch("/api/login?action=signup", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();

        let errorMessage;
        let errorToThrow;
        if (isThisATest) {
          errorMessage = JSON.stringify(
            {
              message: errorData.error?.message,
              code: errorData.error?.code,
              status: errorData.error?.status,
              details: errorData.error?.details,
            },
            null,
            2
          );
          errorToThrow = new Error(errorMessage);
        } else {
          errorMessage =
            errorData.error?.message ?? "Authentication failed. Try again";
          errorToThrow = new Error(errorMessage);
        }
        setErrors((prev) => ({
          ...prev,
          submit: errorMessage,
        }));
        setStatus("error");
        resetCaptcha();
        setIsSubmitting(false);
        e.target.disabled = false;
        // throw errorToThrow;
      }

      setStatus("success");
      setIsSubmitting(false);
      e.target.disabled = true;
    } catch (err) {
      if (isThisATest) {
        const errorObj = JSON.parse(err.message);
        console.warn("Test mode error details: ", errorObj);
      }
      // console.warn("error: ", err.message);
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>Sign up to CCS Taekwondo Academy</h3> */}
          <h3>{t2("SignUp.signUpHeader")}</h3>
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="name" className="formLabel">
                {/* {t("Name")} */}
                {t2("SignUp.signUpName")}
              </label>
              <div className="control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Dolyo"
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
              <label htmlFor="lastname" className="formLabel">
                {t("LastName")}
              </label>
              <div className="control">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Chagi"
                  value={inputData.lastname}
                  onChange={handleChange}
                />
                {errors.lastname && (
                  <p
                    className="help is-danger nameError"
                    data-testid="name-error"
                  >
                    {errors.lastname}
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
              <div className="control h-captcha">
                <HCaptcha
                  ref={captchaRef}
                  key={captchaKey}
                  sitekey={process.env.NEXT_PUBLIC_TKD_HCAPTCHA_SITE_KEY}
                  // sitekey={
                  //   isThisATest
                  //     ? process.env.NEXT_PUBLIC_HCAPTCHA_TEST_SITE_KEY
                  //     : process.env.NEXT_PUBLIC_TKD_HCAPTCHA_SITE_KEY
                  // }
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

            <div className="control controlCenter">
              <button
                className="button"
                data-action="signup"
                type="submit"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span>
                      {t2("SignUp.signingUp")}
                      {/* {signingUp} */}
                    </span>
                    <PulseLoader
                      color="blue"
                      loading={isSubmitting}
                      size={10}
                      aria-label="Loading spinner"
                      margin={5}
                    />
                  </>
                ) : (
                  t2("SignUp.SignUp")
                  // signUpSend
                )}
              </button>
              {showStatus()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

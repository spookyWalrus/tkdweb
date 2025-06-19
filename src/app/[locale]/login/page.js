"use client";
import { useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { validateLogin } from "@/utilities/validateLogin";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

function Login() {
  const searchParams = useSearchParams();

  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");
  const currentLocale = useLocale();
  const router = useRouter();
  const supabase = createClientComponentClient();

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { email, password } = formData;

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.push("/member/account");
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
      const res = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const { data, error } = res;
      if (!error) {
        setStatus("success");
        // window.location.href = "/dashboard"; // or whatever page on succesful login, maybe use useRouter() instead here?

        const safeRoutes = [
          `${currentLocale}/member/profile`,
          `${currentLocale}/member/account`,
        ];
        const from = safeRoutes.includes(searchParams.get("from"))
          ? searchParams.get("from")
          : `${currentLocale}/member/account`;
        router.push(from);
        // router.push("/home");
      } else {
        setStatus(loginFailed);
        setErrors({ submit: error || loginFailed });
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
          <h3>{t2("Login.Header")}</h3>
          {/* <h3>Member Log In</h3> */}
        </div>
        <div className="loginBlock">
          <form onSubmit={submitForm} className="contactForm">
            <div className="field">
              <label htmlFor="email" className="formLabel">
                {t("Email")}
                {/* Email */}
              </label>
              <div className="control">
                <input
                  type="email"
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
            <div className="field">
              <label htmlFor="password" className="formLabel">
                Password
              </label>
              {/* <p className="help passwordNote">
                Must be min. 8 characters long, 1 number and 1 symbol
              </p> */}
              <div className="control">
                <input
                  type="password "
                  name="password"
                  id="password"
                  placeholder="secret password"
                  value={formData.password}
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
            <div className="field">
              <div className="control controlCenter">
                <button className="button" onClick={handleSignUp}>
                  Sign Up
                </button>
                <button
                  className="button"
                  type="submit"
                  disabled={status === "submitting"}
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

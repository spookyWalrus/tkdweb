"use client";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/utilities/authContexter";
// import Link from "next/link";
import { validateLogin } from "@/utilities/validateLogin";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";

function Account() {
  const { user, loading, refreshUser } = useAuth();
  const [notify, setNotify] = useState(false);
  // const [inputData, setInputData] = useState(null);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
  });
  const [name, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [errors, setErrors] = useState({ dude: "dude" });
  const [updateStatus, setUpdateStatus] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(null);
  const [updateError, setUpdateError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useSearchParams();
  const message = params.get("message");
  const router = useRouter();
  const captchaRef = useRef();
  const t = useTranslations("Contact");
  const t2 = useTranslations("LoginRegister");

  useEffect(() => {
    if (message === "password_updated") {
      setNotify(true);
    }
  }, [message]);

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata.first_name);
      setLastName(user.user_metadata.last_name);
      setUserEmail(user.email);
      setInputData({
        email: user.email,
        name: user.user_metadata.first_name,
        lastname: user.user_metadata.last_name,
        // belt: user.belt
      });
    }
  }, [user]);

  const goReset = () => {
    router.push("/auth-pages/auth-pwreset");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = async (action) => {
    setErrors({});
    // setStatus("submitting");
    const validationErrors = validateLogin(inputData, t, action);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // setStatus("");
      setUpdateStatus(false);
      // e.target.disabled = false;
      return false;
    }
    return true;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    let actionType;
    setIsSubmitting(true);
    setUpdateError(false);
    setEmailUpdated(false);
    if (inputData.email !== userEmail) {
      actionType = "emailupdate";
    } else if (inputData.name !== name || inputData.lastname !== lastname) {
      actionType = "nameupdate";
    } else {
      setUpdateError(true);
      setErrors({ update: "Nothing to update" });
      setIsSubmitting(false);
      return;
    }
    const isFormValid = await validateForm(actionType);
    if (!isFormValid) {
      setIsSubmitting(false);
      return;
    }

    try {
      if (!captchaRef.current) {
        throw new Error("hCaptcha not initialized");
      }
      const token = await captchaRef.current.execute();
      // const token = "temp-token";

      const formData = new FormData();
      formData.append("email", inputData.email);
      formData.append("name", inputData.name);
      formData.append("lastname", inputData.lastname);
      formData.append("action", actionType);
      formData.append("captcha", token);

      const res = await fetch("/api/dataRecovery", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || `HTTP error! status: ${res.status}`);
      }

      if (result.success == "email_success") {
        setUpdateStatus(true);
        setEmailUpdated(true);
        setIsSubmitting(false);
      }
      if (result.success == "name_updated") {
        setUpdateStatus(true);
        setIsSubmitting(false);
        await refreshUser();
      }
    } catch (error) {
      setUpdateStatus(false);
      setUpdateError(true);
      setIsSubmitting(false);
      setErrors({ update: error.message });
      // console.log("update fail message: ", error);
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    user && (
      <div className="main">
        <div className="mainMargin">
          <div className="centerHeader">
            {/* <h3>{t2("Login.Header")}</h3> */}
            <h3>An-nyeong ha-se-yo, {name}</h3>
          </div>
          <div className="loginBlock">
            <div
              //  onSubmit={submitForm}
              className="contactForm"
            >
              <div className="field">
                <p>
                  {/* <label htmlFor="name" className="formLabel"> */}
                  {/* {t("Name")} */}
                  {t2("SignUp.signUpName")}
                  {/* </label> */}
                </p>
                <div className="control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder={loading ? "Loading..." : name}
                    value={inputData.name || ""}
                    onChange={handleChange}
                    className="placeHolderBold"
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
                {/* <label htmlFor="lastname" className="formLabel"> */}
                <p>{t("LastName")}</p>
                {/* </label> */}
                <div className="control">
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder={loading ? "Loading..." : lastname}
                    value={inputData.lastname || ""}
                    onChange={handleChange}
                    className="placeHolderBold"
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
                <p
                  htmlFor="email"
                  // className="formLabel"
                >
                  {/* {t("Email")} */}
                  Your current email
                </p>

                <div className="control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={loading ? "Loading..." : user.email}
                    value={inputData.email || ""}
                    className="placeHolderBold"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="button updateProfileButton"
                  onClick={updateProfile}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>
                        Update in progress
                        {/* {t2("SignUp.signingUp")} */}
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
                    // t2("SignUp.SignUp")
                    <span>Update my profile</span>
                  )}
                </button>
                {updateStatus && emailUpdated && (
                  <div className="help is-success sentMessage">
                    Confirmation link sent.
                    <br />
                    Please check your email to finalize email update.
                  </div>
                )}
                {updateStatus && !emailUpdated && (
                  <div className="help is-success sentMessage">
                    Profile updated
                  </div>
                )}
                {updateError && (
                  <div className="help is-error sentMessage">
                    {errors.update} Please try again
                  </div>
                )}
              </div>
              <div>
                <button className="button resetPWButton" onClick={goReset}>
                  Change your password
                </button>
                {notify && (
                  <div className="help is-success sentMessage">
                    Password reset successful
                  </div>
                )}
              </div>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_TEST_SITE_KEY}
                size="invisible"
                ref={captchaRef}
                onLoad={() => console.warn("hCaptcha loaded successfully")}
                onError={(error) =>
                  console.warn("hCaptcha failed to load:", error)
                }
                onVerify={(token) => console.warn("hCaptcha verified:", token)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Account;

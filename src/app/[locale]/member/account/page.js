"use client";
import { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/utilities/authContexter";
import { validateLogin } from "@/utilities/validateLogin";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";

function Account() {
  const { user, loading, refreshUser } = useAuth();
  const [notify, setNotify] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
  });
  const [name, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [errors, setErrors] = useState({});

  const [updateStatus, setUpdateStatus] = useState({
    type: null,
    emailData: { oldEmail: "", newEmail: "" },
    pendingEmail: null,
    errorReason: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useSearchParams();
  const message = params.get("message");
  const reason = params.get("reason");
  let pendingEmail;
  const router = useRouter();
  const captchaRef = useRef();
  const t = useTranslations("Contact");
  const t2 = useTranslations("MemberAccount");

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

  useEffect(() => {
    if (!user) return;
    if (message === "password_updated") {
      setNotify(true);
    }
    if (message === "partial_confirm") {
      if (user?.new_email) {
        pendingEmail = user.new_email;
        setUpdateStatus({
          type: "email_partial",
          emailData: { oldEmail: "", newEmail: "" },
          pendingEmail: pendingEmail,
          errorReason: null,
        });
      }
      setIsSubmitting(false);
      window.history.replaceState({}, "", window.location.pathname);
    }
    if (message === "email_both_confirmed") {
      refreshUser();
      setUpdateStatus({
        type: "email_updated",
        emailData: { oldEmail: "", newEmail: "" },
        pendingEmail: null,
        errorReason: null,
      });
      setIsSubmitting(false);
      window.history.replaceState({}, "", window.location.pathname);
    }
    if (message === "email_update_fail") {
      setUpdateStatus({
        type: "error",
        emailData: { oldEmail: "", newEmail: "" },
        pendingEmail: null,
        errorReason: reason,
      });
      setIsSubmitting(false);
      setErrors({ update: reason });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [message, reason, user, refreshUser]);

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
    const validationErrors = validateLogin(inputData, t, action);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setUpdateStatus({
        type: null,
        emailData: { oldEmail: "", newEmail: "" },
        pendingEmail: null,
        errorReason: null,
      });
      return false;
    }
    return true;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    let actionType;
    setIsSubmitting(true);

    setUpdateStatus({
      type: null,
      emailData: { oldEmail: "", newEmail: "" },
      pendingEmail: null,
      errorReason: null,
    });

    if (inputData.email !== userEmail) {
      actionType = "emailupdate";
    } else if (inputData.name !== name || inputData.lastname !== lastname) {
      actionType = "nameupdate";
    } else {
      setUpdateStatus({
        type: "error",
        emailData: { oldEmail: "", newEmail: "" },
        pendingEmail: null,
        errorReason: t2("NothingUpdate"),
      });
      setErrors({ update: t2("NothingUpdate") });
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

      if (!result.success) {
        throw new Error(result.error || `HTTP error! status: ${res.status}`);
      }

      if (result.success == "new_email_requested") {
        setUpdateStatus({
          type: "email_sent",
          emailData: {
            oldEmail: result.oldEmail,
            newEmail: result.newEmail,
          },
          pendingEmail: null,
          errorReason: null,
        });
        setIsSubmitting(false);
      }
      if (result.success == "name_updated") {
        setUpdateStatus({
          type: "profile_updated",
          emailData: { oldEmail: "", newEmail: "" },
          pendingEmail: null,
          errorReason: null,
        });
        setIsSubmitting(false);
        await refreshUser();
      }
    } catch (error) {
      setUpdateStatus({
        type: "error",
        emailData: { oldEmail: "", newEmail: "" },
        pendingEmail: null,
        errorReason: error.message,
      });
      setIsSubmitting(false);
      setErrors({ update: error.message });
      // console.log("update fail message: ", error);
    }
  };
  // Debug logging
  // useEffect(() => {
  //   console.log("Current updateStatus:", updateStatus);
  // }, [updateStatus]);

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
          <div className="accountBlock">
            <div className="contactForm">
              <div className="field">
                <p>{t2("CurrentName")}</p>
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
                <p>{t("LastName")}</p>
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
                <p htmlFor="email">{t2("CurrentEmail")}</p>

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

              <div className="centeralignButton">
                <button
                  type="submit"
                  className="button updateProfileButton"
                  onClick={updateProfile}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span>{t2("UpdateProgress")}</span>
                      <PulseLoader
                        color="blue"
                        loading={isSubmitting}
                        size={10}
                        aria-label="Loading spinner"
                        margin={5}
                      />
                    </>
                  ) : (
                    <span>{t2("UpdateProfile")}</span>
                  )}
                </button>
                <div className="messageContainer">
                  {updateStatus.type === "email_sent" && (
                    <div className="help is-success confirmLinkSent">
                      {t2("ConfirmationSent")}
                      <br />
                      <span
                        style={{ fontSize: "0.9em", color: "rgb(226, 102, 7)" }}
                      >
                        {t2("Email_Sent.SentTo")}
                        <br />
                        {t2("Email_Sent.CurrentMail")}{" "}
                        <span className="theEmail">
                          {updateStatus.emailData.oldEmail}
                        </span>
                        <br />
                        {t2("Email_Sent.NewMail")}{" "}
                        <span className="theEmail">
                          {updateStatus.emailData.newEmail}
                        </span>
                        <br />
                        {t2("Email_Sent.ClickBoth")}
                        <br />
                        {t2("Email_Sent.UntilBoth")}
                      </span>
                    </div>
                  )}

                  {updateStatus.type === "profileUpdated" && (
                    <div className="help is-success sentMessageMed">
                      {/* Profile updated */}
                      {t2("ProfileUpdated")}
                    </div>
                  )}
                  {updateStatus.type === "email_updated" && (
                    <div className="help is-success sentMessageMed">
                      {t2("EmailUpdated")}
                    </div>
                  )}
                  {updateStatus.type === "email_partial" && (
                    <div className="help is-warn emailPartialConfirm">
                      {t2("Email_Partial.Only1")}
                      {/* Confirmation received for only 1 email address. */}
                      <br />
                      {t2("Email_Partial.WaitConfirm")}
                      {/* Waiting confirmation from:{" "}<br/> */}
                      <span className="theEmail">{pendingEmail}</span>
                      <br />
                      {t2("Email_Partial.CheckInbox")}
                      {/* Please check your inbox and click the confirmation link to
                      complete the change. */}
                    </div>
                  )}
                  {updateStatus.type === "error" && (
                    <div className="help is-error sentMessageMed">
                      {errors.update}
                      <br />
                      {t2("UpdateTryAgain")}
                    </div>
                  )}
                </div>
              </div>

              <div className="centeralignButton">
                <button className="button resetPWButton" onClick={goReset}>
                  {t2("ChangePW")}
                </button>
                {notify && (
                  <div className="help is-success sentMessageMed">
                    {t2("PWSuccess")}
                  </div>
                )}
              </div>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_TEST_SITE_KEY}
                // sitekey={process.env.NEXT_PUBLIC_TKD_HCAPTCHA_SITE_KEY}
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

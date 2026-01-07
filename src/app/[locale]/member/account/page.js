"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/utilities/authContexter";
import { validateLogin } from "@/utilities/validateLogin";
import { useSearchParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { PulseLoader } from "react-spinners";
import DismissibleMessage from "@/components/messageBox";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
    errorReason: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useSearchParams();
  const path = usePathname();
  const pathname = path.replace(/^\/[a-z]{2}/, "");
  const message = params.get("message");
  const reason = params.get("reason");
  const nuEmail = params.get("nu");
  const router = useRouter();
  const t = useTranslations("Contact");
  const t2 = useTranslations("MemberAccount");
  const supabase = createClientComponentClient();

  useEffect(() => {
    if (user) {
      setFirstName(user.user_metadata.first_name);
      setLastName(user.user_metadata.last_name);
      setUserEmail(user.email);
      setInputData({
        email: user.email,
        name: user.user_metadata.first_name,
        lastname: user.user_metadata.last_name,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // if (message === "password_updated") {
    //   setNotify(true);
    // }

    // Check if email update is pending confirmation
    const checkEmailStatus = async () => {
      const {
        data: { user: usersuper },
      } = await supabase.auth.getUser();

      if (usersuper && usersuper.new_email) {
        // Email change is pending - awaiting confirmation
        setUpdateStatus({
          type: "email_pending",
          emailData: {
            oldEmail: usersuper.email,
            newEmail: usersuper.new_email,
          },
          errorReason: null,
        });
      } else if (message === "email_confirmed") {
        // Email has been successfully confirmed and updatedq
        await refreshUser();
        setUpdateStatus({
          type: "email_updated",
          emailData: { oldEmail: "", newEmail: "" },
          errorReason: null,
        });
        setIsSubmitting(false);
      }
    };

    // checkEmailStatus();

    if (message === "email_sent") {
      setUpdateStatus({
        type: "email_sent",
        emailData: {
          oldEmail: user?.email || "",
          newEmail: nuEmail || "",
        },
        errorReason: null,
      });
      setIsSubmitting(false);
    } else if (message === "profile_updated") {
      setUpdateStatus({
        type: "profile_updated",
        emailData: { oldEmail: "", newEmail: "" },
        errorReason: null,
      });
      setIsSubmitting(false);
      setNotify(true);
    } else if (message === "email_update_fail") {
      setUpdateStatus({
        type: "error",
        emailData: { oldEmail: "", newEmail: "" },
        errorReason: reason,
      });
      setIsSubmitting(false);
      setErrors({ update: reason });
    } else {
      checkEmailStatus();
    }
  }, [message, reason, user, refreshUser, nuEmail, supabase.auth]);

  const goReset = () => {
    router.push("/auth-pages/auth-pwreset");
  };

  const handleDismiss = () => {
    setUpdateStatus({
      type: null,
      emailData: { oldEmail: "", newEmail: "" },
      errorReason: null,
    });
    setErrors({});
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
      const formData = new FormData();
      formData.append("email", inputData.email);
      formData.append("name", inputData.name);
      formData.append("lastname", inputData.lastname);
      formData.append("action", actionType);

      const res = await fetch("/api/dataRecovery", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error?.message || `HTTP error! status: ${res.status}`
        );
      }

      if (result.success == "new_email_requested") {
        setUpdateStatus({
          type: "email_sent",
          emailData: {
            oldEmail: result.oldEmail,
            newEmail: result.newEmail,
          },
          errorReason: null,
        });
        setIsSubmitting(false);
        router.push(
          `${pathname}?message=email_sent&nu=${encodeURIComponent(result.newEmail)}`,
          { scroll: false }
        );
      }

      if (result.success == "name_updated") {
        setUpdateStatus({
          type: "profile_updated",
          emailData: { oldEmail: "", newEmail: "" },
          errorReason: null,
        });
        setIsSubmitting(false);
        router.push(`?message=profile_updated`, { scroll: false });
        await refreshUser();
      }
    } catch (error) {
      setUpdateStatus({
        type: "error",
        emailData: { oldEmail: "", newEmail: "" },
        errorReason: error.message,
      });
      setInputData((prev) => ({
        ...prev,
        email: userEmail,
      }));
      setIsSubmitting(false);
      setErrors({ update: error.message });
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    user && (
      <div className="main">
        <div className="mainMargin">
          <div className="centerHeader">
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
                    <DismissibleMessage
                      type="success_sent"
                      onDismiss={handleDismiss}
                    >
                      {t2("ConfirmationSent")}
                      <br />
                      <span
                        style={{ fontSize: "0.9em", color: "rgb(226, 102, 7)" }}
                      >
                        {t2("Email_Sent.NewEmailOnly")}
                        <br />
                        <span className="theEmail">
                          {updateStatus.emailData.newEmail}
                        </span>
                        <br />
                        {t2("Email_Sent.CheckInbox")}
                      </span>
                    </DismissibleMessage>
                  )}

                  {updateStatus.type === "email_pending" && (
                    <DismissibleMessage
                      type="warning"
                      onDismiss={handleDismiss}
                    >
                      {t2("Email_Pending.Title")}
                      <br />
                      <span style={{ fontSize: "0.9em" }}>
                        {t2("Email_Pending.NewEmail")}{" "}
                        <span className="theEmail">
                          {updateStatus.emailData.newEmail}
                        </span>
                        <br />
                        {t2("Email_Pending.CheckInbox")}
                      </span>
                    </DismissibleMessage>
                  )}

                  {updateStatus.type === "profile_updated" && (
                    <DismissibleMessage
                      type="success_profile"
                      onDismiss={handleDismiss}
                    >
                      {t2("ProfileUpdated")}
                    </DismissibleMessage>
                  )}

                  {updateStatus.type === "email_updated" && (
                    <DismissibleMessage
                      type="success_email"
                      onDismiss={handleDismiss}
                    >
                      {t2("EmailUpdated")}
                    </DismissibleMessage>
                  )}

                  {updateStatus.type === "error" && (
                    <DismissibleMessage type="error" onDismiss={handleDismiss}>
                      {errors.update}
                      <br />
                      {t2("UpdateTryAgain")}
                    </DismissibleMessage>
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
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Account;

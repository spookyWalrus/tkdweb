"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ConfirmButAuthError() {
  const params = useSearchParams();
  const errorCode = params.get("error_code");
  const [whyError, setWhyError] = useState("");
  const t = useTranslations("LoginRegister.AuthFail");

  useEffect(() => {
    let errorType;
    if (!errorCode) {
      errorType = "";
    } else {
      switch (errorCode) {
        case "expired":
          errorType = t("expired");
          break;
        case "invalid":
          errorType = t("invalid");
          break;
        case "session_lost":
          errorType = t("noSession");
          break;
        case "user_not_found":
          errorType = t("noUser");
          break;
        default:
          errorType = "";
      }
    }

    setWhyError(errorType);
  }, [errorCode, t]);

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>{t("uhoh")}</h3>
          <p>
            {t("SomethingWrong")}
            <br />
            {whyError}
            {/* Something went wrong. */}
            <br />
            <br />
            {t("TryAgain")}
            {/* Please try again. */}
            <br />
            {t("ContactAdm")}
            {/* If issue persists, contact administration. */}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function SignUpConfirm() {
  const route = useRouter();
  const locale = useLocale();
  useEffect(() => {
    const reDirect = () => {
      let memberPage = `/${locale}/member/account`;
      route.replace(memberPage);
    };

    const theTimer = setTimeout(reDirect, 3000);
    return () => {
      clearTimeout(theTimer);
    };
  });

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>
            Sign Up Confirmed!
            <br /> Welcome to Taekwondo academy CCS
            <br /> Redirecting you to your account page...
          </h3>
        </div>
      </div>
    </div>
  );
}

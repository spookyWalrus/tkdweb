"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignUpConfirm() {
  const route = useRouter();
  const locale = useLocale();
  const supabase = createClientComponentClient();
  const t = useTranslations("LoginRegister.SignUpSuccess");

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 10;
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        let memberPage = `/${locale}/member/account`;
        route.replace(memberPage);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkSession, 500);
      } else {
        route.replace(`/${locale}/login?message=session_error`);
      }
    };

    const theTimer = setTimeout(checkSession, 1000);

    return () => {
      clearTimeout(theTimer);
    };
  }, [route, locale, supabase]);

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h3>
            {t("Confirmed")}
            <br />
            {t("Welcome")}
            <br />
            t({"Redirect"})
          </h3>
        </div>
      </div>
    </div>
  );
}

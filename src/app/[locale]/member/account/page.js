"use client";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/utilities/authContexter";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function Account() {
  const { user, loading } = useAuth();
  const [notify, setNotify] = useState(false);
  const firstname = user.user_metadata.first_name;
  const lastname = user.user_metadata.last_name;
  const params = useSearchParams();
  const message = params.get("message");
  const router = useRouter();

  useEffect(() => {
    if (message === "password_updated") {
      setNotify(true);
    }
  }, [message]);

  const goReset = () => {
    router.push("/auth-pages/auth-pwreset");
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
          <h3>An-nyeong ha-se-yo, {firstname}</h3>
        </div>
        <div>
          <button className="button" onClick={goReset}>
            Change your password
          </button>
          {notify && (
            <div className="help is-success">Password reset successfully</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;

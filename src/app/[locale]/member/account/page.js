"use client";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useRouter } from "next/navigation";
import { useAuth } from "@/utilities/authContexter";

function Account() {
  const { user, loading } = useAuth();
  const firstname = user.user_metadata.first_name;
  const lastname = user.user_metadata.last_name;

  if (loading) {
    return <div>... Loading</div>;
  }

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
          <h3>Hello, {firstname}</h3>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Account;

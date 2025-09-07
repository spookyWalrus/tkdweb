"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function Account() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.setItem("manualLogout", "true");
      router.push("/login");
    }
  };

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          {/* <h3>{t2("Login.Header")}</h3> */}
          <h3>Member Account</h3>
        </div>
        <div>
          <button className="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;

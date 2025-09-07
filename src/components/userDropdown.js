"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export function UserDropdown() {
  const [isActive, setIsActive] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const menuRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.setItem("manualLogout", "true");
      router.push("/login");
    }
  };

  // useEffect(() => {
  //   if (isActive) {
  //     const handleClickOutside = (evt) => {
  //       if (menuRef.current && !menuRef.current.contains(evt.target)) {
  //         setIsActive(false);
  //       }
  //     };

  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   }
  // }, [isActive]);

  return (
    <div
      ref={menuRef}
      className={`dropdown custom-dropdown is-right ${isActive && "is-active"}`}
      // id="custom-userdrop"
    >
      <div className="dropdown-trigger">
        <a className="menuLang" aria-haspopup="true" onClick={toggleDropdown}>
          {/* <span>user name</span> */}

          <span className="icon">
            {/* <i className="fas fa-angle-down" aria-hidden="true"></i> */}
            <FontAwesomeIcon icon={faCircleUser} />
          </span>
        </a>
      </div>
      <div className="dropdown-menu custom-dropdown-menu" role="menu">
        <div className="customDropDownContent">
          <a
            href="/member/account"
            className="customDropDownMenuItem dropdown-item"
          >
            User account
          </a>
          <hr className="dropdown-divider divider" />
          <a
            href="#"
            className="customDropDownMenuItem dropdown-item"
            onClick={handleSignOut}
          >
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
}

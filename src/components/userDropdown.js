"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "../i18n/navigation";
import PropTypes from "prop-types";
import { Link } from "../i18n/navigation";

export function UserDropdown({ data }) {
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [userName, setUserName] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();
  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    if (data) {
      const first = data?.user_metadata?.first_name || "";
      const last = data?.user_metadata?.last_name || "";
      setFirst(first);
      setLast(last);
      setUserName(`${first} ${last}`.trim());
    }
  }, [data]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handleSignOut = async () => {
    try {
      localStorage.setItem("manualLogout", "true");

      const { error } = await supabase.auth.signOut();
      if (error) {
        localStorage.removeItem("manualLogout");
        return;
      }
      window.location.href = "/login";
    } catch (err) {
      localStorage.removeItem("manualLogout");
      router.replace("/login");
    }
  };

  useEffect(() => {
    if (!isMounted || !isActive) return;

    const handleClickOutside = (evt) => {
      if (menuRef.current && !menuRef.current.contains(evt.target)) {
        setIsActive(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isActive, isMounted]);

  return (
    <div
      ref={isMounted ? menuRef : null}
      className={`dropdown custom-dropdown is-right ${isActive && "is-active"}`}
    >
      <div className="dropdown-trigger">
        <a
          className="menuLang"
          aria-haspopup="true"
          onClick={isMounted ? toggleDropdown : undefined}
          role="button"
          tabIndex={0}
        >
          {userName}
          <span className="icon">
            <FontAwesomeIcon icon={faCircleUser} />
          </span>
        </a>
      </div>
      {isMounted && (
        <div className="dropdown-menu custom-dropdown-menu" role="menu">
          <div className="customDropDownContent">
            <Link
              href="/member/account"
              className="customDropDownMenuItem dropdown-item"
              onClick={() => setIsActive(false)}
            >
              User account
            </Link>
            <hr className="dropdown-divider divider" />
            <Link
              href="#"
              className="customDropDownMenuItem dropdown-item"
              onClick={handleSignOut}
            >
              Log Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

UserDropdown.propTypes = {
  data: PropTypes.shape({
    user_metadata: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
    }),
  }),
};

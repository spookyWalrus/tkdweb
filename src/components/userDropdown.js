"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { getPathname, usePathname } from "../i18n/navigation";
import { Link } from "../i18n/navigation";

export function UserDropdown() {
  const [isActive, setIsActive] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const menuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handleSignOut = async () => {
    try {
      localStorage.setItem("manualLogout", "true");

      const { error } = await supabase.auth.signOut();
      if (!error) {
        localStorage.setItem("manualLogout", "true");
        return;
      }
      router.push("/member");
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

    // Add event listener with a small delay to avoid immediate closure
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

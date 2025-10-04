import { useRouter, usePathname } from "../i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();
  const menuRef = useRef(null);
  const searchParams = useSearchParams();
  // console.log("params are: ", searchParams);

  const [isActive2, setIsActive2] = useState(false);

  let menuLang = currentLang == "fr" ? "EN" : "FRA";

  const langSetter = (lang) => {
    setIsActive2(false);
    router.push(pathname, { locale: lang });
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsActive2(!isActive2);
  };

  useEffect(() => {
    if (!isActive2) return;

    const handleClickOutside = (evt) => {
      if (menuRef.current && !menuRef.current.contains(evt.target)) {
        setIsActive2(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isActive2]);

  return (
    <div
      ref={menuRef}
      className={`dropdown custom-dropdown  ${isActive2 ? "is-active" : ""}`}
    >
      <div className="dropdown-trigger">
        <a className="menuLang" aria-haspopup="true" onClick={toggleDropdown}>
          <span>{menuLang}</span>
        </a>
      </div>
      <div className="dropdown-menu lang-dropdown-menu" role="menu">
        <a
          className="dropdown-item langCustomDropDownMenuItem"
          onClick={(e) => {
            e.preventDefault();
            langSetter("en");
          }}
        >
          <span className="icon-text">
            <span
              className="icon"
              style={{
                width: "1em",
                visibility: currentLang === "en" ? "visible" : "hidden",
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span>ENG</span>
          </span>
        </a>
        <a
          className="dropdown-item langCustomDropDownMenuItem"
          onClick={(e) => {
            e.preventDefault();
            langSetter("fr");
          }}
        >
          <span className="icon-text">
            <span
              className="icon"
              style={{
                width: "1em",
                visibility: currentLang === "fr" ? "visible" : "hidden",
              }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span>FRA</span>
          </span>
        </a>
      </div>
    </div>
  );
}

import { useRouter, usePathname } from "../i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();
  const [isActive, setIsActive] = useState(false);

  let menuLang = currentLang == "fr" ? "EN" : "FRA";

  useEffect(() => {
    const handler = (e) => {
      if (!e || !e.target) return;

      const dropdown = document.getElementById("custom-dropdown");
      if (dropdown && !dropdown.contains(e.target)) {
        setIsActive(false);
      }
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  const langSetter = (lang) => {
    setIsActive(false);
    router.push(pathname, { locale: lang });
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <div
      className={`dropdown custom-dropdown  ${isActive ? "is-active" : ""}`}
      // id="custom-dropdown"
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

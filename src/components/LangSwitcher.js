"use client";
import { useRouter, usePathname } from "../i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();

  const triggerRef = useRef(null);
  const portalMenuRef = useRef(null);

  const params = useSearchParams();
  const [isActive2, setIsActive2] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let menuLang = currentLang === "fr" ? "EN" : "FRA";

  const langSetter = (lang) => {
    setIsActive2(false);
    const searchString = params.toString();
    const fullPath = searchString ? `${pathname}?${searchString}` : pathname;
    router.push(fullPath, { locale: lang });
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isActive2 && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX,
      });
    }
    setIsActive2((prev) => !prev);
  };

  useEffect(() => {
    if (!isActive2) return;

    const handleClickOutside = (evt) => {
      const isClickInsideTrigger =
        triggerRef.current && triggerRef.current.contains(evt.target);
      const isClickInsideMenu =
        portalMenuRef.current && portalMenuRef.current.contains(evt.target);

      if (!isClickInsideTrigger && !isClickInsideMenu) {
        setIsActive2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive2]);

  return (
    <div className="dropdown custom-dropdown">
      <div className="dropdown-trigger" ref={triggerRef}>
        <a
          className="menuLang"
          aria-haspopup="true"
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
        >
          <span>{menuLang}</span>
        </a>
      </div>

      {isActive2 &&
        mounted &&
        createPortal(
          <div
            ref={portalMenuRef}
            className="dropdown-menu lang-dropdown-menu"
            role="menu"
            style={{
              display: "block",
              position: "absolute",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              transform: "translateX(-100%)",
              zIndex: 99999,
            }}
          >
            <div className="dropdown-content customDropDownContent">
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
          </div>,
          document.body
        )}
    </div>
  );
}

"use client";
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "../i18n/navigation";
import LangSwitcher from "./LangSwitcher";
import { useIntersection } from "@/utilities/intersectionContext";
import { useAuth } from "@/utilities/authContexter";
import { UserDropdown } from "@/components/userDropdown";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { showButton } = useIntersection();
  const { user, loading } = useAuth();
  const [showJoin, setShowJoin] = useState(true);
  let pathname = usePathname();

  const t = useTranslations("Navbar");
  const t2 = useTranslations("LoginRegister");

  const loginMessage = t2("Login.Login");

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  useEffect(() => {
    setNavOpen(false);

    const dropdowns = document.querySelectorAll(".navbar-item.has-dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-active");
    });
    const hoverableDropdowns = document.querySelectorAll(
      ".navbar-item.has-dropdown.is-hoverable"
    );
    hoverableDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("is-hoverable");

      const dropdownMenu = dropdown.querySelector(".navbar-dropdown");
      if (dropdownMenu) {
        dropdownMenu.style.display = "none";
      }

      setTimeout(() => {
        dropdown.classList.add("is-hoverable");
        if (dropdownMenu) {
          dropdownMenu.style.display = "";
        }
      }, 100);
    });
  }, [pathname]);

  const { authStatus, shouldShowJoin } = useMemo(() => {
    const isHomePage = pathname === "/" || pathname.match(/^\/[a-z]{2}$/);
    let authComponent = null;
    if (loading) {
      authComponent = "Loading...";
    } else if (user) {
      authComponent = <UserDropdown data={user} />;
    } else if (pathname !== "/login") {
      authComponent = (
        <Link href="/login" className="topBarLinks">
          {loginMessage}
        </Link>
      );
    }

    const shouldShow =
      !user &&
      !loading &&
      !pathname.includes("/login") &&
      !pathname.includes("/signup") &&
      (isHomePage ? showButton : true);

    return {
      authStatus: authComponent,
      shouldShowJoin: shouldShow,
    };
  }, [loginMessage, loading, user, pathname, showButton]);

  useEffect(() => {
    if (user || pathname == "/login" || pathname == "/signup") {
      setShowJoin(false);
    } else {
      setShowJoin(true);
    }
  }, [pathname, user]);

  return (
    <div className="header">
      <div className="topBar">
        <LangSwitcher />
        {authStatus}
      </div>
      <div className="navbar-section">
        <div className="brandTitleBar">
          <div className="titleBox">
            <p className="brandTitleBarLeft">{t("Page Title Left")}</p>
            <h3 className="brandTitleBarLeftMobile">Taekwondo</h3>
          </div>
          <div className="fakeLogo"> </div>
          <div className="titleBox2">
            <p className="brandTitleBarRight">{t("Page Title Right")}</p>
            <h3 className="brandTitleBarRightMobile">Christien Sourdif</h3>
          </div>
        </div>
        <nav
          className="navbar is-fixed-top"
          role="navigation"
          aria-label="dropdown navigation"
        >
          <div className="navbar-brand">
            <a href="/">
              <Image
                className="navbar-logo"
                src="/logos/tkdBasic-web.png"
                alt="Logo"
                width="100"
                height="100"
              />
            </a>
            <a
              role="button"
              className={`navbar-burger ${navOpen ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded={navOpen ? "true" : "false"}
              data-target="navbarBasicExample"
              onClick={toggleMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbarBasicExample"
            className={`navbar-menu ${navOpen ? "is-active" : ""}`}
          >
            <div className="navbar-container">
              <div className="navbar-start navbar-links-left">
                <div className="navbar-item has-dropdown is-hoverable">
                  <div className="navbar-link">{t("About Us.Head")}</div>
                  <div className="navbar-dropdown">
                    <Link href="/" className="navbar-item">
                      {t("About Us.TheClub")}
                    </Link>
                    <Link href="/instructors" className="navbar-item">
                      {t("About Us.Instructors")}
                    </Link>
                  </div>
                </div>
                <div className="navbar-item has-dropdown is-hoverable shortlist">
                  <a className="navbar-link">{t("Courses.Head")}</a>
                  <div className="navbar-dropdown">
                    <Link href="/course" className="navbar-item">
                      {t("Courses.ClassesPricing")}
                    </Link>
                    <Link href="/conduct" className="navbar-item">
                      {t("Courses.Conduct")}
                    </Link>
                    <Link href="#" className="navbar-item wraptext">
                      {t("Courses.News")}
                      {/* News */}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="navbar-center">
                <Link href="/">
                  <Image
                    className="navbar-center-logo"
                    src="/logos/tkdBasic-web.png"
                    alt="Logo"
                    width="100"
                    height="100"
                  />
                </Link>
              </div>

              <div className="navbar-end navbar-links-right">
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">{t("About Taekwondo.Head")}</a>
                  <div className="navbar-dropdown">
                    <Link href="/history" className="navbar-item">
                      {t("About Taekwondo.Item 1")}
                    </Link>
                    <Link href="/philosophy" className="navbar-item">
                      {t("About Taekwondo.Item 2")}
                    </Link>
                    <Link href="/vocab" className="navbar-item">
                      {t("About Taekwondo.Item 3")}
                    </Link>
                  </div>
                </div>
                <Link href="/contact" className="navbar-item">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {shouldShowJoin && (
          <div className="signup-button-container">
            {showJoin && (
              <Link href="/signup" className="button signup-button">
                {t2("SignUp.SignUp")}
                {/* Join Us */}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

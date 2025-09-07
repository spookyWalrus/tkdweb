"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { getPathname, usePathname } from "../i18n/navigation";
import LangSwitcher from "./LangSwitcher";
import { useIntersection } from "@/utilities/intersectionContext";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const { showButton } = useIntersection();

  const t = useTranslations("Navbar");
  const t2 = useTranslations("HeroBlock");

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  let pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <div className="header">
      <div className="topBar">
        <LangSwitcher />
        {/* <Link href="/" className="topBarLinks">
          {t("Login")}
        </Link> */}
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
        {showButton && (
          <div className="signup-button-container">
            {pathname != "/signup" ? (
              <Link href="/signup" className="button signup-button">
                {t2("JoinUs")}
              </Link>
            ) : (
              <div>no signups</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

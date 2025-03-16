"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LangSwitcher from "./LangSwitcher";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const t = useTranslations("Navbar");

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div>
      <div className="topBar">
        <LangSwitcher />
        {/* <Link href="/" className="topBarLinks">
          EN
        </Link> */}
        <Link href="/" className="topBarLinks">
          {t("Login")}
        </Link>
      </div>
      <div className="brandTitleBar">
        <h3 className="brandTitleBarLeft">{t("Page Title Left")}</h3>
        <h3 className="brandTitleBarLeftMobile">TKD</h3>
        <div className="fakeLogo"></div>
        <h3 className="brandTitleBarRight">{t("Page Title Right")}</h3>
        <h3 className="brandTitleBarRightMobile">CCS</h3>
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
                    {t("About Us.Item 1")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("About Us.Item 2")}
                  </Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">{t("Courses.Head")}</a>
                <div className="navbar-dropdown">
                  <Link href="/" className="navbar-item">
                    {t("Courses.Item 1")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("Courses.Item 2")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("Courses.Item 3")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("Courses.Item 4")}
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
                  <Link href="/" className="navbar-item">
                    {t("About Taekwondo.Item 1")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("About Taekwondo.Item 2")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("About Taekwondo.Item 3")}
                  </Link>
                  <Link href="/" className="navbar-item">
                    {t("About Taekwondo.Item 4")}
                  </Link>
                </div>
              </div>
              <Link href="/" className="navbar-item">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

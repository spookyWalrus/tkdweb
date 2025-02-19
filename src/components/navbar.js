"use client";
import { useState } from "react";
import LanguageSwitcher from "@/components/languageSwitcher";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [dropDown, setDropDown] = useState(true);

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div>
      <div className="topBar">
        {/* <LanguageSwitcher /> */}
        <Link href="/" className="topBarLinks">
          EN
        </Link>
        <Link href="/" className="topBarLinks">
          Login
        </Link>
      </div>
      <div className="brandTitleBar">
        <h3 className="brandTitleBarLeft">Academie Taekwondo</h3>
        <h3 className="brandTitleBarLeftMobile">TKD</h3>
        <div className="fakeLogo"></div>
        <h3 className="brandTitleBarRight">Club Christian Sourdif</h3>
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
                <div className="navbar-link">About us</div>
                <div className="navbar-dropdown">
                  <Link href="/" className="navbar-item">
                    Club history
                  </Link>
                  <Link href="/" className="navbar-item">
                    Our instructors
                  </Link>
                </div>
              </div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">Courses</a>
                <div className="navbar-dropdown">
                  <Link href="/" className="navbar-item">
                    Adult course
                  </Link>
                  <Link href="/" className="navbar-item">
                    Kids course
                  </Link>
                  <Link href="/" className="navbar-item">
                    Schedule/ Calendar
                  </Link>
                  <Link href="/" className="navbar-item">
                    Current news/events
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
                <a className="navbar-link">About Taekwondo</a>
                <div className="navbar-dropdown">
                  <Link href="/" className="navbar-item">
                    History of Taekwondo
                  </Link>
                  <Link href="/" className="navbar-item">
                    Principles of Taekwondo
                  </Link>
                  <Link href="/" className="navbar-item">
                    Class conduct
                  </Link>
                  <Link href="/" className="navbar-item">
                    Vocabulary / glossary
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

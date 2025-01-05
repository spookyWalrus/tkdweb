"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [dropDown, setDropDown] = useState(true);

  const toggleMenu = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav
      className="navbar is-fixed-top --bulma-primary-soft"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="/" className="navbar-logo">
          <Image
            src="/vercel.svg"
            alt="Logo"
            width="112"
            height="28"
            className="logo"
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
          <div className="navbar-links-left navbar-start">
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link">About us</div>
              <div className="navbar-dropdown">
                <Link href="/" className="navbar-item navbar-item-link">
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
                src="/logos/rawdon-Rsymbol-colorNu.svg"
                alt="Logo"
                width="30"
                height="30"
              />
            </Link>
          </div>

          <div className="navbar-links-right navbar-end">
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
            <div className="navbar-item-last">
              <Link href="/" className="navbar-login navbar-item">
                Members
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

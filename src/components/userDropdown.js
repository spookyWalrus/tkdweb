"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function UserDropdown() {
  const [isActive, setIsActive] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  return (
    <div
      className={`dropdown custom-dropdown is-right ${isActive && "is-active"}`}
      // id="custom-userdrop"
    >
      <div className="dropdown-trigger">
        <a className="menuLang" aria-haspopup="true" onClick={toggleDropdown}>
          {/* <span>user name</span> */}

          <span className="icon">
            {/* <i className="fas fa-angle-down" aria-hidden="true"></i> */}
            <FontAwesomeIcon icon={faCircleUser} />
          </span>
        </a>
      </div>
      <div className="dropdown-menu custom-dropdown-menu" role="menu">
        <div className="customDropDownContent">
          <a
            href="/member/account"
            className="customDropDownMenuItem dropdown-item"
          >
            User account
          </a>
          <hr className="dropdown-divider divider" />
          <a href="#" className="customDropDownMenuItem dropdown-item">
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
}

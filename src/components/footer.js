import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer grid customFooter">
      <div className="cell">
        <h6>Academie Taekwondo</h6>
        <h6>Club Christian Sourdif</h6>
      </div>
      <div className="cell">
        <h6>Phone: 450-834-1234</h6>
        <h6>
          <Link href="mailto:ccstkd@gmail.com">ccstkd@gmail.com</Link>
        </h6>
      </div>
      <Image
        className="footerIcons cell"
        src="/logos/Facebook_icon.svg"
        alt="RawdonLogo"
        width={50}
        height={50}
      />
      <Image
        className="footerIcons cell"
        src="/logos/rawdon-Rsymbol-colorNu.svg"
        alt="RawdonLogo"
        width={50}
        height={50}
      />
      <div className="cell is-col-span-4 copyRight">
        <h6>© 2025 TKD CCS</h6>
        <h6>Developed by Zen Nakamura</h6>
      </div>
    </footer>
  );
};

export default Footer;

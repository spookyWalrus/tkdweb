import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer grid customFooter">
      <div className="cell">
        <h4>Academie Taekwondo</h4>
        <h4>Club Christian Sourdif</h4>
      </div>
      <div className="cell">
        <h4>Phone: 450-834-1234</h4>
        <h4>
          <Link href="mailto:ccstkd@gmail.com">ccstkd@gmail.com</Link>
        </h4>
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
        <h4>© 2025 TKD CCS</h4>
        <h4>Developed by Zen Nakamura</h4>
      </div>
    </footer>
  );
};

export default Footer;

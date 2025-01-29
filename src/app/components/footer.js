import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer grid">
      <div className="cell">
        <h3>Academie Taekwondo</h3>
        <h3>Club Christian Sourdif</h3>
      </div>
      <div className="cell">
        <h3>Phone: 450-834-1234</h3>
        <h3>
          <Link href="mailto:ccstkd@gmail.com">ccstkd@gmail.com</Link>
        </h3>
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
        <h3>© 2025 TKD CCS</h3>
        <h3>Developed by Zen Nakamura</h3>
      </div>
    </footer>
  );
};

export default Footer;

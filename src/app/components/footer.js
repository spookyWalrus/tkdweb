import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerLeft">
        <h3>Academie Taekwondo</h3>
        <h3>Club Christian Sourdif</h3>
        <h3>Rawdon, Quebec</h3>
      </div>
      <div>
        <Image
          className="rawdonIcon"
          src="/logos/rawdon-Rsymbol-colorNu.svg"
          alt="RawdonLogo"
          width={50}
          height={50}
        />
      </div>
      <div className="footerCenter">
        <h1>© 2025</h1>
        <h1>Academie Taekwondo</h1>
        <h1>Club Christian Sourdif</h1>
      </div>
      <div>
        <Image
          className="facebookIcon"
          src="/logos/Facebook_icon.svg"
          alt="RawdonLogo"
          width={50}
          height={50}
        />
      </div>
      <div className="footerRight">
        <h1>Phone: 450-834-1234</h1>
        <h1>
          Email:
          <Link href="mailto:ccstkd@gmail.com">ccstkd@gmail.com</Link>
        </h1>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Navbar");

  return (
    <footer>
      <div className="footerContainer">
        <div className="footerInfo">
          <h6>{t("Page Title Left")}</h6>
          <h6>{t("Page Title Right")}</h6>
          <br />
          <p>(450) 834-1234</p>
          <p>
            <Link href="mailto:ccstkdrawdon@gmail.com">ccstkd@gmail.com</Link>
          </p>
        </div>
        <div className="footerLinks">
          <div>
            <Link href="/instructors">{t("About Us.TheClub")}</Link>
          </div>
          <div>
            <Link href="/instructors">{t("About Us.Instructors")}</Link>
          </div>
          <div>
            <Link href="/course">{t("Courses.ClassesPricing")}</Link>
          </div>
          <div>
            <Link href="/conduct">{t("Courses.Conduct")}</Link>
          </div>
        </div>
        <div className="footerLinks">
          <div>
            <Link href="/history">{t("About Taekwondo.Item 1")}</Link>
          </div>
          <div>
            <Link href="/philosophy">{t("About Taekwondo.Item 2")}</Link>
          </div>
          <div>
            <Link href="/vocab">{t("About Taekwondo.Item 3")}</Link>
          </div>
          <div>
            <Link href="/contact"> {t("Contact")}</Link>
          </div>
        </div>
        <div className="footerIcons">
          <Link
            href="https://www.facebook.com/groups/829367239393546"
            className="theIcons"
          >
            <Image
              className="footerIcons cell"
              src="/logos/facebook-wt.svg"
              alt="FBLogo"
              width={50}
              height={50}
            />
          </Link>
          <Link href="https://rawdon.ca" className="theIcons">
            <Image
              className="footerIcons cell"
              src="/logos/rawdon-Rsymbol-colorNu.svg"
              alt="RawdonLogo"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
      <div className="is-col-span-4 copyRight">
        <p>© 2025 TKD CCS</p>
        <p>Developed by Zen Nakamura</p>
      </div>

      {/* <div className="content grid customFooter">
        <div className="cell footerInfo">
          <h6>Academie de Taekwondo</h6>
          <h6>Club Christian Sourdif</h6>
          <br />
          <h6>(450) 834-1234</h6>
          <h6>
            <Link className="footerInfo" href="mailto:ccstkd@gmail.com">
              ccstkd@gmail.com
            </Link>
          </h6>
        </div>
        <div className="cell footerLinks">
          <div>
            <Link href="/instructors">Instructors</Link>
          </div>
          <div>
            <Link href="/courses">Course</Link>
          </div>
          <div>
            <Link href="/conduct">Conduct</Link>
          </div>
        </div>
        <div className="cell footerLinks">
          <div>
            <Link href="/history" className="footerLinks">
              History
            </Link>
          </div>
          <div>
            <Link href="/philosophy">Philosophy</Link>
          </div>
          <div>
            <Link href="/vocab">Vocabulary</Link>
          </div>
          <div>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="cell cellInline">
          <Link href="tkdfacebook.com">
            <Image
              className="footerIcons cell"
              src="/logos/facebook-wt.svg"
              alt="FBLogo"
              width={50}
              height={50}
            />
          </Link>
          <Link href="rawdonmunc.com">
            <Image
              className="footerIcons cell"
              src="/logos/rawdon-Rsymbol-colorNu.svg"
              alt="RawdonLogo"
              width={50}
              height={50}
            />
          </Link>
        </div>
        <div className="cell is-col-span-4 copyRight">
          <p>© 2025 TKD CCS</p>
          <p>Developed by Zen Nakamura</p>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;

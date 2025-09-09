"use client";
import { useTranslations } from "next-intl";
import TwoCardLeft from "../../components/two-card-left";
import { useIntersection } from "@/utilities/intersectionContext";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HeroBlock");
  const t2 = useTranslations("AboutBlock");
  const { heroRef } = useIntersection();
  const heroStyle = {
    "--hero-bg": "url(/images/tkd-Heroback5.png)",
  };

  return (
    <main className="main">
      <div className="HeroBlock" id="hero" ref={heroRef} style={heroStyle}>
        <div className="HeroTitles">
          <h1 className="HeroHeader">{t("HeroHeader")}</h1>
          <div className="HeroSubHeader">
            <h2>{t("HeroSubHeader")}</h2>
            <Link href="/signup" className="button joinus">
              {t("JoinUs")}
            </Link>
          </div>
          <div className="filler"> </div>
        </div>
      </div>

      <div className="mainMargin">
        <TwoCardLeft
          imageSrc="/images/kyoExam.jpg"
          altText="exam"
          heading={t2("AboutHeader")}
          body={<p>{t2("AboutBody")}</p>}
        />
      </div>
    </main>
  );
}

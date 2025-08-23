"use client";
import { useTranslations } from "next-intl";
import TwoCardLeft from "../../components/two-card-left";
import { useIntersection } from "@/utilities/intersectionContext";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HeroBlock");
  const t2 = useTranslations("AboutBlock");
  const { heroRef } = useIntersection();

  return (
    <main className="main">
      <div className="HeroBlock" id="hero" ref={heroRef}>
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

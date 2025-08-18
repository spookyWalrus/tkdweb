"use client";
import { useTranslations } from "next-intl";
import styles from "./styles/homepage.module.scss";
import TwoCardLeft from "../../components/two-card-left";
import { useIntersection } from "@/utilities/intersectionContext";

export default function Home() {
  const t = useTranslations("HeroBlock");
  const t2 = useTranslations("AboutBlock");
  const { heroRef } = useIntersection();

  return (
    <main className="main">
      <div className={styles.HeroBlock} id="hero" ref={heroRef}>
        {/* <div className={styles.HeroBlockImage}>TKD image</div> */}
        <div className={styles.HeroTitles}>
          <h1 className={styles.HeroHeader}>{t("HeroHeader")}</h1>
          <div className={styles.HeroSubHeader}>
            <h2>{t("HeroSubHeader")}</h2>
            <a className={`button ${styles.joinus}`}>{t("JoinUs")}</a>
          </div>
          <div className={styles.filler}> </div>
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

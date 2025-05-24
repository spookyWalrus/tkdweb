import { useTranslations } from "next-intl";
import styles from "./styles/homepage.module.scss";
import TwoCardLeft from "../../components/two-card-left";

export default function Home() {
  const t = useTranslations("HeroBlock");
  const t2 = useTranslations("AboutBlock");

  return (
    <main className="main">
      <div className={styles.HeroBlock}>
        <div className={styles.HeroTitles}>
          <h1 className={styles.HeroHeader}>{t("HeroHeader")}</h1>
          <div className={styles.HeroSubHeader}>
            <h2>{t("HeroSubHeader")}</h2>
            <a className={`button ${styles.joinus}`}>Join us!</a>
          </div>
          <div className={styles.filler}> </div>
        </div>
      </div>

      <div className="mainMargin">
        <TwoCardLeft
          imageSrc="/images/kyoExam1.jpg"
          altText="exam"
          heading={t2("AboutHeader")}
          body={<p>{t2("AboutBody")}</p>}
          // imgWidth="1000"
          // imgHeight="1000"
        />
      </div>
    </main>
  );
}

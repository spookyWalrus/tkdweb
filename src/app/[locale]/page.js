import { useTranslations } from "next-intl";
import styles from "./styles/homepage.module.scss";
import TwoCard from "../../components/two-card";

export default function Home() {
  const t = useTranslations("HeroBlock");
  const t2 = useTranslations("AboutBlock");

  return (
    <main className="main">
      <div className={styles.HeroBlock}>
        <div className={styles.HeroHeader}>
          <h1>
            <strong>{t("HeroHeader")}</strong>
          </h1>
          <h2 className={styles.HeroSubHeader}>{t("HeroSubHeader")}</h2>
        </div>
      </div>

      <div className="twoCardMargin">
        <TwoCard
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

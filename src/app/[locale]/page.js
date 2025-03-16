import { useTranslations, useLocale } from "next-intl";
import styles from "./styles/homepage.module.scss";
import TwoCard from "../../components/two-card";

export default function Home() {
  const t = useTranslations("HeroBlock");

  return (
    <main className={styles.main}>
      <div className={styles.HeroBlock}>
        <div className={styles.HeroHeader}>
          <h1>
            <strong>{t("HeroHeader")}</strong>
          </h1>
          <h2 className={styles.HeroSubHeader}>{t("HeroSubHeader")}</h2>
        </div>
      </div>

      <div className={styles.AboutBlock}>
        <TwoCard />
      </div>
    </main>
  );
}

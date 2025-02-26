"use client";
import { useTranslation } from "react-i18next";
import styles from "../styles/page.module.scss";
// import Image from "next/image";
// import TwoCard from "./components/two-card";

export default function Home() {
  const { t } = useTranslation("Hero Block");

  return (
    <main className={styles.main}>
      <div className={styles.HeroBlock}>
        <div className={styles.HeroHeader}>
          <h1>
            <strong>{t("Hero Header")}</strong>
          </h1>
          <h2 className={styles.HeroSubHeader}>{t("Hero SubHeader")}</h2>
        </div>
      </div>

      <div className={styles.AboutBlock}>{/* <TwoCard /> */}</div>
    </main>
  );
}

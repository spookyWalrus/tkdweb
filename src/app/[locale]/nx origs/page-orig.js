// import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import styles from "../styles/page.module.scss";
// import Image from "next/image";
import initTranslations from "@/i18n";
import TranslationProvider from "@/TranslationProvider";
// import TwoCard from "./components/two-card";

export default async function Home({ params: { locale } }) {
  const theSpace = ["Hero Block"];
  const lang = locale.locale;
  // console.log("locale raw: ", locale);
  // console.log("locale is: ", lang);
  const { t, resources } = await initTranslations(lang, theSpace);

  return (
    <TranslationProvider
      locale={lang}
      namespaces={theSpace}
      resources={resources}
    >
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
    </TranslationProvider>
  );
}

Home.propTypes = {
  params: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

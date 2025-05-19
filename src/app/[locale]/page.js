import { useTranslations } from "next-intl";
import styles from "./styles/homepage.module.scss";
import TwoCard from "../../components/two-card";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HeroBlock");
  const t2 = useTranslations("AboutBlock");

  return (
    <main className="main">
      <div className={styles.HeroBlock}>
        {/* <Image src="/images/tkd-wallblack.jpg" width="1000" height="100" /> */}
        <div className={styles.HeroHeader}>
          <h1>
            <strong>{t("HeroHeader")}</strong>
          </h1>
          {/* </div> */}
          {/* <div className={styles.HeroSubHeader}> */}
          <h2 className={styles.HeroSubHeader}>{t("HeroSubHeader")}</h2>
        </div>
      </div>

      <div className="mainMargin">
        <TwoCard
          imageSrc="/images/kyoExam1.jpg"
          altText="exam"
          heading={t2("AboutHeader")}
          body={<p>{t2("AboutBody")}</p>}
          imgWidth="1000"
          imgHeight="1000"
        />
      </div>
    </main>
  );
}

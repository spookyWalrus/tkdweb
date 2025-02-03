import styles from "./styles/page.module.scss";
import Image from "next/image";
import TwoCard from "./components/two-card";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.HeroBlock}>
        <div className={styles.HeroHeader}>
          <h1>
            <strong>Cultivate An Indomitable Spirit</strong>
          </h1>
          <h2 className={styles.HeroSubHeader}>
            We are dedicated to help you learn, develop and refine all aspects
            of Taekwondo.
          </h2>
        </div>
      </div>

      <div className={styles.AboutBlock}>
        <TwoCard />
      </div>
    </main>
  );
}

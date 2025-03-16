import Image from "next/image";
import { useTranslations } from "next-intl";
import "../app/[locale]/styles/partials/two-card.scss";

export default function TwoCard() {
  const t = useTranslations("AboutBlock");

  return (
    <div className="twoCard">
      <div className="cardImage">
        <Image
          src="/images/kyoExam1.jpg"
          alt="exam"
          width="1000"
          height="1000"
        />
      </div>
      <div className="card-text">
        <h3>{t("AboutHeader")}</h3>
        <p>{t("AboutBody")}</p>
      </div>
    </div>
  );
}

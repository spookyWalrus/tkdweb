import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Conduct() {
  const t = useTranslations("ClassConduct");

  return (
    <div className="main">
      <div className="mainMargin">
        <div>
          <div className="centerHeader">
            <h3>{t("Conduct.Header")}</h3>
          </div>
          <ol>
            <li>{t("Conduct.1")}</li>
            <li>{t("Conduct.2")}</li>
            <li>{t("Conduct.3")}</li>
            <li>{t("Conduct.4")}</li>
            <li>{t("Conduct.5")}</li>
            <li>{t("Conduct.6")}</li>
            <li>{t("Conduct.7")}</li>
            <li>{t("Conduct.8")}</li>
            <li>{t("Conduct.9")}</li>
            <li>{t("Conduct.10")}</li>
            <li>{t("Conduct.11")}</li>
            <li>{t("Conduct.12")}</li>
          </ol>
        </div>
        <div className="bodyTextMarginTop">
          <p>{t("Consequence.title")}</p>
          <p>{t("Consequence.1")}</p>
          <p>{t("Consequence.2")}</p>
          <p>{t("Consequence.3")}</p>
          <p>{t("Consequence.4")}</p>
        </div>
        <div className="bodyTextMarginTop">
          <Image
            src="/images/wideJunbei2.jpg"
            width={750}
            height={550}
            alt="junbei"
            style={{ paddingRight: "1rem" }}
          />
          <h3>{t("Bowing.Header")}</h3>
          <p>{t("Bowing.text1")}</p>
          <br />
          <p>{t("Bowing.text2")}</p>
          <br />
          <p>{t("Bowing.when")}</p>
          <ol>
            <li>{t("Bowing.1")}</li>
            <li>{t("Bowing.2")}</li>
            <li>{t("Bowing.3")}</li>
            <li>{t("Bowing.4")}</li>
            <li>{t("Bowing.5")}</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

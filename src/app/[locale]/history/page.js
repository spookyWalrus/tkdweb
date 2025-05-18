import { useTranslations } from "next-intl";
import Image from "next/image";

export default function History() {
  const t = useTranslations("TKDHistory");
  const t2 = useTranslations("WTF");
  return (
    <div className="main">
      <div className="mainMargin">
        <div>
          <div className="centerHeader">
            <h3>{t("History Header")}</h3>
          </div>
          <p>{t("History-p1")}</p>
          <br />
          <p>{t("History-p2")}</p>
          <br />
          <p>{t("History-p3")}</p>
          <br />
          <p>{t("History-p4")}</p>
          <br />
        </div>
        <div className="bodyTextMarginTop">
          <h4>{t2("WTF Header")}</h4>
          <div className="inlineImage">
            <Image
              src="/images/wt-logo.jpg"
              width={250}
              height={250}
              alt="wtLogo"
              style={{ paddingRight: "1rem" }}
            />
            <p>{t2("WTF-p1")}</p>
          </div>
          <br />
          <p>{t2("WTF-p2")}</p>
          <p>{t2("WTF-p3")}</p>
          <p>{t2("WTF-p4")}</p>
          <p>{t2("WTF-p5")}</p>
          <br />
          <p>{t2("WTF-p6")}</p>
        </div>
      </div>
    </div>
  );
}

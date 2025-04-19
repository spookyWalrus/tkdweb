import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Philosophy() {
  const t = useTranslations("TKDPhilosophy");
  return (
    <div className="main">
      <div className="mainMargin">
        <h3>{t("Philosophy Header")}</h3>
        <p>{t("Philosophy Top")}</p>
        <br />
        <div className="inlineImage">
          <div className="underTrans">
            <p className="eulFont">여의</p>
            <p>(Ye Ui)</p>
          </div>
          <div className="description">
            <h4 className="has-text-weight-semibold">
              {t("Phil-courtesy-header")}
            </h4>
            <p>{t("Phil-courtesy1")}</p>
            <p>{t("Phil-courtesy2")}</p>
            <p>{t("Phil-courtesy3")}</p>
          </div>
        </div>

        <br />
        {/* <p>{t("Phil-integrity")}</p>
        <br />
        <p>{t("Phil-perseverance")}</p>
        <br />
        <p>{t("Phil-selfControl")}</p>
        <br />
        <p>{t("Phil-indomitableSpirit")}</p> */}
      </div>
    </div>
  );
}

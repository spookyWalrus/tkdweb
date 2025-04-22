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
            <p>(Yeo Ui)</p>
          </div>
          <div className="description">
            <h4 className="has-text-weight-semibold">
              {t("Phil-courtesy.Title")}
            </h4>
            <p>{t("Phil-courtesy.1")}</p>
            <p>{t("Phil-courtesy.2")}</p>
            <p>{t("Phil-courtesy.3")}</p>
          </div>
        </div>
        <br />
        <div className="inlineImage bodyTextMarginTop">
          <div className="underTrans">
            <p className="eulFont">염치</p>
            <p>(Yeom Chi)</p>
          </div>
          <div className="description">
            <h4 className="has-text-weight-semibold">
              {t("Phil-integrity.Title")}
            </h4>
            <p>{t("Phil-integrity.1")}</p>
            <p>{t("Phil-integrity.2")}</p>
          </div>
        </div>
        <br />
        <div className="inlineImage bodyTextMarginTop">
          <div className="underTrans">
            <p className="eulFont">인내</p>
            <p>(In Nae)</p>
          </div>
          <div className="description">
            <h4 className="has-text-weight-semibold">
              {t("Phil-perseverance.Title")}
            </h4>
            <p>{t("Phil-perseverance.1")}</p>
            <p>{t("Phil-perseverance.2")}</p>
          </div>
        </div>
        <br />
        <div className="inlineImage bodyTextMarginTop">
          <div className="underTrans">
            <p className="eulFont">극기</p>
            <p>(Geuk Gi)</p>
          </div>
          <div className="description">
            <h4 className="has-text-weight-semibold">
              {t("Phil-selfControl.Title")}
            </h4>
            <p>{t("Phil-selfControl.1")}</p>
            <p>{t("Phil-selfControl.2")}</p>
          </div>
        </div>
        <br />
        <div className="inlineImageCustom bodyTextMarginTop">
          <div className="underTrans has-text-left">
            <p className="eulFont">백절불굴</p>
            <p className="adjustLeft">(Baekjul Boolgool)</p>
          </div>
          <br />
          <div>
            <h4 className="has-text-weight-semibold">
              {t("Phil-indSpirit.Title")}
            </h4>
            <p>{t("Phil-indSpirit.1")}</p>
            <p>{t("Phil-indSpirit.2")}</p>
          </div>
        </div>

        <div className="bodyTextMarginTop">
          <p>{t("AddPhilTKD.1")}</p>
          <p>{t("AddPhilTKD.2a")}</p>
          <p>{t("AddPhilTKD.2b")}</p>
          <p>{t("AddPhilTKD.2c")}</p>
          <br />
          <p>{t("AddPhilTKD.3")}</p>
          <br />
          <div>
            <p className="eulFont">삶의 방식</p>
            <p>(Salm-ui Bangsik)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

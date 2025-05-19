import { useTranslations } from "next-intl";

export default function Training() {
  const t = useTranslations("Vocab2");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h4>{t("Training.header")}</h4>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("Training.Spar")}</p>
          <p className="eulFontSM">겨루기</p>
          <p>&quot;Gyorugi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Training.Break")}</p>
          <p className="eulFontSM">격파</p>
          <p>&quot;Gyeokpa&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Training.SelfDefense")}</p>
          <p className="eulFontSM">호신술</p>
          <p>&quot;Hosinool&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Training.Form")}</p>
          <p className="eulFontSM">품새</p>
          <p>&quot;Poomsae&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Training.BodyArmour")}</p>
          <p className="eulFontSM">호구</p>
          <p>&quot;Hogu&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Training.Blue")}</p>
          <p className="eulFontSM">청</p>
          <p>&quot;Chung&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Training.Red")}</p>
          <p className="eulFontSM">홍</p>
          <p>&quot;Hong&quot;</p>
        </div>
      </div>
    </div>
  );
}

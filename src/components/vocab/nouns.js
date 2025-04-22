import { useTranslations } from "next-intl";

export default function Nouns() {
  const t = useTranslations("Vocab2");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h3>{t("Nouns.header")}</h3>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("Nouns.Yell")}</p>
          <p className="eulFontSM">기합</p>
          <p>&quot;Kihap&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Nouns.Uniform")}</p>
          <p className="eulFontSM">도복</p>
          <p>&quot;Do-bok&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Nouns.Belt")}</p>
          <p className="eulFontSM">띠</p>
          <p>&quot;Tti&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Nouns.TrainingSpace")}</p>
          <p className="eulFontSM">도장</p>
          <p>&quot;Do-jang&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Nouns.NotBlack")}</p>
          <p className="eulFontSM">급</p>
          <p>&quot;Keup&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Nouns.Black")}</p>
          <p className="eulFontSM">단</p>
          <p>&quot;Dan&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Nouns.Black16")}</p>
          <p className="eulFontSM">품</p>
          <p>&quot;Poom&quot;</p>
        </div>
      </div>
    </div>
  );
}

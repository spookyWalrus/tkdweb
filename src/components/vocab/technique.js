import { useTranslations } from "next-intl";

export default function Technique() {
  const t = useTranslations("Vocab2");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h4>{t("Technique.header")}</h4>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("Technique.Stance")}</p>
          <p className="eulFontSM">서기</p>
          <p>&quot;Seogi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Technique.Kick")}</p>
          <p className="eulFontSM">차기</p>
          <p>&quot;Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Technique.Punch")}</p>
          <p className="eulFontSM">지르기</p>
          <p>&quot;Jireugi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Technique.Block")}</p>
          <p className="eulFontSM">막기 </p>
          <p>&quot;Makgi&quot;</p>
        </div>
      </div>
    </div>
  );
}

import { useTranslations } from "next-intl";

export default function Commands() {
  const t = useTranslations("Vocab");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h4>{t("Commands.header")}</h4>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("Commands.Ready")}</p>
          <p className="eulFontSM">준비</p>
          <p>&quot;Junbei&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Commands.Begin")}</p>
          <p className="eulFontSM">시작</p>
          <p>&quot;Sijak&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Commands.Stop")}</p>
          <p className="eulFontSM">그만</p>
          <p>&quot;Geuman&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Commands.Attention")}</p>
          <p className="eulFontSM">차렷</p>
          <p>&quot;Charyeot&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Commands.Bow")}</p>
          <p className="eulFontSM">경례</p>
          <p>&quot;Kyung-nyeh&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Commands.ThankYouFormal")}</p>
          <p className="eulFontSM">감사합니다</p>
          <p>&quot;Gamsamnida&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Commands.ThankYouCasual")}</p>
          <p className="eulFontSM">고마워요</p>
          <p>&quot;Gomawoyo&quot;</p>
        </div>
      </div>
    </div>
  );
}

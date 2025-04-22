import { useTranslations } from "next-intl";

export default function Phrases() {
  const t = useTranslations("Vocab");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h3>{t("Phrases.header")}</h3>
      </div>
      <br />
      <div className="columns is-mobile is-multiline ">
        <div className="celPhrase">
          <h4 className="transHead">{t("Phrases.BowToInstructor")}</h4>
          <span>
            <p className="eulFontSM">겨루기. 차렷. 경례!</p>
          </span>
          <span>
            <p>&quot;Kyosa-nim-ke. Charyot. Kyung-nyeh!&quot;</p>
          </span>
        </div>
        <div className="celPhrase">
          <h4 className="transHead">{t("Phrases.BowToMaster")}</h4>
          <span>
            <p className="eulFontSM">범님사기. 차렷. 경례!</p>
          </span>
          <span>
            <p>&quot;Sabeom-nim-ke. Charyot. Kyung-nyeh!&quot;</p>
          </span>
        </div>
        <div className="celPhrase">
          <h4 className="transHead">{t("Phrases.BowToGrandMaster")}</h4>
          <span>
            <p className="eulFontSM">관장님기. 차렷. 경례!</p>
          </span>
          <span>
            <p>&quot;Gwangjang-nim-ke. Charyot. Kyung-nyeh!&quot;</p>
          </span>
        </div>
      </div>
    </div>
  );
}

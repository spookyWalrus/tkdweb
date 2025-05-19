import { useTranslations } from "next-intl";

export default function Numbers() {
  const t = useTranslations("Vocab2");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h4>{t("Numbers.header")}</h4>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("Numbers.1")}</p>
          <p className="eulFontSM">하나</p>
          <p>&quot;Hana&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.2")}</p>
          <p className="eulFontSM">둘</p>
          <p>&quot;Dul&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.3")}</p>
          <p className="eulFontSM">셋</p>
          <p>&quot;Set&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.4")}</p>
          <p className="eulFontSM">넷</p>
          <p>&quot;Net&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.5")}</p>
          <p className="eulFontSM">다섯</p>
          <p>&quot;Daseot&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.6")}</p>
          <p className="eulFontSM">여섯</p>
          <p>&quot;Yeoseot&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.7")}</p>
          <p className="eulFontSM">일곱</p>
          <p>&quot;Ilgop&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.8")}</p>
          <p className="eulFontSM">여덟</p>
          <p>&quot;Yeodol&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.9")}</p>
          <p className="eulFontSM">아홉</p>
          <p>&quot;Ahop&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Numbers.10")}</p>
          <p className="eulFontSM">열</p>
          <p>&quot;Yeol&quot;</p>
        </div>
      </div>
    </div>
  );
}

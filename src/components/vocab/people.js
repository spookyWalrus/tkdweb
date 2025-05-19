import { useTranslations } from "next-intl";

export default function People() {
  const t = useTranslations("Vocab2");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h4>{t("People.header")}</h4>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("People.Student")}</p>
          <p className="eulFontSM">교사님</p>
          <p>&quot;Jae-ja&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("People.1+Instructor")}</p>
          <p className="eulFontSM">교사님</p>
          <p>&quot;Kyosa-nim&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("People.4+Master")}</p>
          <p className="eulFontSM">범님사</p>
          <p>&quot;Sabeom-nim&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("People.GrandMaster")}</p>
          <p className="eulFontSM">관장님</p>
          <p>&quot;Gwangjang-nim&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("People.HighGrandMaster")}</p>
          <p className="eulFontSM">대사범님</p>
          <p>&quot;Daesabeom-nim&quot;</p>
        </div>
      </div>
    </div>
  );
}

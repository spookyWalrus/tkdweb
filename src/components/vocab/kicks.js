import { useTranslations } from "next-intl";

export default function Kicks() {
  const t = useTranslations("Vocab");
  const t2 = useTranslations("Vocab2");

  return (
    <div className="section noLPadding">
      <div className="has-text-left">
        <h3>{t("Kicks.header")}</h3>
      </div>
      <div className="columns is-mobile is-multiline ">
        <div className="columnCel">
          <p>{t("Kicks.Front")}</p>
          <p className="eulFontSM">앞 차기</p>
          <p>&quot;Ap Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.Angle")}</p>
          <p className="eulFontSM">빗 차기</p>
          <p>&quot;Bit Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Kicks.Back")}</p>
          <p className="eulFontSM">뒤 차기</p>
          <p>&quot;Dwi Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Kicks.Side")}</p>
          <p className="eulFontSM">옆 차기</p>
          <p>&quot;Yeop Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t("Kicks.2Step")}</p>
          <p className="eulFontSM">이단 차기</p>
          <p>&quot;Eedan Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.Turn")}</p>
          <p className="eulFontSM">돌려 차기</p>
          <p>&quot;Dollyo Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.Drop")}</p>
          <p className="eulFontSM">내려 차기</p>
          <p>&quot;Naeryo Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.360")}</p>
          <p className="eulFontSM">뒤 돌아 빗 차기</p>
          <p>&quot;Dwi-Dora Bit-Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.Push")}</p>
          <p className="eulFontSM">미로 차기</p>
          <p>&quot;Miro Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.SpinBack")}</p>
          <p className="eulFontSM">회어축 차기</p>
          <p>&quot;Hweachook Chagi&quot;</p>
        </div>
        <div className="columnCel">
          <p>{t2("Kicks2.BodyPunch")}</p>
          <p className="eulFontSM">회어축 차기</p>
          <p>&quot;Montong Girugi&quot;</p>
        </div>
      </div>
    </div>
  );
}

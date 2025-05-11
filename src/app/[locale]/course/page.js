import { useTranslations } from "next-intl";
import SessionStart from "../../../components/courseFeeFunctions";

export default function CourseFees() {
  const t = useTranslations("CourseFees");

  function mapSpaces(text) {
    return text.split("*n*").map((line, index) => {
      return (
        <p key={index}>
          {line}
          <br />
        </p>
      );
    });
  }
  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerHeader">
          <h2>{t("Header")}</h2>
        </div>
        <div>
          <h3>{t("Schedule.Title")}</h3>
          <div>{mapSpaces(t("Schedule.Top"))}</div>

          <SessionStart />
        </div>
        <div className="bodyTextMarginTop">
          <h3>{t("Schedule.TableHeader")}</h3>
          <table className="table is-striped">
            <thead className="thead">
              <tr>
                <th></th>
                <th className="tableHead">{t("Schedule.Tuesday")}</th>
                <th className="tableHead">{t("Schedule.Thursday")}</th>
                <th className="tableHead">{t("Schedule.Saturday")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {t("Schedule.Beginner")}
                  <br />
                  <p className="noBold">{t("Schedule.BeginnerDesc")}</p>
                </th>
                <td>
                  18:30 <br />
                </td>
                <td>
                  18:30 <br />
                </td>
                <td>13:00</td>
              </tr>
              <tr>
                <th>
                  {t("Schedule.Advanced")}
                  <br />
                  <p className="noBold">{t("Schedule.AdvancedDesc")}</p>
                </th>
                <td>
                  18:30 <br />
                </td>
                <td>
                  18:30 <br />
                </td>
                <td>13:00</td>
              </tr>
              <tr>
                <th>{t("Schedule.Belts")}</th>
                <td>
                  19:45 <br />
                </td>
                <td>
                  19:45 <br />
                </td>
                <td>13:00</td>
              </tr>
            </tbody>
          </table>
          <div>{mapSpaces(t("Schedule.Comment"))}</div>
        </div>
        <div className="bodyTextMarginTop">
          <h3>{t("Fees.Title")}</h3>
          <table className="table is-striped">
            <thead className="thead">
              <tr>
                <th></th>
                <th className="tableHead">{t("Fees.SessionCost")}</th>
                <th className="tableHead">
                  {t("Fees.FamilyRate")}
                  <br />
                  <p className="noBold">{t("Fees.FamilyRateDesc")}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  {t("Fees.RecCat")}
                  <br />
                  <p className="noBold">{t("Fees.RecCatDesc")}</p>
                </th>
                <td>85$</td>
                <td>Family price$</td>
              </tr>
              <tr>
                <th>
                  {t("Fees.CompCat")}
                  <br />
                  <p className="noBold">{t("Fees.CompCatDesc")}</p>
                </th>
                <td>100$ </td>
                <td>Family price$</td>
              </tr>
              <tr>
                <th>
                  {t("Fees.AdvCat")}
                  <br />
                  <p className="noBold">{t("Fees.AdvCatDesc")}</p>
                </th>
                <td>100$ </td>
                <td>Family price$</td>
              </tr>
              <tr>
                <th>
                  {t("Fees.BBeltCat")}
                  <br />
                  <p className="noBold">{t("Fees.BBeltCatDesc")}</p>
                </th>
                <td>120$ </td>
                <td>Family price$</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="bodyTextMarginTop">{t("Fees.AddCos")}</h3>
          <div>
            <h4 className="underline">{t("Fees.Eqp")}</h4>
            <p>{t("Fees.Dobuk")} (Dobuk) : 40$</p>
            <p>{t("Fees.Protection")} : 100$</p>
            <br />
            <p>{t("Fees.GearPurchase")}</p>
          </div>
        </div>
        <div className="bodyTextMarginTop">
          <h4 className="underline">{t("Fees.Fees")}</h4>
          <p>{t("Fees.QTKDclr")} : 40$</p>
          <p>{t("Fees.QTKDblk")} : 50$</p>
        </div>
        <div className="bodyTextMarginTop">
          <h4 className="underline">{t("Fees.Exams")}</h4>
          <p>{t("Fees.ExamClrBelt")} : 30$</p>
          <p>{t("Fees.ExamBlkBelt")} : 30$</p>
          <div>{mapSpaces(t("Fees.ExamComment"))}</div>
        </div>
        <div className="bodyTextMarginTop">
          <div>{mapSpaces(t("FinalComment"))}</div>
          <div>{mapSpaces(t("PayInfo"))}</div>
        </div>
      </div>
    </div>
  );
}

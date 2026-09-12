"use client";
import { useTranslations } from "next-intl";
import SessionStart from "../../../components/courseFeeFunctions";
import { useLocale } from "next-intl";

export default function CourseFees() {
  const t = useTranslations("CourseFees");
  const lang = useLocale();

  function seasonCalc() {
    let season;
    let now = new Date();
    let year = now.getFullYear();
    if (lang === "en") {
      season = "Season ";
    } else if (lang === "fr") {
      season = "Saison ";
    } else {
      season = "Season";
    }
    let buttonLabel =
      now.getMonth() >= 8
        ? `${season} ${year}-${year + 1}`
        : `${season} ${year - 1}-${year}`;
    return buttonLabel;
  }

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
          <h3>{t("Header")}</h3>
        </div>
        <div>
          <div>{mapSpaces(t("Schedule.Top"))}</div>
          {/* <SessionStart /> */}
          <div>
            <h5>Session 1 : Sep 15 2026</h5>
            <h5>Session 2 : Dec 08 2026</h5>
            <h5>Session 3 : Mar 03 2026</h5>
          </div>
        </div>
        <br />
        <div>
          <p>
            {t("Schedule.Download")}
            <a
              href="https://oqcbfcberasludcppgxy.supabase.co/storage/v1/object/public/TKDcalendar/2026-27-calendar.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="button is-link dlcalendarbutton"
            >
              {seasonCalc()}
            </a>
          </p>
        </div>

        <div className="bodyTextMarginTop">
          <h4>{t("Schedule.TableHeader")}</h4>
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
                  18:30 - 19:30
                  <br />
                </td>
                <td>
                  18:30 - 19:30
                  <br />
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
                  18:30 - 20h
                  <br />
                </td>
                <td>
                  18:30 - 20h
                  <br />
                </td>
                <td>13:00 - 15h</td>
              </tr>
              <tr>
                <th>{t("Schedule.Belts")}</th>
                <td>
                  18:30 - 20:30
                  <br />
                </td>
                <td>
                  18:30 - 20:30
                  <br />
                </td>
                <td>13:00 - 15h</td>
              </tr>
            </tbody>
          </table>
          <div>{mapSpaces(t("Schedule.Comment"))}</div>
        </div>

        <div className="bodyTextMarginTop">
          <h5>{t("Streams.Header")}</h5>
          <div className="content">
            <ul>
              <li>
                <p className="strongBold">{t("Streams.RecTitle")}</p>
                <ul>
                  <li>{t("Streams.RecDesc")}</li>
                  <p className="strongBoldMed">{t("Streams.RecListTitle")}</p>
                  <ul>
                    <li>{t("Streams.RecList1")}</li>
                    <li>{t("Streams.RecList2")}</li>
                    <li>{t("Streams.RecList3")}</li>
                    <li>{t("Streams.RecList4")}</li>
                    <li>{t("Streams.RecList5")}</li>
                  </ul>
                </ul>
              </li>
              <li>
                <p className="strongBold">{t("Streams.CompTitle")}</p>
                <ul>
                  <li>{t("Streams.CompDesc")}</li>
                  <ul>
                    <li>{t("Streams.CompList1")}</li>
                    <li>{t("Streams.CompList2")}</li>
                    <li>{t("Streams.CompList3")}</li>
                    <li>{t("Streams.CompList4")}</li>
                    <li>{t("Streams.CompList5")}</li>
                  </ul>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="bodyTextMarginTop">
          <h4>{t("Fees.Title")}</h4>
          <div>
            <p>{t("Fees.InPerson")}</p>
          </div>
        </div>
        <div>
          <h4 className="bodyTextMarginTop">{t("Fees.AddCos")}</h4>
          <div>
            <h6>{t("Fees.Eqp")}</h6>
            <p>{t("Fees.Dobuk")} (Dobuk)</p>
            <p>{t("Fees.Protection")}</p>
            <br />
            <p>{t("Fees.GearPurchase")}</p>
          </div>
        </div>
        <div className="bodyTextMarginTop">
          <h6>{t("Fees.Fees")}</h6>
          <p>{t("Fees.QTKDw")} : 20$</p>
          <p>{t("Fees.QTKDclr")} : 30$</p>
          <p>{t("Fees.QTKDblk")} : 35$</p>
        </div>
        <div className="bodyTextMarginTop">
          <h6>{t("Fees.Exams")}</h6>
          {/* <p>{t("Fees.ExamClrBelt")} : 30$</p>
          <p>{t("Fees.ExamBlkBelt")} : 30$</p> */}
          <div>{mapSpaces(t("Fees.ExamComment"))}</div>
        </div>
        <div>
          <h4 className="bodyTextMarginTop">{t("Fees.Payments")}</h4>
          <div>{mapSpaces(t("FinalComment"))}</div>
          <h6>{mapSpaces(t("PayInfo"))}</h6>
        </div>
      </div>
    </div>
  );
}

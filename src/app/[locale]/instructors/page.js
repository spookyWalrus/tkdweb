// import { useTranslations } from "next-intl";
import PropTypes from "prop-types";

import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/utilities/seo";
import OneCard from "@/components/one-card";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "Instructors.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/Instructors"),
  };
}

export default async function Instructors({ params }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("Instructors");

  function checkBlurb(blurb) {
    if (blurb && blurb.length > 0) {
      return "";
    } else {
      return "drop-opaque";
    }
  }

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="bodyTextMarginTop card-grid-container centerCard">
          <OneCard
            imageSrc="/images/gM1.jpg"
            altText="grandMaster"
            name="Christian Sourdif"
            position={t("Card.gmTitle") + ", 9th Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
            // cvUrl="#"
            // cvUrl="https://oqcbfcberasludcppgxy.supabase.co/storage/v1/object/sign/CV/InfoLettre.pdf?token=eyJraWQiOiI0YzRlM2ExZS1hMWRmLTQxNGQtYTZkYy02NGEyMGZjYzM2YWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDVi9JbmZvTGV0dHJlLnBkZiIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTI4ODcxODgsImV4cCI6MTc5MzQ5MTk4OH0.2SmcMSutKM_Ke6sSMMwgj1dBqmuasHMgBmj31N1u28c"
          />
        </div>
        <div className="bodyTextMarginTop card-grid-container">
          <OneCard
            imageSrc="/images/mf3.jpg"
            altText="instructor-trainer"
            name="Marie-France Moffat"
            position={t("Card.trainTitle") + ", 6th Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
            // cvUrl="#"
            // cvUrl="https://oqcbfcberasludcppgxy.supabase.co/storage/v1/object/sign/CV/slides.png?token=eyJraWQiOiI0YzRlM2ExZS1hMWRmLTQxNGQtYTZkYy02NGEyMGZjYzM2YWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJDVi9zbGlkZXMucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5Mjg4NzM1MywiZXhwIjoxNzkzNDkyMTUzfQ.F4jfARQMkN4iyxO0cGvfhwSJW1Rdr9WMc5dgB0Zp_Hc"
          />
          {/* <OneCard
            imageSrc="/images/zoey2.jpg"
            altText="instructor"
            name="Zo&euml; Zelick"
            position={t("Card.insTitle") + ", 5th Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
          /> */}
          {/* <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            name="Good instructor"
            position={t("Card.assTitle") + ", 1st Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
          /> */}
          <OneCard
            imageSrc="/images/kat2.jpg"
            altText="instructor"
            name="Katherine Gravel"
            position={t("Card.assTitle") + ", 2nd Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
          />
          <OneCard
            imageSrc="/images/lar2.jpg"
            altText="instructor"
            name="Laurie Roy"
            position={t("Card.assTitle") + ", 2nd Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
          />
        </div>
        <div className="bodyTextMarginTop">
          <h3>{t("InsCond.Header")}</h3>
          <div>
            <ol>
              <li>{t("InsCond.1")}</li>
              <li>{t("InsCond.2")}</li>
              <li>{t("InsCond.3")}</li>
              <li>{t("InsCond.4")}</li>
              <li>{t("InsCond.5")}</li>
              <li>{t("InsCond.6")}</li>
              <li>{t("InsCond.7")}</li>
            </ol>
          </div>
          <div className="bodyTextMarginTop">
            <p>{t("InsCond.Text1")}</p>
            <br />
            <p>{t("InsCond.Text2")}</p>
            <br />
            <p>{t("InsCond.Text3")}</p>
            <br />
            <p>{t("InsCond.Text4")}</p>
            <br />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}

Instructors.propTypes = {
  params: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

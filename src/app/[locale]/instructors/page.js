import { useTranslations } from "next-intl";
import OneCard from "@/components/one-card";

function Instructors() {
  const t = useTranslations("Instructors");

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
        <div className="centerHeader">
          <h3>{t("Card.Header")}</h3>
        </div>
        <div className="centerCard">
          <OneCard
            imageSrc="/images/gM1.jpg"
            altText="grandMaster"
            name="Christien Sourdif"
            position={t("Card.gmTitle") + ", 9th Dan"}
            blurbclass={checkBlurb(t("Card.assTitle"))}
            blurb={t("Card.assTitle")}
          />
        </div>
        <div className="bodyTextMarginTop card-grid-container">
          <OneCard
            imageSrc="/images/mf3.jpg"
            altText="instructor-trainer"
            name="Marie-France Instructor"
            position={t("Card.trainTitle") + ", 6th Dan"}
            blurbclass={checkBlurb(t("Card.trainTitle"))}
            blurb={t("Card.blurbMF")}
          />
          <OneCard
            imageSrc="/images/zoey2.jpg"
            altText="instructor"
            name="Zoey Instructor"
            position={t("Card.insTitle") + ", 5th Dan"}
            blurbclass={checkBlurb(t("Card.blurbZY"))}
            blurb={t("Card.blurbZY")}
          />
          <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            name="Good instructor"
            position={t("Card.assTitle") + ", 1st Dan"}
            blurbclass={checkBlurb("")}
          />
          <OneCard
            imageSrc="/images/kat1.jpg"
            altText="instructor"
            name="Katrine instructor"
            position={t("Card.assTitle") + ", 1st Dan"}
            blurbclass={checkBlurb(t("Card.blurbKR"))}
            blurb={t("Card.blurbKR")}
          />
          <OneCard
            imageSrc="/images/laur1.jpg"
            altText="instructor"
            name="Laurie Roy"
            position={t("Card.assTitle") + ", 1st Dan"}
            blurbclass={checkBlurb(t("Card.blurbLR"))}
            blurb={t("Card.blurbLR")}
          />
        </div>
        <div className="bodyTextMarginTop">
          <h4>{t("InsCond.Header")}</h4>
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

export default Instructors;

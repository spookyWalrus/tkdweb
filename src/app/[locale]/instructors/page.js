import { useTranslations } from "next-intl";
import TwoCard from "@/components/two-card";
import OneCard from "@/components/one-card";

function Instructors() {
  const t = useTranslations("Instructors");

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerCard">
          <OneCard
            imageSrc="/images/gM1.jpg"
            altText="grandMaster"
            imgWidth="500"
            imgHeight="641"
            name="Christien Sourdif"
            position={t("Card.gmTitle") + ", 9th Dan"}
          />
          {/* <TwoCard
            imageSrc="/images/gM1.jpg"
            altText="instructor-grandMaster"
            imgWidth="250"
            imgHeight="282"
            heading="Christien Sourdif"
            subHeader="9th Dan"
            body="Head Instructor and trainer"
            className="roundedImage"
          /> */}
        </div>
        <div className="bodyTextMarginTop card-grid-container">
          <OneCard
            imageSrc="/images/mf3.jpg"
            altText="instructor-trainer"
            imgWidth="200"
            imgHeight="228"
            name="Marie-France Instructor"
            position={t("Card.trainTitle") + ", 6th Dan"}
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/zoey2.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="245"
            name="Zoey Instructor"
            position={t("Card.insTitle") + ", 5th Dan"}
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position={t("Card.assTitle") + ", 1st Dan"}
          />
          <OneCard
            imageSrc="/images/instructor2.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position={t("Card.assTitle") + ", 1st Dan"}
          />
          <OneCard
            imageSrc="/images/instructor3.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position={t("Card.assTitle") + ", 1st Dan"}
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

export default Instructors;

import { useTranslations } from "next-intl";
import TwoCard from "@/components/two-card";
import OneCard from "@/components/one-card";

function Instructors() {
  const t = useTranslations("Instructors");

  return (
    <div className="main">
      <div className="mainMargin">
        <div className="centerCard">
          <TwoCard
            imageSrc="/images/bigBoss.jpg"
            altText="instructor"
            heading="Christien Sourdif, 9th dan"
            imgWidth="200"
            imgHeight="200"
            body={<h3>Head Instructor</h3>}
            className="roundedImage"
          />
        </div>
        <div className="bodyTextMarginTop card-grid-container">
          <OneCard
            imageSrc="/images/mf3.jpg"
            altText="instructor-1"
            imgWidth="200"
            imgHeight="228"
            name="Marie-France"
            position="Instructor, trainer. 6th Dan"
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/zoey2.jpg"
            altText="instructor-z"
            imgWidth="200"
            imgHeight="245"
            name="Zoey Instructor"
            position="Instructor. 5th Dan"
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position="Instructor. 5th Dan"
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position="Instructor, trainer. 6th Dan"
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position="Instructor, trainer. 6th Dan"
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
          <OneCard
            imageSrc="/images/instructor1.jpg"
            altText="instructor"
            imgWidth="200"
            imgHeight="200"
            name="Good instructor"
            position="Instructor, trainer. 6th Dan"
            blurb="3 time gold medalist, Quebec Provincial TKD Competition"
          />
        </div>
        <div className="bodyTextMarginTop">
          {/* <h3>{t("InsCond.Header")}</h3> */}
          <h3>Code Conduct of teachers</h3>
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

import Image from "next/image";
import { useTranslations } from "next-intl";
import PropTypes from "prop-types";

// 08 Dec 2025 - Revealing more info on hover for 'blurb' (set with styling in oneCard.scss) , is turned off via commented out

const OneCard = ({
  imageSrc,
  altText,
  name,
  position,
  blurb,
  blurbclass,
  cvUrl,
}) => {
  const t = useTranslations("Instructors.Card");

  return (
    <div className="card oneCardCustom">
      <div className="card-image">
        <figure className="image ">
          <Image
            src={imageSrc}
            alt={altText}
            width={300}
            height={375}
            className="portraitStyle"
          />
        </figure>
      </div>
      <div className="card-content customOneCardContent">
        <div className="media">
          <div className="media-content">
            <h5 className="title is-size-6">{name}</h5>
            <div className="drop-card">
              <p
                className={`subtitle is-size-6 drop-card-top drop-card-subtitle ${blurbclass}`}
              >
                {/* <p className="subtitle is-size-6 drop-card-top drop-card-subtitle"> */}
                {position}
              </p>
              <p className="subtitle is-size-7 drop-card-under drop-card-subtitle">
                {blurb}
              </p>
            </div>
          </div>
        </div>
      </div>
      {cvUrl && (
        <footer className="card-footer">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-footer-item cv-button"
            aria-label={t("CV")}
          >
            {t("CV")}
          </a>
        </footer>
      )}
    </div>
  );
};
OneCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.node.isRequired,
  blurb: PropTypes.string,
  blurbclass: PropTypes.string,
  cvUrl: PropTypes.string,
  // imgHeight: PropTypes.string,
};

export default OneCard;

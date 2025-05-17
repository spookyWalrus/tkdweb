import PropTypes from "prop-types";
import Image from "next/image";

const TwoCard = ({
  imageSrc,
  altText,
  heading,
  subHeader,
  body,
  imgWidth = "1000",
  imgHeight = "1000",
  className,
}) => {
  return (
    <div className="twoCard">
      <div className="cardImage">
        <Image
          src={imageSrc}
          alt={altText}
          width={imgWidth}
          height={imgHeight}
          className={className}
        />
      </div>
      <div className="card-text">
        <h3>{heading}</h3>
        <p className="cardSubHeader">{subHeader}</p>
        <section className="cardSection">{body}</section>
      </div>
    </div>
  );
};

TwoCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  body: PropTypes.node.isRequired,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
  className: PropTypes.string,
};

export default TwoCard;

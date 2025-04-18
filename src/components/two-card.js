import PropTypes from "prop-types";
import Image from "next/image";

const TwoCard = ({
  imageSrc,
  altText,
  heading,
  body,
  imgWidth = "1000",
  imgHeight = "1000",
}) => {
  return (
    <div className="twoCard">
      <div className="cardImage">
        <Image
          src={imageSrc}
          alt={altText}
          width={imgWidth}
          height={imgHeight}
        />
      </div>
      <div className="card-text">
        <h3>{heading}</h3>
        <section className="cardSection">{body}</section>
      </div>
    </div>
  );
};

TwoCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
};

export default TwoCard;

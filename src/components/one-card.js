import Image from "next/image";
import PropTypes from "prop-types";

const OneCard = ({
  imageSrc,
  altText,
  name,
  position,
  blurb,
  imgWidth,
  imgHeight,
}) => {
  return (
    <div className="card oneCardCustom">
      <div className="card-image">
        <figure className="image is-4by5">
          <Image
            src={imageSrc}
            alt={altText}
            width={imgWidth}
            height={imgHeight}
            className="portraitStyle"
          />
        </figure>
      </div>
      <div className="card-content customOneCardContent">
        <div className="media">
          <div className="media-content">
            <p className="title is-size-6">{name}</p>
            <p className="subtitle is-size-6">{position}</p>
            <p className="subtitle is-size-7">{blurb}</p>
          </div>
        </div>

        {/* <div className="content">{blurb}</div> */}
      </div>
    </div>
  );
};
OneCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.node.isRequired,
  blurb: PropTypes.string,
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
};

export default OneCard;

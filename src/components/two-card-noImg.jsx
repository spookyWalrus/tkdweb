import PropTypes from "prop-types";
import Image from "next/image";

const TwoCardNI = ({ heading, body, heading2, body2 }) => {
  return (
    <div className="twoCard">
      <div className="card-text">
        <h3>{heading}</h3>
        <section>{body}</section>
      </div>
      <div className="card-text">
        <h3>{heading2}</h3>
        <section>{body2}</section>
      </div>
    </div>
  );
};

TwoCardNI.propTypes = {
  heading: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  heading2: PropTypes.string.isRequired,
  body2: PropTypes.node.isRequired,
};

export default TwoCardNI;

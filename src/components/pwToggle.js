import Image from "next/image";
import PropTypes from "prop-types";

function PWToggle({ setPwtype, pwtype }) {
  const togglePW = () => {
    setPwtype(pwtype === "password" ? "text" : "password");
  };

  return (
    <button type="button" onClick={togglePW} className="inputTog">
      {pwtype === "password" ? (
        <Image src="/logos/showPW16.png" width={16} height={16} alt="show" />
      ) : (
        <Image src="/logos/hidePW16.png" width={16} height={16} alt="hide" />
      )}
    </button>
  );
}

export default PWToggle;

PWToggle.propTypes = {
  setPwtype: PropTypes.func.isRequired,
  pwtype: PropTypes.string.isRequired,
};

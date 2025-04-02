import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";

const ContactInfo = () => {
  const t = useTranslations("ContactInfo");
  return (
    <div>
      <div className="icon-box">
        <span className="icon isBlue">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <span className="contactBold">{t("Email")}</span>
        <span className="contactInfo">tkdccs@gmail.com</span>
      </div>
      <div className="icon-box">
        <span className="icon isBlue">
          <FontAwesomeIcon icon={faPhone} />
        </span>
        <span className="contactBold">{t("Phone")}</span>
        <span className="contactInfo">090-123-4567</span>
      </div>
      <div className="icon-box">
        <span className="icon isBlue">
          <FontAwesomeIcon icon={faLocationDot} />
        </span>
        <span className="contactBold">{t("Address")}</span>
        <div className="contactInfo">
          <p>1234 Main Street</p>
          <p>City, State, 12345</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

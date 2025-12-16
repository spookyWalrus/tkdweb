import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import Map from "./map";

const ContactInfo = () => {
  const t = useTranslations("Contact");
  return (
    <div>
      <div className="icon-box">
        <span className="icon isBlue">
          <FontAwesomeIcon icon={faEnvelope} />
        </span>
        <span className="contactBold">{t("Email")}</span>
        <span className="contactInfo">ccstkdrawdon@gmail.com</span>
      </div>
      <div className="icon-box">
        <span className="icon isBlue">
          <FontAwesomeIcon icon={faPhone} />
        </span>
        <span className="contactBold">{t("Phone")}</span>
        <span className="contactInfo">(514) 702-2599</span>
      </div>
      <div className="icon-box">
        <span className="icon isBlue">
          <FontAwesomeIcon icon={faLocationDot} />
        </span>
        <span className="contactBold">{t("Address")}</span>
        <div className="contactInfo">
          <p>3763 rue Albert</p>
          <p>Rawdon (Québec)</p>
          <p>Canada J0K 1S0 </p>
        </div>
      </div>
      <Map />
    </div>
  );
};

export default ContactInfo;

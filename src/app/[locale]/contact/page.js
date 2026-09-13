"use client";
import { useTranslations } from "next-intl";
import TwoCardNI from "@/components/two-card-noImg";
import ContactForm from "@/components/contactForm";
import ContactInfo from "@/components/contactInfo";

export default function ContactUs() {
  const t = useTranslations("Contact");

  return (
    <div className="mainContact">
      {/* <div className="contactMarginTop"> */}
      <div className="centerHeader">
        <h3>{t("Register")}</h3>
        <h5>{t("MakeContact")}</h5>
        {/* <h3>How to Register TKD</h3> */}
        {/* <h3>Please come in person and talk to us to sign up.</h3> */}
        {/* <h5>Or send us a message or email us. We would love to hear from you!</h5> */}
        {/* </div> */}
      </div>
      {/* <div className="bodyTextMarginTop"> */}
      <div>
        {/* <div className="mainMargin"> */}
        <TwoCardNI
          heading={t("ContactInfo")}
          body={<ContactInfo />}
          heading2={t("ContactUs")}
          body2={<ContactForm />}
        />
      </div>
    </div>
  );
}

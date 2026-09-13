"use client";
import { useTranslations } from "next-intl";
import TwoCardNI from "@/components/two-card-noImg";
import ContactForm from "@/components/contactForm";
import ContactInfo from "@/components/contactInfo";

export default function ContactUs() {
  const t = useTranslations("Contact");

  return (
    <div className="mainContact">
      <div className="centerHeader">
        <h3>{t("Register")}</h3>
        <h5>{t("MakeContact")}</h5>
      </div>
      <div>
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

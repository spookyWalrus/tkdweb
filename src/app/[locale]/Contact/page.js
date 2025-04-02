"use client";
import { useTranslations } from "next-intl";
import TwoCardNI from "@/components/two-card-noImg";
import ContactForm from "@/components/contactForm";
import ContactInfo from "@/components/contactInfo";

export default function ContactUs() {
  const t = useTranslations("Contact");

  return (
    <div className="main">
      <div className="twoCardMargin">
        <TwoCardNI
          heading={"How to reach us"}
          body={<ContactInfo />}
          heading2={t("ContactUs")}
          body2={<ContactForm />}
        />
      </div>
    </div>
  );
}

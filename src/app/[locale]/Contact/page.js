"use client";
import { useTranslations } from "next-intl";
import TwoCardLeft from "@/components/two-card-left";
import ContactForm from "@/components/contactForm";

export default function ContactUs() {
  const t = useTranslations("Contact");

  return (
    <div className="main">
      <div className="twoCardMargin">
        <TwoCardLeft
          imageSrc={"/images/kyoExam1.jpg"}
          altText="exam"
          heading={t("ContactUs")}
          body={<ContactForm />}
          imgWidth="500"
          imgHeight="500"
        />
      </div>
    </div>
  );
}

import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/utilities/seo";
import TwoCardNI from "@/components/two-card-noImg";
import ContactForm from "@/components/contactForm";
import ContactInfo from "@/components/contactInfo";
import PropTypes from "prop-types";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({
    locale,
    namespace: "Contact.Metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale, "/Contact"),
  };
}

export default async function ContactUs({ params: { locale } }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <div className="mainContact">
      <div className="centerHeader">
        <h3>{t("Register")}</h3>
        <h4>{t("Visit")}</h4>
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

ContactUs.propTypes = {
  params: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

import PropTypes from "prop-types";
import { getTranslations, setRequestLocale } from "next-intl/server";
import HeroBlock from "../../components/HeroBlock";
import TwoCardLeft from "../../components/two-card-left";
import Link from "next/link";
import { buildAlternates } from "@/utilities/seo";

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "Home.Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: buildAlternates(locale),
  };
}

export default async function Home({ params }) {
  const { locale } = params;
  setRequestLocale(locale);
  const t = await getTranslations("Home.HeroBlock");
  const t2 = await getTranslations("Home.AboutBlock");

  return (
    <main className="main">
      <HeroBlock>
        <div className="HeroTitles">
          <h1 className="HeroHeader">{t("HeroHeader")}</h1>
          <div className="HeroSubHeader">
            <h2>{t("HeroSubHeader")}</h2>
            <Link href="/contact" className="button joinus">
              {t("JoinUs")}
            </Link>
          </div>
          <div className="filler"> </div>
        </div>
      </HeroBlock>

      <div className="mainMargin">
        <TwoCardLeft
          imageSrc="/images/kyoExam.jpg"
          altText="exam"
          heading={t2("AboutHeader")}
          body={<p>{t2("AboutBody")}</p>}
        />
      </div>
    </main>
  );
}

Home.propTypes = {
  params: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

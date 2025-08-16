import PropTypes from "prop-types";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { loadTranslations } from "../../i18n/request";
import { locales } from "../../i18n/routing";
import { IntersectionProvider } from "@/utilities/intersectionContext";

import { Inter } from "next/font/google";
import "./styles/globals.scss";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const metadata = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  setRequestLocale(locale);

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await loadTranslations(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale || "fr"} messages={messages}>
          <IntersectionProvider>
            <Navbar />
            {children}
            <Footer />
          </IntersectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.shape({
    locale: PropTypes.string.isRequired,
  }).isRequired,
};

export const dynamic = "force-dynamic";

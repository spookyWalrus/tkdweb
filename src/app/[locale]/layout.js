import PropTypes from "prop-types";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales } from "../../i18n/routing";

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
  const metadata = await getLocalizedMetadata(locale);
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

async function getLocalizedMetadata(locale) {
  const messages = (await import(`../../../locales/${locale}/Metadata.json`))
    .default;
  return {
    title: messages.title,
    description: messages.description,
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = await getMessages(locale);
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
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

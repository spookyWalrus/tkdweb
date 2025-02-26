import PropTypes from "prop-types";
import initTranslations from "@/i18n";
import TranslationProvider from "@/TranslationProvider";

import { Inter } from "next/font/google";
import "./styles/globals.scss";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({
  subsets: ["latin"],
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata = {
  title: "Académie Taekwondo Christien Sourdif, Rawdon",
  description: "Taekwondo School in Rawdon",
};

export default async function RootLayout({ children, params: { locale } }) {
  // console.log("Initializaing the locale from layout: ", locale);
  // const nameSpaces = ["Hero Block"];
  const { i18n } = await initTranslations(locale, []);

  return (
    <html lang={locale || "en"}>
      <body className={inter.className}>
        <TranslationProvider i18n={i18n}>
          <Navbar />
          {children}
          <Footer />
        </TranslationProvider>
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

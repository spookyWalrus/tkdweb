import PropTypes from "prop-types";
import TranslationProvider from "@/TranslationProvider";
import { initTranslations } from "@/i18n";
import i18next from "i18next";
import { Inter } from "next/font/google";
import "./styles/globals.scss";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Académie Taekwondo Christien Sourdif, Rawdon",
  description: "Taekwondo School in Rawdon",
};

export default async function RootLayout({ children, params: { locale } }) {
  // const namespaces = ["Hero Block"];
  // console.log("Root. Locale is: ", locale);
  const { t, resources } = await initTranslations(locale, []);

  return (
    <html lang={locale}>
      <body>
        <TranslationProvider i18n={i18next}>
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

import PropTypes from "prop-types";
import ClientLayout from "./clientLayout";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
// import Navbar from "@/components/navbar";
// import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Académie Taekwondo Christien Sourdif, Rawdon",
  description: "Taekwondo School in Rawdon",
};

async function getTranslations(locale) {
  const res = await fetch(
    // `${process.env.NEXT_PUBLIC_SITE_URL}/api/translations?lang=${locale}`,
    `/api/translations?lang=${locale}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return {};
  }
  return res.json();
}

export default async function RootLayout({ children }) {
  const locale = "en"; // You can make this dynamic based on request headers or cookies
  const translations = await getTranslations(locale);

  // export default function RootLayout({ children }) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        {/* <ClientLayout> */}
        <ClientLayout initialTranslations={translations} initialLocale={locale}>
          {children}
        </ClientLayout>
        {/* <TranslationProvider>
          <Navbar />
          {children}
          <Footer />
        </TranslationProvider> */}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

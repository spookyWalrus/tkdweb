"use client";
import PropTypes from "prop-types"; // Import PropTypes
import TranslationProvider from "@/contexts/translationProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
  initialTranslations,
  initialLocale,
}) {
  const [translations, setTranslations] = useState(initialTranslations);
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    async function loadTranslations() {
      const res = await fetch(`/api/translations?lang=${locale}`);
      if (res.ok) {
        const data = await res.json();
        setTranslations(data);
      }
    }
    loadTranslations();
  }, [locale]);

  return (
    <TranslationProvider
      initialTranslations={initialTranslations}
      initialLocale={initialLocale}
    >
      <Navbar />
      {children}
      <Footer />
    </TranslationProvider>
  );
}

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired, // React node (JSX, string, number, etc.)
  initialTranslations: PropTypes.object.isRequired, // Expecting an object
  initialLocale: PropTypes.string.isRequired, // Expecting a string
};

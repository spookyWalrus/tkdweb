"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types"; // Import PropTypes

export const TranslationContext = createContext();

export default function TranslationProvider({
  children,
  initialTranslations,
  initialLocale,
}) {
  const [translations, setTranslations] = useState(initialTranslations || {});
  const [locale, setLocale] = useState(initialLocale || "en");

  useEffect(() => {
    const userLocale = Cookies.get("locale") || locale;
    setLocale(userLocale);

    fetch(`/api/translations?lang=${userLocale}`)
      .then((res) => res.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Translation fetch error:", error));
  }, [locale]);

  return (
    <TranslationContext.Provider value={{ locale, translations, setLocale }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations() {
  return useContext(TranslationContext);
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired, // React node (JSX, string, number, etc.)
  initialTranslations: PropTypes.object.isRequired, // Expecting an object
  initialLocale: PropTypes.string.isRequired, // Expecting a string
};

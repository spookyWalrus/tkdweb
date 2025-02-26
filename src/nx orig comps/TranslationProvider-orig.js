"use client";
import PropTypes from "prop-types";

import { I18nextProvider } from "react-i18next";
import initTranslations from "@/i18n";
import { createInstance } from "i18next";

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

TranslationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  locale: PropTypes.string.isRequired,
  namespaces: PropTypes.arrayOf(PropTypes.string).isRequired,
  resources: PropTypes.object,
};

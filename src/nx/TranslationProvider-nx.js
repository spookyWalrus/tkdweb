"use client";
import { I18nextProvider } from "react-i18next";
import PropTypes from "prop-types";

export default function TranslationProvider({ i18n, children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired,
  i18n: PropTypes.object.isRequired,
};

"use client";
import PropTypes from "prop-types";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import React from "react"; // Explicitly import React

export default function TranslationProvider({ children }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}

TranslationProvider.propTypes = {
  children: PropTypes.node.isRequired, // or PropTypes.node if optional
};

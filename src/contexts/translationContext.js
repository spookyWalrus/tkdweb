"use client";
import { createContext, useContext } from "react";

export const TranslationContext = createContext();

export function useTranslations() {
  return useContext(TranslationContext);
}

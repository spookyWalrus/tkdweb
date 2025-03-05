import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
});

export const locales = routing.locales;

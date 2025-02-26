import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "i18nConfig";

export async function initTranslations(locale, namespaces, resources = null) {
  const i18n = createInstance();
  i18n.use(initReactI18next);

  if (!resources) {
    i18n.use(
      resourcesToBackend(
        (language, namespace) =>
          import(`../locales/${language}/${namespace}.json`)
      )
    );
  }

  const supportedLngs = Array.isArray(i18nConfig.locales)
    ? i18nConfig.locales
    : [i18nConfig.defaultLocale];
  const fallbackLng = Array.isArray(i18nConfig.defaultLocale)
    ? i18nConfig.defaultLocale
    : [i18nConfig.defaultLocale];

  // console.log("Initializing i18next with locale:", locale);
  // console.log("Namespaces from i18n:", namespaces);

  await i18n.init({
    lng: locale,
    resources,
    fallbackLng,
    supportedLngs,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

  return {
    i18n,
    resources: { [locale]: i18n.services.resourceStore.data[locale] },
    t: i18n.t,
  };
}

// Export the singleton i18n instance
// export { i18n };

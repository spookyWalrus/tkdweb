import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "i18nConfig";

export default async function initTranslations(
  locale,
  namespaces,
  i18nInstance = null,
  resources = null
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
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
  // console.log("Namespaces from i18n :", namespaces);

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng,
    supportedLngs,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
}

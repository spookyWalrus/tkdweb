import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { notFound } from "next/navigation";

export async function loadTranslations(locale) {
  const messages = {};

  try {
    const modules = await import(`../../locales/${locale}/${locale}-index.js`);
    return modules.default;
  } catch (error) {
    notFound();
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  const messages = await loadTranslations(locale);

  return {
    locale: requestLocale,
    messages,
  };
});

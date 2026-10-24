const BASE = "https://ccstkdrawdon.com";

export function buildAlternates(locale, path = "") {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      fr: `${BASE}/fr${path}`,
      en: `${BASE}/en${path}`,
      "x-default": `${BASE}/fr${path}`, // fallback for other languages
    },
  };
}

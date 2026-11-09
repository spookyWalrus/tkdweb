// src/app/sitemap.js
const BASE = "https://ccstkdrawdon.com";
const paths = [
  "",
  "/instructors",
  "/contact",
  "/conduct",
  "/course",
  "/history",
  "/infoletter",
  "/philosophy",
  "/vocab",
]; // your real routes

export default function sitemap() {
  return paths.flatMap((path) =>
    ["fr", "en"].map((locale) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: new Date(),
    }))
  );
}

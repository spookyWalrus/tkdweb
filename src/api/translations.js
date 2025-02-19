import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { lang } = req.query;
  const supportedLocales = ["en", "fr"];

  const locale = supportedLocales.includes(lang) ? lang : "en";
  // console.log("next filepath is here: ", process.cwd());
  const filePath = path.join(process.cwd(), "public/locales", `${locale}.json`);

  const translations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  res.status(200).json(translations);
}

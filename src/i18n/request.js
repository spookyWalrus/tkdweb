import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import fs from "fs";
import path from "path";

async function loadTranslations(locale) {
  const transSource = path.join(process.cwd(), "locales", locale);

  const files = fs.readdirSync(transSource);

  const messages = {};

  for (const file of files) {
    if (file.endsWith(".json")) {
      const namespace = file.replace(".json", "");
      const filePath = path.join(transSource, file);
      const fileContents = fs.readFileSync(filePath, "utf-8");
      messages[namespace] = JSON.parse(fileContents);
    }
  }
  // console.log("the full json block: ", messages);
  return messages;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  // console.log("requestLocale is : ", requestLocale);
  // console.log("locale from request.js: ", locale);

  const messages = await loadTranslations(locale);

  return {
    locale: requestLocale,
    messages,
  };
});

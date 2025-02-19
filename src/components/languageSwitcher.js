"use client";
import { useTranslations } from "../contexts/translationContext";
import Cookies from "js-cookie";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslations();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLocale(newLang);
    Cookies.set("NEXT_LOCALE", newLang, { path: "/" });
  };

  return (
    <div className="topBarLinks">
      <select onChange={handleLanguageChange} value={locale}>
        <option value="en">ENG</option>
        <option value="fr">FR</option>
      </select>
    </div>
  );
}

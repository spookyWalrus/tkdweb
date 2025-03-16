import { useRouter, usePathname } from "../i18n/navigation";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

export default function LangSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();
  const [lang, setLang] = useState(currentLang);

  useEffect(() => {
    setLang(currentLang);
  }, [currentLang]);

  const langSetter = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    router.push(pathname, { locale: newLang });
  };

  return (
    <div className="select is-small">
      <select value={lang} onChange={langSetter}>
        <option value="en">ENG</option>
        <option value="fr">FRA</option>
      </select>
    </div>
  );
}

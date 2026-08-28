import { useTranslation } from "react-i18next";
import "./laoding/LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  function changeLanguage(language) {
    if (currentLanguage === language) return;
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      <button type="button" className={`language-option ${currentLanguage === "ar" ? "active" : ""}`}
        onClick={() => changeLanguage("ar")} aria-pressed={currentLanguage === "ar"}>
        <span className="language-icon">ع</span><span className="language-name">العربية</span>
      </button>
      <span className="language-divider" aria-hidden="true" />
      <button type="button" className={`language-option ${currentLanguage === "en" ? "active" : ""}`}
        onClick={() => changeLanguage("en")} aria-pressed={currentLanguage === "en"}>
        <span className="language-icon en-icon">EN</span><span className="language-name">English</span>
      </button>
    </div>
  );
}

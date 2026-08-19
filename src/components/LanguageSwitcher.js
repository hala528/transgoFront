import { useTranslation } from "react-i18next";
import "./laoding/LanguageSwitcher.css";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language?.startsWith("ar") ? "ar" : "en";

  function changeLang(lng) {
    if (currentLanguage === lng) return;

    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  }

  return (
    <div className="language-switcher">
      <button
        type="button"
        className={`language-option ${
          currentLanguage === "ar" ? "active" : ""
        }`}
        onClick={() => changeLang("ar")}
      >
        <span className="language-icon">ع</span>
        <span>العربية</span>
      </button>

      <div className="language-divider"></div>

      <button
        type="button"
        className={`language-option ${
          currentLanguage === "en" ? "active" : ""
        }`}
        onClick={() => changeLang("en")}
      >
        <span className="language-icon en-icon">EN</span>
        <span>English</span>
      </button>
    </div>
  );
}
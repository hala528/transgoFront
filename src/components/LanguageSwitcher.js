import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  function changeLang(lng) {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  }

  return (
    <div className="d-flex gap-2 mt-3 px-2">
      <button onClick={() => changeLang("ar")} className="side-bar-link">
        عربي
      </button>
      <button onClick={() => changeLang("en")} className="side-bar-link">
        EN
      </button>
    </div>
  );
}
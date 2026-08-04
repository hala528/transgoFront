import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../components/dashboard/bar.css";
import {
  faCar,
  faUsers,
  faUserTie,
  faWallet,
  faClipboardList,
  faRoute,
  faTicket,
  faChartLine,
  faCommentDots,
  faStar,
  faPercent,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../../context/MnueContext";
import { WindowSize } from "../../context/WindowContext";
import Cookies from "universal-cookie";

export default function SideBar() {
  const { t, i18n } = useTranslation();
  const menu = useContext(Menu);
  const { windowSize } = useContext(WindowSize);
  const isOpen = menu.isOpen;

  const cookie = new Cookies();
  const role = cookie.get("role");

  const links = [
    {
      key: "sidebar.drivers",
      path: "driver",
      icon: faCar,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.passengers",
      path: "passenger",
      icon: faUsers,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.employees",
      path: "employee",
      icon: faUserTie,
      roles: ["admin"],
    },
    {
      key: "sidebar.category",
      path: "category",
      icon: faUserTie,
      roles: ["admin"],
    },
    {
      key: "sidebar.wallet",
      path: "wallet",
      icon: faWallet,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.auditLog",
      path: "auditLog",
      icon: faClipboardList,
      roles: ["admin"],
    },
    {
      key: "sidebar.trips",
      path: "trips",
      icon: faRoute,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.booking",
      path: "booking",
      icon: faTicket,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.reports",
      path: "Reports",
      icon: faChartLine,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.complaints",
      path: "complaints",
      icon: faCommentDots,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.rating",
      path: "rating",
      icon: faStar,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.rateCommission",
      path: "rateCommission",
      icon: faPercent,
      roles: ["admin"],
    },
    {
      key: "sidebar.revenue",
      path: "RevenueR",
      icon: faMoneyBillTrendUp,
      roles: ["admin", "employee"],
    },
    {
      key: "sidebar.notifications",
      path: "Notifi",
      icon: faMoneyBillTrendUp,
      roles: ["admin", "employee"],
    },
  ];

  const filteredLinks = links.filter((link) => link.roles.includes(role));

  function changeLang(lng) {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
    document.dir = lng === "ar" ? "rtl" : "ltr";
  }

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: windowSize < 768 && isOpen ? "block" : "none",
        }}
      ></div>

      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < 768 ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "280px" : "fit-content",
          position: windowSize < 768 ? "fixed" : "sticky",
        }}
      >
        {isOpen && <p className="subtitlebar">You Are Welcome</p>}

        {/* عرض حسب الصلاحيات */}
        {filteredLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className="d-flex align-items-center gap-2 side-bar-link"
          >
            <FontAwesomeIcon icon={link.icon} />
            <p
              className="m-0"
              style={{ display: isOpen ? "block" : "none" }}
            >
              {t(link.key)}
            </p>
          </NavLink>
        ))}

        {/* زر تبديل اللغة */}
        {/* {isOpen && (
          <div className="d-flex gap-2 mt-3 px-2">
            <button onClick={() => changeLang("ar")} className="side-bar-link">
              عربي
            </button>
            <button onClick={() => changeLang("en")} className="side-bar-link">
              EN
            </button>
          </div>
        )} */}
      </div>
    </>
  );
}
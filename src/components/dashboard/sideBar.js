import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import { Menu } from "../../context/MnueContext";
import { WindowSize } from "../../context/WindowContext";
import { dashboardNavigation } from "../../config/dashboardNavigation";
import "./bar.css";

export default function SideBar() {
  const { t } = useTranslation();
  const { isOpen, setIsOpen } = useContext(Menu);
  const { windowSize } = useContext(WindowSize);
  const role = new Cookies().get("role");
  const filteredLinks = dashboardNavigation.filter((link) => link.roles.includes(role));
  const isMobile = windowSize < 768;
  const roleLabel = role === "admin" ? t("appUsageReport.admin", "Admin") : t("appUsageReport.employee", "Employee");

  return (
    <>
      <button type="button" className={`sidebar-backdrop ${isMobile && isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)} aria-label={t("topBar.closeMenu", "Close navigation menu")}
        tabIndex={isMobile && isOpen ? 0 : -1} />
      <aside className={`side-bar ${isOpen ? "is-open" : "is-collapsed"} ${isMobile ? "is-mobile" : ""}`}
        aria-label={t("sidebar.navigation", "Dashboard navigation")}>
        <div className="sidebar-brand">
          <span className="sidebar-logo"><FontAwesomeIcon icon={faLocationDot} /></span>
          <span className="sidebar-brand-copy"><strong>TransGo</strong><small>Control Center</small></span>
        </div>
        <div className="sidebar-section-label">{t("sidebar.mainMenu", "Main menu")}</div>
        <nav className="sidebar-nav">
          {filteredLinks.map((link) => (
            <NavLink key={link.key} to={link.path} onClick={() => isMobile && setIsOpen(false)}
              className="side-bar-link" title={!isOpen ? t(link.key) : undefined}>
              <span className="sidebar-link-icon"><FontAwesomeIcon icon={link.icon} /></span>
              <span className="sidebar-link-label">{t(link.key)}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-footer-icon"><FontAwesomeIcon icon={faShieldHalved} /></span>
          <span className="sidebar-footer-copy"><small>{t("sidebar.signedInAs", "Signed in as")}</small><strong>{roleLabel}</strong></span>
        </div>
      </aside>
    </>
  );
}

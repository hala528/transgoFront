import { faBars, faChevronDown, faRightFromBracket, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "universal-cookie";
import { Axios } from "../../api/axios";
import { GET_PROFILE, LOGOUT, beasURL } from "../../api/api";
import { Menu } from "../../context/MnueContext";
import { dashboardNavigation } from "../../config/dashboardNavigation";
import LanguageSwitcher from "../LanguageSwitcher";

export default function TopBar() {
  const { isOpen, setIsOpen } = useContext(Menu);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const cookie = useMemo(() => new Cookies(), []);
  const user = cookie.get("user");
  const role = cookie.get("role");
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({ photo: null, name: "", email: "", phone_number: "" });

  const activeNavigation = dashboardNavigation.find((item) =>
    location.pathname.toLowerCase().includes(`/dashboard/${item.path.toLowerCase()}`)
  );
  const pageTitle = activeNavigation ? t(activeNavigation.key) : t("topBar.dashboard", "Dashboard");
  const displayName = user?.full_name || t("topBar.user", "User");
  const roleLabel = role === "admin" ? t("appUsageReport.admin", "Admin") : t("appUsageReport.employee", "Employee");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  async function handleLogout() {
    try {
      await Axios.post(`${beasURL}/${LOGOUT}`, {});
    } catch (error) {
      console.error(error);
    } finally {
      window.location.href = "/login";
    }
  }

  async function getProfile() {
    try {
      const response = await Axios.get(`${beasURL}/${GET_PROFILE}`);
      setProfile(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setShowProfile(true);
    }
  }

  return (
    <header className="top-bar">
      <div className="top-bar-leading">
        <button type="button" className="menu-toggle" onClick={() => setIsOpen((value) => !value)}
          aria-label={t("topBar.toggleMenu", "Toggle navigation menu")} aria-expanded={isOpen}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="page-heading">
          <span className="page-heading-eyebrow">TransGo</span>
          <h1>{pageTitle}</h1>
        </div>
      </div>

      <div className="top-bar-actions">
        <LanguageSwitcher />
        <button type="button" className="profile-trigger" onClick={getProfile}>
          <span className="profile-avatar" aria-hidden="true">
            {profile.photo ? <img src={profile.photo} alt="" /> : <FontAwesomeIcon icon={faUserCircle} />}
          </span>
          <span className="profile-copy"><strong>{displayName}</strong><small>{roleLabel}</small></span>
          <FontAwesomeIcon className="profile-chevron" icon={faChevronDown} />
        </button>
        <button type="button" className="logout-button" onClick={handleLogout}
          aria-label={t("topBar.logout")} title={t("topBar.logout")}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>

      <Modal show={showProfile} onHide={() => setShowProfile(false)} centered contentClassName="profile-modal">
        <Modal.Header closeButton><Modal.Title>{t("topBar.userProfile")}</Modal.Title></Modal.Header>
        <Modal.Body>
          <div className="profile-modal-hero">
            <div className="profile-modal-avatar">
              {profile.photo ? <img src={profile.photo} alt={profile.name || displayName} /> : <FontAwesomeIcon icon={faUserCircle} />}
            </div>
            <div><h3>{profile.name || displayName}</h3><span>{roleLabel}</span></div>
          </div>
          <dl className="profile-details">
            <div><dt>{t("walletDriver.email")}</dt><dd>{profile.email || "—"}</dd></div>
            <div><dt>{t("bookingDetails.phone")}</dt><dd>{profile.phone_number || "—"}</dd></div>
          </dl>
        </Modal.Body>
        <Modal.Footer><Button variant="outline-light" onClick={() => setShowProfile(false)}>{t("walletDriver.close")}</Button></Modal.Footer>
      </Modal>
    </header>
  );
}

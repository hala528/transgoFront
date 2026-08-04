// import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Menu } from "../../context/MnueContext";
// import { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { DropdownButton, Dropdown, Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { Axios } from "../../api/axios";
// import { LOGOUT, beasURL ,  GET_PROFILE} from "../../api/api";
// import LanguageSwitcher from "../../components/LanguageSwitcher";
// export default function TopBar() {
//   const menu = useContext(Menu);
//   const setIsOpen = menu.setIsOpen;
//  const isOpen = menu.isOpen;
//   const [name, setName] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//  const { t, i18n } = useTranslation();
//   const [profile, setProfile] = useState({
//     photo: null,
//     name: "",
//     email: "",
//     phone_number: "",
//   });

//   const navigate = useNavigate();
//   const cookie = new Cookies();
//   const user = cookie.get("user");

//   useEffect(() => {
//     if (user) {
//       setName(user.full_name);
//     } else {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   // logout
//   async function handelLogout() {
//     try {
//       await Axios.post(`${beasURL}/${LOGOUT}`, {});
//       window.location.href = "/login";
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // get profile
//   async function getProfile() {
//     try {
//       const res = await Axios.get(`${beasURL}/${GET_PROFILE}`);
//       setProfile(res.data.data);
//       setShowProfile(true);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//  function changeLang(lng) {
//     i18n.changeLanguage(lng);
//     localStorage.setItem("lang", lng);
//     document.dir = lng === "ar" ? "rtl" : "ltr";
//   }
//   return (
//     <div className="top-bar">
//       {/* left side */}
//       <div className="d-flex align-items-center gap-4">
//         <h3 className="bar-text mb-0">TransGo</h3>

//         <FontAwesomeIcon
//           onClick={() => setIsOpen((prev) => !prev)}
//           cursor="pointer"
//           icon={faBars}
//         />
//       </div>

//       {/* right side */}
//       <div className="d-flex align-items-center gap-3">
//          {isOpen && <LanguageSwitcher />}
//         {/* profile icon */}
//         <FontAwesomeIcon
//           icon={faUserCircle}
//           size="2x"
//           cursor="pointer"
//           onClick={getProfile}
//         />

//         {/* dropdown */}
//         <div className="user-dropdown">
//           <DropdownButton
//             id="dropdown-basic-button"
//             variant="primary"
//             title={name}
//           >
//             <Dropdown.Item onClick={handelLogout}>
//               Logout
//             </Dropdown.Item>
//           </DropdownButton>
        
//         </div>
//       </div>

//       {/* Profile Modal */}
//       <Modal 
//         show={showProfile}
//         onHide={() => setShowProfile(false)}
//         centered
//       >
//         <Modal.Header style={{
//             background:'#020617',
//             color:'white'
//           }} closeButton>
//           <Modal.Title >User Profile</Modal.Title>
//         </Modal.Header>

//         <Modal.Body className="text-center" style={{
//           background:'#1e1b4b',
//           color:'white'
//         }}>
//           {profile.photo ? (
//             <img
//               src={profile.photo}
//               alt="profile"
//               width="100"
//               height="100"
//               className="rounded-circle mb-3"
//             />
//           ) : (
//             <FontAwesomeIcon
//               icon={faUserCircle}
//               size="5x"
//               className="text-secondary mb-3"
//             />
//           )}

//           <p>
//             <strong>Name:</strong> {profile.name}
//           </p>

//           <p>
//             <strong>Email:</strong> {profile.email}
//           </p>

//           <p>
//             <strong>Phone:</strong> {profile.phone_number}
//           </p>
//         </Modal.Body>

//         <Modal.Footer style={{
//             background:'#020617',
//             color:'white'
//           }}>
//           <Button
//             variant="secondary"
//             onClick={() => setShowProfile(false)}
//           >
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/MnueContext";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DropdownButton, Dropdown, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Axios } from "../../api/axios";
import { LOGOUT, beasURL ,  GET_PROFILE} from "../../api/api";
import LanguageSwitcher from "../../components/LanguageSwitcher";

export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
 const isOpen = menu.isOpen;
  const [name, setName] = useState("");
  const [showProfile, setShowProfile] = useState(false);
 const { t } = useTranslation();
  const [profile, setProfile] = useState({
    photo: null,
    name: "",
    email: "",
    phone_number: "",
  });

  const navigate = useNavigate();
  const cookie = new Cookies();
  const user = cookie.get("user");

  useEffect(() => {
    if (user) {
      setName(user.full_name);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  // logout
  async function handelLogout() {
    try {
      await Axios.post(`${beasURL}/${LOGOUT}`, {});
      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  }

  // get profile
  async function getProfile() {
    try {
      const res = await Axios.get(`${beasURL}/${GET_PROFILE}`);
      setProfile(res.data.data);
      setShowProfile(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar">
      {/* left side */}
      <div className="d-flex align-items-center gap-4">
        <h3 className="bar-text mb-0">TransGo</h3>

        <FontAwesomeIcon
          onClick={() => setIsOpen((prev) => !prev)}
          cursor="pointer"
          icon={faBars}
        />
      </div>

      {/* right side */}
      <div className="d-flex align-items-center gap-3">
          {isOpen && <LanguageSwitcher />}
        {/* profile icon */}
        <FontAwesomeIcon
          icon={faUserCircle}
          size="2x"
          cursor="pointer"
          onClick={getProfile}
        />

        {/* dropdown */}
        <div className="user-dropdown">
          <DropdownButton
            id="dropdown-basic-button"
            variant="primary"
            title={name}
          >
            <Dropdown.Item onClick={handelLogout}>
              {t("topBar.logout")}
            </Dropdown.Item>
          </DropdownButton>
        
        </div>
      </div>

      {/* Profile Modal */}
      <Modal 
        show={showProfile}
        onHide={() => setShowProfile(false)}
        centered
      >
        <Modal.Header style={{
            background:'#020617',
            color:'white'
          }} closeButton>
          <Modal.Title >{t("topBar.userProfile")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center" style={{
          background:'#1e1b4b',
          color:'white'
        }}>
          {profile.photo ? (
            <img
              src={profile.photo}
              alt="profile"
              width="100"
              height="100"
              className="rounded-circle mb-3"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              size="5x"
              className="text-secondary mb-3"
            />
          )}

          <p>
            <strong>{t("detailsEmployee.fullName")}:</strong> {profile.name}
          </p>

          <p>
            <strong>{t("walletDriver.email")}:</strong> {profile.email}
          </p>

          <p>
            <strong>{t("bookingDetails.phone")}:</strong> {profile.phone_number}
          </p>
        </Modal.Body>

        <Modal.Footer style={{
            background:'#020617',
            color:'white'
          }}>
          <Button
            variant="secondary"
            onClick={() => setShowProfile(false)}
          >
            {t("walletDriver.close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
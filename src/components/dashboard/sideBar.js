import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../components/dashboard/bar.css";
import { faCar,
   
    faUsers,
     faUserTie, 
     faWallet ,
     faClipboardList,
     faRoute,
     faTicket,
     faChartLine,
     faCommentDots,
     faStar,
     faPercent,
     faMoneyBillTrendUp
    } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../context/MnueContext";
import { WindowSize } from "../../context/WindowContext";
import Cookies from "universal-cookie";

export default function SideBar() {
  const menu = useContext(Menu);
  const { windowSize } = useContext(WindowSize);
  const isOpen = menu.isOpen;

  const cookie = new Cookies();
  const role = cookie.get("role"); 

  const links = [
    
    {
      name: "Managment Drivers",
      path: "driver",
      icon: faCar,
      roles: ["admin" , "employee"],
    },
    {
      name: "Managment Passenger",
      path: "passenger",
      icon: faUsers,
      roles: ["admin" , "employee"],
    },
    {
      name: "Managment Employee",
      path: "employee",
      icon: faUserTie,
      roles: ["admin"],
    },
    {
      name: "Free Wallet",
      path: "wallet",
      icon: faWallet,
      roles: ["admin", "employee"],
    },
    {
      name: "Audit Logs",
      path: "auditLog",
      icon: faClipboardList,
      roles: ["admin"],
    },
    
    {
      name: "Managment Trips",
      path: "trips",
      icon: faRoute,
      roles: ["admin", "employee"],
    },
     {
      name: "Managment Booking",
      path: "booking",
      icon: faTicket,
      roles: ["admin", "employee"],
    },
    {

      name: "Reports & Analytics",
      path: "Reports",
      icon: faChartLine,
      roles: ["admin", "employee"],
    },
     
    {
      name: "Managment Complaints",
      path: "complaints",
      icon: faCommentDots,
      roles: ["admin", "employee"],
    },
    {
      name: "View Rating",
      path: "rating",
      icon: faStar,
      roles: ["admin", "employee"],
    },
    {
      name: "Rate Commission",
      path: "rateCommission",
      icon: faPercent,
      roles: ["admin"],
    },
        {
      name: "Revenue",
      path: "RevenueR",
      icon: faMoneyBillTrendUp,
      roles: ["admin", "employee"],
    }
    

  ];

 
  const filteredLinks = links.filter((link) =>
    link.roles.includes(role)
  );

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
          width: isOpen ? "270px" : "fit-content",
          position: windowSize < 768 ? "fixed" : "sticky",
        }}
      >
        {isOpen && <p className="subtitlebar">You Are Welcome</p>}

        {/*  عرض حسب الصلاحيات */}
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
              {link.name}
            </p>
          </NavLink>
        ))}
      </div>
    </>
  );
}
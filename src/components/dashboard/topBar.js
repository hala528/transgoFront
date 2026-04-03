import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/MnueContext";
import { useContext, useEffect, useState } from "react";



 import {  DropdownButton ,Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
  import Cookies from "universal-cookie";
export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");
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

  return (
    <div className="top-bar">
   
      <div className="d-flex align-items-center gap-4">
        <h3 className="bar-text mb-0">TransGo</h3>
        <FontAwesomeIcon
          onClick={() => setIsOpen((prev) => !prev)}
          cursor="pointer"
          icon={faBars}
        />
      </div>

    
      <div className="user-dropdown">
        <DropdownButton
       
          id="dropdown-basic-button"
          variant="primary"
          title={name}
        >
          <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}
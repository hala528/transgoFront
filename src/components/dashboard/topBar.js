import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/MnueContext";
import { useContext } from "react";
import { Prev } from "react-bootstrap/esm/PageItem";

export default function TopBar(){
      const menu = useContext(Menu);
      const setIsOpen = menu.setIsOpen;
    return (
        <div className="top-bar ">
            <div className="mune-bar">
            <h3 className="bar-text">TransGo</h3>
            <FontAwesomeIcon
            onClick={()=> setIsOpen((Prev)=> !Prev)}
            cursor={PointerEvent} icon={faBars}  />
            </div>
        </div>
    )
}
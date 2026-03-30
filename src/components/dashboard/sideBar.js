import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import'../../components/dashboard/bar.css';

import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Menu } from '../../context/MnueContext';
import { WindowSize } from '../../context/WindowContext';
export default function SideBar(){
    const menu = useContext(Menu);
   const { windowSize } = useContext(WindowSize);
const isOpen = menu.isOpen;
return(
<div
  className='side-bar pt-3'
  style={{
    left: windowSize < 768 ? (isOpen ? 0 : "-100%") : 0,
    width: isOpen ? "270px" : "fit-content"
  }}
>
       <NavLink to={'driver'} className="d-flex align-items-center gap-2 side-bar-link">
        <FontAwesomeIcon  icon={faUsers} />
       <p className='m-0  ' style={{
        display: isOpen ? "block" : "none",
        
       }}> Managment Drivers</p> 
        </NavLink>
         <NavLink to={'/'} className="d-flex align-items-center gap-2 side-bar-link">
       
        <FontAwesomeIcon icon={faUsers} />
      
       <p className='m-0  ' style={{
        display: isOpen ? "block" : "none",
       }}> Managment user</p> 
        </NavLink>
        
       </div>
    )
}
import { Outlet } from "react-router-dom";

import SideBar from "../../components/dashboard/sideBar";
import TopBar from "../../components/dashboard/topBar";
import "C:/Users/User/Desktop/tranGo/frontend/src/pages/dashboard/dashborad.css"

export default function Dashborad(){
    return(


        
        <div className="position-relative ">
            <TopBar />
            <div className="dashboard d-flex align-items gap-1" style={{marginTop: "70px"}}>
            <SideBar />
           
            <Outlet  />
            </div>
        
        </div>
        
    )
}
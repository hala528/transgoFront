import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";

import SideBar from "../../components/dashboard/sideBar";
import TopBar from "../../components/dashboard/topBar";
import { Menu } from "../../context/MnueContext";
// import "C:/Users/User/Desktop/tranGo/frontend/src/pages/dashboard/dashborad.css"
import "../dashboard/dashborad.css"
export default function Dashborad(){
    const { isOpen } = useContext(Menu);
    const location = useLocation();
    const contentRef = useRef(null);

    useEffect(() => {
        contentRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [location.pathname]);

    return(


        
        <div className={`dashboard-shell ${isOpen ? "sidebar-expanded" : "sidebar-minimized"}`}>
            <TopBar />
            <div className="dashboard">
                <SideBar />
                <main ref={contentRef} className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        
        </div>
        
    )
}

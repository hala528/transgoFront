import { Navigate, Outlet } from "react-router-dom";
 import Cookies from "universal-cookie";

 export default function RequireAuth(){
    const cookie =new Cookies();
    const token = cookie.get("transtop");
    return token ? <Outlet /> : <Navigate to={"/login"} replace={true} />


}
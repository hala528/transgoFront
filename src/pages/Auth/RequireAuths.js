import { Navigate, Outlet } from "react-router-dom";
 import Cookies from "universal-cookie";
import LoadingSubmit from "../../components/laoding/loading";
import Err403 from "./403";

export default function RequireAuth({ allowedRole }) {
  const cookie = new Cookies();
  const token = cookie.get("transtop");
const role = cookie.get("role");



  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    return <LoadingSubmit />;
  }

  if (allowedRole && role !== allowedRole) {
  return <Err403 />;
}

  return <Outlet />;
}
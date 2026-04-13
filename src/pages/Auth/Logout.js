import { Axios } from "../../api/axios";
import { LOGOUT, beasURL } from "../../api/api";
export default function Logout() {
   async function handelLogout() {
    try{
        const res = await Axios.post(`${beasURL}/${LOGOUT}`, {}, {
    })
    console.log(res);
}
    catch(err){
        console.log(err);
   }
   }
  return (
    <button onClick={handelLogout}></button>
  );
}
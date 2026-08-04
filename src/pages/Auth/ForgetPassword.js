
// import { useState } from "react"
// import { beasURL , SENDOTP} from "../../api/api";
// import LoadingSubmit from "../../components/laoding/loading";
// import { useNavigate } from "react-router-dom";
// import { Axios } from "../../api/axios";


// export default function ForgetPassword(){
//      //States
//    const[form,setForm] = useState({
          
//            email:"",
          
       
//        });
//        const [success, setSuccess] = useState("");
//          const navigate = useNavigate();
//        //loading 
//        const [loading,setLoading] = useState(false);
//        //رسالة الخطا
//         const[err,errset]=useState("")
//        //handleChange 
//        function handleChange(e){
//    setForm({...form, [e.target.name]:e.target.value})
   
//        }
//        //hand submit
//      async function handleSubmit(e) {
//   e.preventDefault();
//   setLoading(true);
//   errset("");
//   setSuccess("");

//   try {
//     const res = await Axios.post(`${beasURL}/${SENDOTP}`, form);

//     setLoading(false);

//     // رسالة نجاح من السيرفر
//     setSuccess(res.data.message || "تم إرسال الرمز بنجاح");

   
//      navigate("/otp");

//   } catch (err) {
//     setLoading(false);

//     if (err.response) {
//       errset(err.response.data.message || "حدث خطأ");
//     } else {
//       errset("Server error");
//     }
//   }
// }
   
//        return (
//         <>
//     {loading && <LoadingSubmit />}
    
//     <div className="login-page">
//       <div className="login-card">

//         {/* LEFT SIDE */}
//        <div className="logo-box">
  
  
// </div>

//         {/* RIGHT SIDE */}
//         <div className="login-right">
//           <form className="form" onSubmit={handleSubmit}>

//             <h2>Forget Password</h2>
//             <p className="subtitle">enter your Email :</p>

//             <div className="form-custom">
//               <input
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//                 required
//               />
//             </div>

            
           

//             <button className="btn-login">OK →</button>

           
//             {success !== "" && <span className="success">{success}</span>}
// {err !== "" && <span className="error">{err}</span>}
//             {err !== "" && <span className="error">{err}</span>}
//           </form>
//         </div>

//       </div>
//     </div>
//   </>
// );
//    } 
import { useState } from "react"
import { beasURL , SENDOTP} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/axios";
import { useTranslation } from "react-i18next";


export default function ForgetPassword(){
     const { t } = useTranslation();
     //States
   const[form,setForm] = useState({
          
           email:"",
          
       
       });
       const [success, setSuccess] = useState("");
         const navigate = useNavigate();
       //loading 
       const [loading,setLoading] = useState(false);
       //رسالة الخطا
        const[err,errset]=useState("")
       //handleChange 
       function handleChange(e){
   setForm({...form, [e.target.name]:e.target.value})
   
       }
       //hand submit
     async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  errset("");
  setSuccess("");

  try {
    const res = await Axios.post(`${beasURL}/${SENDOTP}`, form);

    setLoading(false);

    setSuccess(res.data.message || t("auth.codeSentSuccess"));

   
     navigate("/otp");

  } catch (err) {
    setLoading(false);

    if (err.response) {
      errset(err.response.data.message || t("addDriver.errorOccurred"));
    } else {
      errset(t("addDriver.serverError"));
    }
  }
}
   
       return (
        <>
    {loading && <LoadingSubmit />}
    
    <div className="login-page">
      <div className="login-card">

        {/* LEFT SIDE */}
       <div className="logo-box">
  
  
</div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <form className="form" onSubmit={handleSubmit}>

            <h2>{t("auth.forgetPassword")}</h2>
            <p className="subtitle">{t("auth.enterYourEmail")}</p>

            <div className="form-custom">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("auth.enterEmail")}
                required
              />
            </div>

            
           

            <button className="btn-login">{t("auth.ok")} →</button>

           
            {success !== "" && <span className="success">{success}</span>}
{err !== "" && <span className="error">{err}</span>}
            {err !== "" && <span className="error">{err}</span>}
          </form>
        </div>

      </div>
    </div>
  </>
);
   }

import OtpInput from "react-otp-input";
import { useState } from "react";
import { beasURL , VERFIEotp} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/axios";
import { useTranslation } from "react-i18next";



export default function CodePassword(){
      const { t } = useTranslation();
      const [otp, setOtp] = useState("");
      const[form,setForm] = useState({
          
           email:"",
          
       
       });
       const [success, setSuccess] = useState("");
       //loading 
       const [loading,setLoading] = useState(false);
       //رسالة الخطا
        const[err,errset]=useState("");
        const navigate = useNavigate();
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
    const res = await Axios.post(`${beasURL}/${VERFIEotp}`, {
      email: form.email,
      otp: otp,
    });

    setLoading(false);

    setSuccess(res.data.message || t("auth.verifiedSuccess"));

    
     navigate("/resetPassword");

  } catch (err) {
    setLoading(false);

    if (err.response) {
      errset(err.response.data.message || t("auth.invalidOtp"));
    } else {
      errset(t("addDriver.serverError"));
    }
  }
}
    return(
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
        
                    <h2>{t("auth.otpCode")}</h2>
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
            <p className="subtitle">{t("auth.enterOtpCode")}</p>
        
                    <div className="otp-container">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />
    </div>
        
                    
                  
        
                    <button className="btn-login">{t("auth.ok")} →</button>
        
                   {success !== "" && <span className="success">{success}</span>}
{err !== "" && <span className="error">{err}</span>}
        
                
                  </form>
                </div>
        
              </div>
            </div>
          </>
    );

}
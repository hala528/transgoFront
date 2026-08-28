
import { useState } from "react"
import { beasURL , RESETPASSWORD} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";
import { Axios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RestPassword(){
    const { t } = useTranslation();
    //States
   const [form, setForm] = useState({
  email: "",
  password: "",
  password_confirmation: "",
});
const [success, setSuccess] = useState("");
       //loading 
       const [loading,setLoading] = useState(false);
       const navigate = useNavigate();
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
    const res = await Axios.post(`${beasURL}/${RESETPASSWORD}`, form);

    setLoading(false);

    setSuccess(res.data.message || t("auth.passwordResetSuccess"));

   
    setTimeout(() => {
     navigate("/login");
    }, 2000);

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

            <h2>{t("auth.updateYourPassword")}</h2>
            <p className="subtitle">{t("auth.setSecurePassword")}</p>
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

<div className="form-custom">
  <input
    name="password"
    type="password"
    value={form.password}
    onChange={handleChange}
    placeholder={t("auth.enterNewPassword")}
    required
  />
</div>

<p className="subtitle">{t("auth.confirmYourPassword")}</p>

<div className="form-custom">
  <input
    name="password_confirmation"
    type="password"
    value={form.password_confirmation}
    onChange={handleChange}
    placeholder={t("auth.confirmPassword")}
    required
  />
</div>

         

            <button className="btn-login">{t("auth.login")} →</button>

           

            {success !== "" && <span className="success">{success}</span>}
{err !== "" && <span className="error">{err}</span>}
          </form>
        </div>

      </div>
    </div>
  </>
);
   }
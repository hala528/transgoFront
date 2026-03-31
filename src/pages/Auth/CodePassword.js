import OtpInput from "react-otp-input";
import { useState } from "react";


import { beasURL , VERFIEotp} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../api/axios";



export default function CodePassword(){
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

    setSuccess(res.data.message || "تم التحقق بنجاح");

    
     navigate("/resetPassword");

  } catch (err) {
    setLoading(false);

    if (err.response) {
      errset(err.response.data.message || "OTP غير صحيح");
    } else {
      errset("Server error");
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
        
                    <h2>OTP Code</h2>
                    <p className="subtitle">enter Your Email :</p>
                    <div className="form-custom">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>
            <p className="subtitle">enter otp code :</p>
        
                    <div className="otp-container">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />
    </div>
        
                    
                  
        
                    <button className="btn-login">OK →</button>
        
                   {success !== "" && <span className="success">{success}</span>}
{err !== "" && <span className="error">{err}</span>}
        
                
                  </form>
                </div>
        
              </div>
            </div>
          </>
    );

}
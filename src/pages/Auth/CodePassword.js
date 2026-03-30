import OtpInput from "react-otp-input";
import { useState } from "react";
import axios from "axios";

import { beasURL , LOGIN} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";



export default function CodePassword(){
      const [otp, setOtp] = useState("");
      const[form,setForm] = useState({
          
           number:"",
          
       
       });
       //loading 
       const [loading,setLoading] = useState(false);
       //رسالة الخطا
        const[err,errset]=useState("")
       //handleChange 
       function handleChange(e){
   setForm({...form, [e.target.name]:e.target.value})
   
       }
       //hand submit
      async function handleSubmit(e){
         e.preventDefault();
         setLoading(true);
         try{
            await axios.post(`${beasURL}/${LOGIN}`, form)
            setLoading(false);
            window.location.pathname="/" ;
   
         }
         catch(err){
           setLoading(false);
           if(err.response.status=== 422){
             errset('email or password failed')
           }else{
             errset('internet server error')
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
        
                   
        
                    {err !== "" && <span className="error">{err}</span>}
                  </form>
                </div>
        
              </div>
            </div>
          </>
    );

}
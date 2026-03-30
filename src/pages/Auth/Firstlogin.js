import axios from "axios";
import { useState } from "react"
import { beasURL , LOGIN} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";

export default function FirstLogin(){
    //States
   const[form,setForm] = useState({
          
           email:"",
           password:""
       
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

            <h2>Updata Your Password</h2>
           
             <div className="form-custom">
              <input
                name="oldpassword"
                type="password"
                value={form.email}
                onChange={handleChange}
                placeholder="Old Password"
                required
              />
            </div>
             <p className="subtitle">enter your new password</p>

            <div className="form-custom">
              <input
                name="password"
                type="password"
                value={form.email}
                onChange={handleChange}
                placeholder="New Password"
                required
              />
            </div>
            <p className="subtitle">confarm your password</p>

            <div className="form-custom">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Conforam Password"
                required
              />
            </div>

         

            <button className="btn-login">Login →</button>

           

            {err !== "" && <span className="error">{err}</span>}
          </form>
        </div>

      </div>
    </div>
  </>
);
   } 
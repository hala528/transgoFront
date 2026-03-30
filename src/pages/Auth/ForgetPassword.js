import axios from "axios";
import { useState } from "react"
import { beasURL , LOGIN} from "../../api/api";
import LoadingSubmit from "../../components/laoding/loading";


export default function ForgetPassword(){
     //States
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

            <h2>Forget Password</h2>
            <p className="subtitle">enter your number :</p>

            <div className="form-custom">
              <input
                name="number"
                type="number"
                value={form.number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
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
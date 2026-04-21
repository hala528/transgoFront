import { Col, Form,  } from "react-bootstrap";
import { Axios } from "../../../../api/axios";
import {  ADDEMPLOYEE, beasURL } from "../../../../api/api";
import { useState } from "react";
import { useNavigate} from "react-router-dom";


export default function AddEmployee(){
  const [form, setForm] = useState({
  full_name: "",
  phone: "",
  email: "",
  role: "",
  password: "",
});

const Navigate = useNavigate();

const [loading, setLoading] = useState(false);
const [err, errset] = useState("");
const [success, setSuccess] = useState("");

//handchange
function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}





//handsimbit 
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);
  errset("");
  setSuccess("");

  try {
    const data = new FormData();

   
    data.append("full_name", form.full_name);
    data.append("phone", form.phone);
    data.append("email", form.email);
    data.append("role", form.role);
    data.append("password", form.password);

 

   
   

    const res = await Axios.post(`${beasURL}/${ADDEMPLOYEE}`, data, {
      
    });

    setLoading(false);
    setSuccess(res.data.message || "تم إضافة الموظف بنجاح");
    setTimeout(() => {
    Navigate("/dashboard/employee"); // غيرها حسب الراوت عندك
    }, 2000);

  } catch (err) {
    setLoading(false);

    if (err.response) {
      errset(err.response.data.message || "حدث خطأ");
    } else {
      errset("Server error");
    }
  }
}
    return(
        <div className="w-100 p-2">
             <h3 style={{color:'white', flex:1 ,padding:5}}>Add Employee :</h3>
              <h3 className="subtitle-driver-bold">enter informtion of employee :</h3>
            
      
      
      
       <Form style={{
      marginBottom:'10px',
      borderRadius: '10px',
      color: 'white',
    }}>

         
       <p className="subtitle-driver">enter full name :</p>
        <Col >
          <Form.Control 
          placeholder="enter full name"
          name="full_name"
          onChange={handleChange}
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      alignItems:'flex-start',
      color: 'white',
      
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <p className="subtitle-driver">enter phone number :</p>
        <Col >
          <Form.Control 
          placeholder="enter phone number"
          name="phone"
          onChange={handleChange}
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      alignItems:'flex-start',
      color: 'white',
      
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <p className="subtitle-driver">enter email :</p>
        <Col >
          <Form.Control 
          placeholder="enter email"
          name="email"
          onChange={handleChange}
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      alignItems:'flex-start',
      color: 'white',
      
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <p className="subtitle-driver">enter role :</p>
        <Col >
         <Form.Select name="role" onChange={handleChange} className="custom-selectt"
    style={{
      borderRadius: '3px',
      
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)',
      width:'100%',
    }}>
      <option>Open this select role</option>
      <option value="employee">employee</option>
      <option value="admin">admin</option>
    
    </Form.Select>
        </Col>
       
        <p className="subtitle-driver">enter password :</p>
        <Col >
          <Form.Control 
          placeholder="enter password"
          name="password"
          type="password"
          onChange={handleChange}
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      alignItems:'flex-start',
      color: 'white',
    
      
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        
        
    
    </Form>
     
   
     
   
      <button className="btn-login" onClick={handleSubmit} disabled={loading}>
  {loading ? "Loading..." : "Add Employee"}
</button>
{success && <span className="success">{success}</span>}
{err && <span className="error">{err}</span>}
        </div>
    )
}
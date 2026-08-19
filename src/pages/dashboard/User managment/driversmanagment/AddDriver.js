// import { Col, Form, Row } from "react-bootstrap";
// import { Axios } from "../../../../api/axios";
// import { ADDDRIVER, beasURL, VEHICLE_CATEGORIES } from "../../../../api/api";
// import { useState, useEffect } from "react";
// import{ useNavigate } from "react-router-dom";


// export default function AddDriver(){
//   const [form, setForm] = useState({
//   full_name: "",
//   phone: "",
//   email: "",
//   address: "",
//   car_type: "",
//   id_card:"",
//   seat_capacity:"",
//    vehicle_category_id:""
// });

// const [files, setFiles] = useState({
  
//   license_image: null,
//   personal_photo: null,
//   mechanical_car: null,
//   vehicle_images: [],
// });

// const [loading, setLoading] = useState(false);
// const [err, errset] = useState("");
// const [success, setSuccess] = useState("");
// const [categories, setCategories] = useState([]);
// const navigate = useNavigate();

// //handchange
// function handleChange(e) {
//   setForm({ ...form, [e.target.name]: e.target.value });
// }
// //hand files
// function handleFileChange(e) {
//   setFiles({ ...files, [e.target.name]: e.target.files[0] });
// }


// function handleMultiFiles(e) {
//   setFiles({ ...files, vehicle_images: e.target.files });
// }
// //handsimbit 
// async function handleSubmit(e) {
//   e.preventDefault();
//   setLoading(true);
//   errset("");
//   setSuccess("");

//   try {
//     const data = new FormData();

   
//     data.append("full_name", form.full_name);
//     data.append("phone", form.phone);
//     data.append("email", form.email);
//     data.append("address", form.address);
//     data.append("car_type", form.car_type);
//     data.append("id_card", form.id_card);
//     data.append("seat_capacity", form.seat_capacity);
//     data.append("vehicle_category_id", form.vehicle_category_id)
   
   
//     data.append("license_image", files.license_image);
//     data.append("personal_photo", files.personal_photo);
//     data.append("mechanical_car", files.mechanical_car);
 
   
//     for (let i = 0; i < files.vehicle_images.length; i++) {
//       data.append(`vehicle_images[${i}]`, files.vehicle_images[i]);
//     }

//     const res = await Axios.post(`${beasURL}/${ADDDRIVER}`, data);

// console.log("Full Response:", res);
// console.log("Data:", res.data);

//     setLoading(false);
//     setSuccess(res.data.message || "تم إضافة السائق بنجاح");
//     setTimeout(() => {
//       navigate("/dashboard/driver");
//     }, 2000);

//   } catch (err) {
//     setLoading(false);

//     if (err.response) {
//       errset(err.response.data.message || "حدث خطأ");
//     } else {
//       errset("Server error");
//     }
//   }
// }
// useEffect(() => {

//   const getCategories = async () => {

//     try {

//       const res = await Axios.get(
//         `${beasURL}/${VEHICLE_CATEGORIES}`
//       );


//       setCategories(
//         res.data.data.items || []
//       );


//     } catch(err){

//       console.log(err);

//     }

//   };


//   getCategories();


// }, []);
//     return(
//         <div className="w-100 p-2">
//              <h3 style={{color:'white', flex:1 ,padding:5}}>Add Driver :</h3>
//               <h3 className="subtitle-driver-bold">enter informtion of driver :</h3>
//               <Form style={{
//       marginBottom:'10px',
//       borderRadius: '3px',
//       color: 'white',
//     }}>
//       <Row>
//         <Col >
//           <Form.Control 
//           name="full_name"
//           placeholder="enter name"
//           onChange={handleChange}
//           className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
//     }}
//           />
//         </Col>
//         <Col >
//           <Form.Control 
//           placeholder="enter email"
//           name="email"
//           onChange={handleChange}
//           className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
//     }}
//           />
//         </Col>
//         <Col>
//           <Form.Control placeholder="enter number"
//           name="phone"
//           onChange={handleChange}
//            className="custom-input-driver"
//     style={{
     
//       borderRadius: '3px',
    
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
     
//     }}
//           />
//         </Col>
//         <Col>
//           <Form.Control placeholder="enter addres"
//           name="address"
//           onChange={handleChange}
//            className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)' }}
//           />
//         </Col>
//       </Row>
//     </Form>
//        <p className="subtitle-driver">enter a photo of personal Id :</p>
   
      
//     <Form.Group   controlId="formFileMultiple" className="mb-3" >
//     <Form.Control  type="file"
//     name="license_image"
//      onChange={handleFileChange}
//     multiple  className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
//     }} />
//       </Form.Group>
//        <p className="subtitle-driver">enter a personal photo :</p>
//     <Form.Group   controlId="formFileMultiple" className="mb-3" >
//     <Form.Control  type="file" 
//     name="personal_photo"
//     onChange={handleFileChange}
//     multiple  className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
//     }} />
//       </Form.Group>
//        <Form style={{
//       marginBottom:'10px',
//       borderRadius: '10px',
//       color: 'white',
//     }}>

//           <h3 className="subtitle-driver-bold">enter vehicle information :</h3>
//       <Row>
//         <Col >
//           <Form.Control 
//           placeholder="enter type car"
//           name="car_type"
//           onChange={handleChange}
//           className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       alignItems:'flex-start',
//       color: 'white',
      
//       background:'rgba(255, 255, 255, 0.15)'
//     }}
//           />
//         </Col>
//          <Col>
//           <Form.Control placeholder="id-card"
//           name="id_card"
//           onChange={handleChange}
//            className="custom-input-driver"
//     style={{
     
//       borderRadius: '3px',
    
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
     
//     }}
//           />
//         </Col>
//         <Col>
//           <Form.Control placeholder="enter seat capacity"
//           name="seat_capacity"
//           onChange={handleChange}
//            className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)' }}
//           />
//         </Col>
//         <Col >
//         <Form.Select

// name="vehicle_category_id"

// value={form.vehicle_category_id}

// onChange={handleChange}

// className="custom-selectt"

// style={{
//   borderRadius:'3px',
//   color:'white',
//   background:'rgba(255,255,255,0.15)'
// }}

// >

// <option value="">
// Select Vehicle Category
// </option>


// {
// categories.map((item)=>(

// <option
//  key={item.category_id}
//  value={item.category_id}
// >

// {item.name}

// </option>

// ))
// }


// </Form.Select>
//         </Col>
//         </Row>
        
        
    
//     </Form>
//      <p className="subtitle-driver">enter machancail car :</p>
//     <Form.Group   controlId="formFileMultiple" className="mb-3" >
//     <Form.Control  type="file"
//     name="mechanical_car"
//     onChange={handleFileChange}
//     multiple  className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
//     }} />
//       </Form.Group>
//      <p className="subtitle-driver">enter a four photo for car :</p>
//     <Form.Group   controlId="formFileMultiple" className="mb-3" >
//     <Form.Control  type="file"
//     onChange={handleMultiFiles}
//     multiple  className="custom-input-driver"
//     style={{
//       borderRadius: '3px',
//       color: 'white',
//       background:'rgba(255, 255, 255, 0.15)'
//     }} />
//       </Form.Group>
//       <button className="btn-login" onClick={handleSubmit} disabled={loading}>
//   {loading ? "Loading..." : "Add Driver"}
// </button>
// {success && <span className="success">{success}</span>}
// {err && <span className="error">{err}</span>}
//         </div>
//     )
// }
import { Col, Form, Row } from "react-bootstrap";
import { Axios } from "../../../../api/axios";
import { ADDDRIVER, beasURL, VEHICLE_CATEGORIES } from "../../../../api/api";
import { useState, useEffect } from "react";
import{ useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


export default function AddDriver(){
  const { t } = useTranslation();
  const [form, setForm] = useState({
  full_name: "",
  phone: "",
  email: "",
  address: "",
  car_type: "",
  id_card:"",
  seat_capacity:"",
   vehicle_category_id:""
});

const [files, setFiles] = useState({
  
  license_image: null,
  personal_photo: null,
  mechanical_car: null,
  vehicle_images: [],
});

const [loading, setLoading] = useState(false);
const [err, errset] = useState("");
const [success, setSuccess] = useState("");
const [showPasswordModal, setShowPasswordModal] = useState(false);
const [temporaryPassword, setTemporaryPassword] = useState("");
const [categories, setCategories] = useState([]);
const navigate = useNavigate();

//handchange
function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}
//hand files
function handleFileChange(e) {
  setFiles({ ...files, [e.target.name]: e.target.files[0] });
}


function handleMultiFiles(e) {
  setFiles({ ...files, vehicle_images: e.target.files });
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
    data.append("address", form.address);
    data.append("car_type", form.car_type);
    data.append("id_card", form.id_card);
    data.append("seat_capacity", form.seat_capacity);
    data.append("vehicle_category_id", form.vehicle_category_id)
   
   
    data.append("license_image", files.license_image);
    data.append("personal_photo", files.personal_photo);
    data.append("mechanical_car", files.mechanical_car);
 
   
    for (let i = 0; i < files.vehicle_images.length; i++) {
      data.append(`vehicle_images[${i}]`, files.vehicle_images[i]);
    }

    const res = await Axios.post(`${beasURL}/${ADDDRIVER}`, data);

console.log("Full Response:", res);
console.log("Data:", res.data);

    setLoading(false);

const password = res.data?.data?.temporary_password;

setTemporaryPassword(password || "");
setSuccess(res.data.message || t("addDriver.addSuccess"));
setShowPasswordModal(true);

  } catch (err) {
    setLoading(false);

    if (err.response) {
      errset(err.response.data.message || t("addDriver.errorOccurred"));
    } else {
      errset(t("addDriver.serverError"));
    }
  }
}
useEffect(() => {

  const getCategories = async () => {

    try {

      const res = await Axios.get(
        `${beasURL}/${VEHICLE_CATEGORIES}`
      );


      setCategories(
        res.data.data.items || []
      );


    } catch(err){

      console.log(err);

    }

  };


  getCategories();


}, []);
    return(
        <div className="w-100 p-2">
             <h3 style={{color:'white', flex:1 ,padding:5}}>{t("addDriver.pageTitle")}</h3>
              <h3 className="subtitle-driver-bold">{t("addDriver.enterDriverInfo")}</h3>
              <Form style={{
      marginBottom:'10px',
      borderRadius: '3px',
      color: 'white',
    }}>
      <Row>
        <Col >
          <Form.Control 
          name="full_name"
          placeholder={t("addDriver.enterName")}
          onChange={handleChange}
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <Col >
          <Form.Control 
          placeholder={t("addDriver.enterEmail")}
          name="email"
          onChange={handleChange}
          className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }}
          />
        </Col>
        <Col>
          <Form.Control placeholder={t("addDriver.enterNumber")}
          name="phone"
          onChange={handleChange}
           className="custom-input-driver"
    style={{
     
      borderRadius: '3px',
    
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
     
    }}
          />
        </Col>
        <Col>
          <Form.Control placeholder={t("addDriver.enterAddress")}
          name="address"
          onChange={handleChange}
           className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)' }}
          />
        </Col>
      </Row>
    </Form>
       <p className="subtitle-driver">{t("addDriver.enterIdPhoto")}</p>
   
      
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file"
    name="license_image"
     onChange={handleFileChange}
    multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <p className="subtitle-driver">{t("addDriver.enterPersonalPhoto")}</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file" 
    name="personal_photo"
    onChange={handleFileChange}
    multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <Form style={{
      marginBottom:'10px',
      borderRadius: '10px',
      color: 'white',
    }}>

          <h3 className="subtitle-driver-bold">{t("addDriver.enterVehicleInfo")}</h3>
      <Row>
        <Col >
          <Form.Control 
          placeholder={t("addDriver.enterCarType")}
          name="car_type"
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
         <Col>
          <Form.Control placeholder={t("addDriver.idCard")}
          name="id_card"
          onChange={handleChange}
           className="custom-input-driver"
    style={{
     
      borderRadius: '3px',
    
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
     
    }}
          />
        </Col>
        <Col>
          <Form.Control placeholder={t("addDriver.enterSeatCapacity")}
          name="seat_capacity"
          onChange={handleChange}
           className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)' }}
          />
        </Col>
        <Col >
        <Form.Select

name="vehicle_category_id"

value={form.vehicle_category_id}

onChange={handleChange}

className="custom-selectt"

style={{
  borderRadius:'3px',
  color:'white',
  background:'rgba(255,255,255,0.15)'
}}

>

<option value="">
{t("addDriver.selectVehicleCategory")}
</option>


{
categories.map((item)=>(

<option
 key={item.category_id}
 value={item.category_id}
>

{item.name}

</option>

))
}


</Form.Select>
        </Col>
        </Row>
        
        
    
    </Form>
     <p className="subtitle-driver">{t("addDriver.enterMechanicalCar")}</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file"
    name="mechanical_car"
    onChange={handleFileChange}
    multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
     <p className="subtitle-driver">{t("addDriver.enterFourCarPhotos")}</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file"
    onChange={handleMultiFiles}
    multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
      <button className="btn-login" onClick={handleSubmit} disabled={loading}>
  {loading ? t("common.loading") : t("addDriver.addDriverBtn")}
</button>
{success && <span className="success">{success}</span>}
{err && <span className="error">{err}</span>}
{showPasswordModal && (
  <div className="password-modal-overlay">
    <div className="password-modal">

      <div className="password-modal-icon">
        ✓
      </div>

      <h3>تمت إضافة السائق بنجاح</h3>

      <p className="password-modal-description">
        تم إنشاء حساب السائق بنجاح.
        <br />
        يرجى حفظ كلمة المرور التالية وإعطاؤها للسائق.
      </p>

      <div className="password-box">
        <span className="password-label">
          كلمة المرور المؤقتة
        </span>

        <div className="password-value">
          {temporaryPassword}
        </div>
      </div>

      <p className="password-warning">
        ⚠️ احرص على حفظ كلمة المرور قبل المتابعة.
      </p>

      <button
        className="password-modal-btn"
        onClick={() => {
          setShowPasswordModal(false);
          navigate("/dashboard/driver");
        }}
      >
        موافق
      </button>

    </div>
  </div>
)}
        </div>
    )
}
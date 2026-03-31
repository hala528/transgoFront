import { Col, Form, Row } from "react-bootstrap";
import { Axios } from "../../../api/axios";
import { ADDDRIVER, beasURL } from "../../../api/api";
import { useState } from "react";


export default function AddDriver(){
  const [form, setForm] = useState({
  full_name: "",
  phone: "",
  email: "",
  address: "",
  car_type: "",
});

const [files, setFiles] = useState({
  id_card_image: null,
  license_image: null,
  personal_photo: null,
  mechanical_car: null,
  vehicle_images: [],
});

const [loading, setLoading] = useState(false);
const [err, errset] = useState("");
const [success, setSuccess] = useState("");

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

   
    data.append("id_card_image", files.id_card_image);
    data.append("license_image", files.license_image);
    data.append("personal_photo", files.personal_photo);
    data.append("mechanical_car", files.mechanical_car);

   
    for (let i = 0; i < files.vehicle_images.length; i++) {
      data.append(`vehicle_images[${i}]`, files.vehicle_images[i]);
    }

    const res = await Axios.post(`${beasURL}/${ADDDRIVER}`, data, {
      
    });

    setLoading(false);
    setSuccess(res.data.message || "تم إضافة السائق بنجاح");

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
             <h3 style={{color:'white', flex:1 ,padding:5}}>Add Driver :</h3>
              <h3 className="subtitle-driver-bold">enter informtion of driver :</h3>
              <Form style={{
      marginBottom:'10px',
      borderRadius: '3px',
      color: 'white',
    }}>
      <Row>
        <Col >
          <Form.Control 
          name="full_name"
          placeholder="enter name"
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
          placeholder="enter email"
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
          <Form.Control placeholder="enter number"
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
          <Form.Control placeholder="enter addres"
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
       <p className="subtitle-driver">enter a photo of personal Id :</p>
    <Form.Group   controlId="formFileMultiple" className="mb-3" >
    <Form.Control  type="file"
     name="id_card_image"
     onChange={handleFileChange}
     multiple  className="custom-input-driver"
    style={{
      borderRadius: '3px',
      color: 'white',
      background:'rgba(255, 255, 255, 0.15)'
    }} />
      </Form.Group>
       <p className="subtitle-driver">enter a copy of the driving cerifiticate :</p>
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
       <p className="subtitle-driver">enter a personal photo :</p>
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

          <h3 className="subtitle-driver-bold">enter vehicle information :</h3>
    
        <Col >
          <Form.Control 
          placeholder="enter type car"
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
        
        
    
    </Form>
     <p className="subtitle-driver">enter machancail car :</p>
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
     <p className="subtitle-driver">enter a four photo for car :</p>
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
  {loading ? "Loading..." : "Add Driver"}
</button>
{success && <span className="success">{success}</span>}
{err && <span className="error">{err}</span>}
        </div>
    )
}
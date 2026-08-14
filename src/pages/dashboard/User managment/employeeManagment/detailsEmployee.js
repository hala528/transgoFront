// import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Axios } from "../../../../api/axios";
// import { beasURL, GETEMPLOYEES,UPDATEEMPLOYEES } from "../../../../api/api";
// import personl from "../../../../assest/personal.png";

// export default function DetailsEmployee() {
//   const { id } = useParams();
//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
//  const [show, setShow] = useState(false);

//  const [formData, setFormData] = useState({
//   full_name: "",
//   phone: "",
//   role: ""
// });


//   const handleClose = () => setShow(false);
//   const handleShow = () => {
//   setFormData({
//     full_name: employee.full_name,
//     phone: employee.phone,
//     role: employee.roles[0]?.name || ""
//   });
//   setShow(true);
// };
// function handleChange(e) {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value
//   });
// }
// function renderStars(rating) {
//   const totalStars = 5;
//   const fullStars = Math.floor(rating);
//   const emptyStars = totalStars - fullStars;

//   return (
//     <>
//       {"★".repeat(fullStars)}
//       {"☆".repeat(emptyStars)}
//     </>
//   );
// }
// function handleToggleStatus() {
//   const url = employee.account_status
//     ? `admin/employees/${id}/disable`
//     : `admin/employees/${id}/enable`;

//   Axios.patch(`${beasURL}/${url}`)
//     .then((res) => {
//       setEmployee(res.data.data); 
//     })
//     .catch((err) => console.log(err));
// }
// function handleUpdate() {
//   Axios.patch(`${beasURL}/${UPDATEEMPLOYEES(id)}`, formData)
//     .then((res) => {
//       setEmployee(res.data.data); // تحديث البيانات مباشرة
//       setShow(false);
//     })
//     .catch((err) => console.log(err));
// }
//   useEffect(() => {
//     Axios.get(`${beasURL}/${GETEMPLOYEES(id)}`)
//       .then((res) => {
//         setEmployee(res.data.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }, [id]);

 
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
//         <Spinner animation="border" variant="light" />
//       </div>
//     );
//   }


//   if (!employee) {
//     return <h3 style={{ color: "white" }}>Employee not found</h3>;
//   }

//   return (
//     <div className="w-100 p-2">
//       <div className=" d-flex align-items-center px-3">
      
//       <span className="td-back" onClick={() => window.history.back()}>
//             ←
//           </span>
//       <h2 style={{ color: "white", padding: 5 }}>
//         Employee Details :
//       </h2>
// </div>
    
//       <div className="card-details d-flex  px-3">
//         <Row className="gap-3 ">
//           <Col xs={5} md={4}>
//             <Image
//               src={personl}
//               roundedCircle
//               style={{
//                 width: "120px",
//                 height: "120px",
//                 border: "4px solid #4f46e5"
//               }}
//             />
//           </Col>

//           <Col>
//             <div>
//               <h5 style={{ color: 'white', marginBottom: '10px' }}>
//                 Full Name : {employee.full_name}
//               </h5>

//               <div className="d-flex gap-2 mb-2">
//                 <Button
//                   style={{
//                     background: '#4f46e5',
//                     borderRadius: '100px',
//                     width: '80px',
//                     height: '30px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     border: "none"
//                   }}
//                 >
//                   {employee.roles[0]?.name}
//                 </Button>

//                 <Button
//                   style={{
//                     background: employee.account_status ? 'green' : 'red',
//                     borderRadius: '100px',
//                     width: '80px',
//                     height: '30px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     border: "none"
//                   }}
//                 >
//                   {employee.account_status ? 'Active' : 'Inactive'}
//                 </Button>
//               </div>

//               <p style={{ color: 'white' }}>
//                 Phone : {employee.phone}
//               </p>

//               <p style={{ color: 'white' }}>
//                 Email : {employee.email}
//               </p>
//             </div>
//           </Col>
//         </Row>
//       </div>

//       {/* 🔷 الكروت */}
//       <div className="d-flex gap-3 p-2">

//         {/* 🟦 الكرت الأول */}
//         <div className="card-account flex-fill p-3">
//           <h5 className="card-title">Account Details</h5>

//           <div className="info-row">
//             <span>ID</span>
//             <span>{employee.user_id}</span>
//           </div>

//           <div className="info-row">
//             <span>Full Name</span>
//             <span>{employee.full_name}</span>
//           </div>

//           <div className="info-row">
//             <span>Phone</span>
//             <span>{employee.phone}</span>
//           </div>

//           <div className="info-row">
//             <span>Email</span>
//             <span>{employee.email}</span>
//           </div>

//           <div className="info-row">
//             <span>Role</span>
//             <span>{employee.roles[0]?.name}</span>
//           </div>
//         </div>

//         {/* 🟪 الكرت الثاني */}
//         <div className="card-create flex-fill p-3 d-flex flex-column justify-content-between">

//           <div>
//             <h5 className="card-title">Account Settings</h5>

//             <div className="info-row">
//               <span>Status</span>
//               <span style={{ color: 'lightgreen' }}>
//                 {employee.account_status ? 'Active' : 'Inactive'}
//               </span>
//             </div>

//             <div className="info-row">
//               <span>Role</span>
//               <span className="badge-role">
//                 {employee.roles[0]?.name}
//               </span>
//             </div>

//             <div className="info-row">
//               <span>Rating</span>
//              <span style={{ color: "#facc15", fontSize: "18px" }}>
//   {renderStars(employee.rating)}
// </span>
//             </div>

//             <div className="info-row">
//               <span>Created By</span>
//               <span>{employee.registration_type}</span>
//             </div>
//           </div>

        
//           <div className="d-flex gap-2 mt-3">
//             <Button className="btn-edit flex-fill" onClick={handleShow}>Edit</Button>
//               <Modal className="custom-modal" show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//          <Form>
//   <Form.Group className="mb-3">
//     <Form.Label>Full Name</Form.Label>
//     <Form.Control
//       type="text"
//       name="full_name"
//       value={formData.full_name}
//       onChange={handleChange}
//     />
//   </Form.Group>

//   <Form.Group className="mb-3">
//     <Form.Label>Phone</Form.Label>
//     <Form.Control
//       type="text"
//       name="phone"
//       value={formData.phone}
//       onChange={handleChange}
//     />
//   </Form.Group>

//   <Form.Group className="mb-3">
//     <Form.Label>Role</Form.Label>
//     <Form.Control
//       type="text"
//       name="role"
//       value={formData.role}
//       onChange={handleChange}
//     />
//   </Form.Group>
// </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//          <Button variant="primary" onClick={handleUpdate}>
//   Save Changes
// </Button>
//         </Modal.Footer>
//       </Modal>
//            <Button
//   className="flex-fill"
//   onClick={handleToggleStatus}
//   style={{
//     background: employee.account_status ? "red" : "green",
//     border: "none"
//   }}
// >
//   {employee.account_status ? "Disable" : "Enable"}
// </Button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../../../api/axios";
import { beasURL, GETEMPLOYEES,UPDATEEMPLOYEES } from "../../../../api/api";
import personl from "../../../../assest/personal.png";
import { useTranslation } from "react-i18next";

export default function DetailsEmployee() {
  const { t ,i18n} = useTranslation();
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
 const [show, setShow] = useState(false);

 const [formData, setFormData] = useState({
  full_name: "",
  phone: "",
  role: ""
});


  const handleClose = () => setShow(false);
  const handleShow = () => {
  setFormData({
    full_name: employee.full_name,
    phone: employee.phone,
    role: employee.roles[0]?.name || ""
  });
  setShow(true);
};
function handleChange(e) {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
}
function renderStars(rating) {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = totalStars - fullStars;

  return (
    <>
      {"★".repeat(fullStars)}
      {"☆".repeat(emptyStars)}
    </>
  );
}
function handleToggleStatus() {
  const url = employee.account_status
    ? `admin/employees/${id}/disable`
    : `admin/employees/${id}/enable`;

  Axios.patch(`${beasURL}/${url}`)
    .then((res) => {
      setEmployee(res.data.data); 
    })
    .catch((err) => console.log(err));
}
function handleUpdate() {
  Axios.patch(`${beasURL}/${UPDATEEMPLOYEES(id)}`, formData)
    .then((res) => {
      setEmployee(res.data.data); // تحديث البيانات مباشرة
      setShow(false);
    })
    .catch((err) => console.log(err));
}
  useEffect(() => {
    Axios.get(`${beasURL}/${GETEMPLOYEES(id)}`)
      .then((res) => {
        setEmployee(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id,i18n.language]);

 
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }


  if (!employee) {
    return <h3 style={{ color: "white" }}>{t("detailsEmployee.employeeNotFound")}</h3>;
  }

  return (
    <div className="w-100 p-2">
      <div className=" d-flex align-items-center px-3">
      
      <span className="td-back" onClick={() => window.history.back()}>
            ←
          </span>
      <h2 style={{ color: "white", padding: 5 }}>
        {t("detailsEmployee.pageTitle")}
      </h2>
</div>
    
      <div className="card-details d-flex  px-3">
        <Row className="gap-3 ">
          <Col xs={5} md={4}>
            <Image
              src={personl}
              roundedCircle
              style={{
                width: "120px",
                height: "120px",
                border: "4px solid #4f46e5"
              }}
            />
          </Col>

          <Col>
            <div>
              <h5 style={{ color: 'white', marginBottom: '10px' }}>
                {t("detailsEmployee.fullName")} : {employee.full_name}
              </h5>

              <div className="d-flex gap-2 mb-2">
                <Button
                  style={{
                    background: '#4f46e5',
                    borderRadius: '100px',
                    width: '80px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: "none"
                  }}
                >
                  {employee.roles[0]?.name_display}
                </Button>

                <Button
                  style={{
                    background: employee.account_status ? 'green' : 'red',
                    borderRadius: '100px',
                    width: '80px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: "none"
                  }}
                >
                  {employee.account_status ? t("vehicleCategories.active") : t("vehicleCategories.inactive")}
                </Button>
              </div>

              <p style={{ color: 'white' }}>
                {t("bookingDetails.phone")} : {employee.phone}
              </p>

              <p style={{ color: 'white' }}>
                {t("walletDriver.email")} : {employee.email}
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* 🔷 الكروت */}
      <div className="d-flex gap-3 p-2">

        {/* 🟦 الكرت الأول */}
        <div className="card-account flex-fill p-3">
          <h5 className="card-title">{t("detailsEmployee.accountDetails")}</h5>

          <div className="info-row">
            <span>{t("booking.id")}</span>
            <span>{employee.user_id}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsEmployee.fullName")}</span>
            <span>{employee.full_name}</span>
          </div>

          <div className="info-row">
            <span>{t("bookingDetails.phone")}</span>
            <span>{employee.phone}</span>
          </div>

          <div className="info-row">
            <span>{t("walletDriver.email")}</span>
            <span>{employee.email}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsEmployee.role")}</span>
            <span>{employee.roles[0]?.name_display}</span>
          </div>
        </div>

        {/* 🟪 الكرت الثاني */}
        <div className="card-create flex-fill p-3 d-flex flex-column justify-content-between">

          <div>
            <h5 className="card-title">{t("detailsEmployee.accountSettings")}</h5>

            <div className="info-row">
              <span>{t("booking.status")}</span>
              <span style={{ color: 'lightgreen' }}>
                {employee.account_status ? t("vehicleCategories.active") : t("vehicleCategories.inactive")}
              </span>
            </div>

            <div className="info-row">
              <span>{t("detailsEmployee.role")}</span>
              <span className="badge-role">
                {employee.roles[0]?.name_display}
              </span>
            </div>

            <div className="info-row">
              <span>{t("ratings.rating")}</span>
             <span style={{ color: "#facc15", fontSize: "18px" }}>
  {renderStars(employee.rating)}
</span>
            </div>

            <div className="info-row">
              <span>{t("detailsEmployee.createdBy")}</span>
              <span>{employee.registration_type}</span>
            </div>
          </div>

        
          <div className="d-flex gap-2 mt-3">
            <Button className="btn-edit flex-fill" onClick={handleShow}>{t("vehicleCategories.edit")}</Button>
              <Modal className="custom-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("detailsEmployee.modalHeading")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form>
  <Form.Group className="mb-3">
    <Form.Label>{t("detailsEmployee.fullName")}</Form.Label>
    <Form.Control
      type="text"
      name="full_name"
      value={formData.full_name}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>{t("bookingDetails.phone")}</Form.Label>
    <Form.Control
      type="text"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
    />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>{t("detailsEmployee.role")}</Form.Label>
    <Form.Control
      type="text"
      name="role"
      value={formData.role}
      onChange={handleChange}
    />
  </Form.Group>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("walletDriver.close")}
          </Button>
         <Button variant="primary" onClick={handleUpdate}>
  {t("commission.saveChanges")}
</Button>
        </Modal.Footer>
      </Modal>
           <Button
  className="flex-fill"
  onClick={handleToggleStatus}
  style={{
    background: employee.account_status ? "red" : "green",
    border: "none"
  }}
>
  {employee.account_status ? t("vehicleCategories.disable") : t("vehicleCategories.enable")}
</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
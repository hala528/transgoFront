import { Button, Col, Form, Image, Modal, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../../../api/axios";
import { beasURL, GETEMPLOYEES } from "../../../../api/api";
import log from "../../../../assest/logo.jpg";

export default function DetailsEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
 const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  }, [id]);

 
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="light" />
      </div>
    );
  }


  if (!employee) {
    return <h3 style={{ color: "white" }}>Employee not found</h3>;
  }

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white", padding: 5 }}>
        Employee Details :
      </h2>

    
      <div className="card-details d-flex  px-3">
        <Row className="gap-3 ">
          <Col xs={5} md={4}>
            <Image
              src={log}
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
                Full Name : {employee.full_name}
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
                  {employee.roles[0]?.name}
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
                  {employee.account_status ? 'Active' : 'Inactive'}
                </Button>
              </div>

              <p style={{ color: 'white' }}>
                Phone : {employee.phone}
              </p>

              <p style={{ color: 'white' }}>
                Email : {employee.email}
              </p>
            </div>
          </Col>
        </Row>
      </div>

      {/* 🔷 الكروت */}
      <div className="d-flex gap-3 p-2">

        {/* 🟦 الكرت الأول */}
        <div className="card-account flex-fill p-3">
          <h5 className="card-title">Account Details</h5>

          <div className="info-row">
            <span>ID</span>
            <span>{employee.user_id}</span>
          </div>

          <div className="info-row">
            <span>Full Name</span>
            <span>{employee.full_name}</span>
          </div>

          <div className="info-row">
            <span>Phone</span>
            <span>{employee.phone}</span>
          </div>

          <div className="info-row">
            <span>Email</span>
            <span>{employee.email}</span>
          </div>

          <div className="info-row">
            <span>Role</span>
            <span>{employee.roles[0]?.name}</span>
          </div>
        </div>

        {/* 🟪 الكرت الثاني */}
        <div className="card-create flex-fill p-3 d-flex flex-column justify-content-between">

          <div>
            <h5 className="card-title">Account Settings</h5>

            <div className="info-row">
              <span>Status</span>
              <span style={{ color: 'lightgreen' }}>
                {employee.account_status ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="info-row">
              <span>Role</span>
              <span className="badge-role">
                {employee.roles[0]?.name}
              </span>
            </div>

            <div className="info-row">
              <span>Rating</span>
              <span>{employee.rating}</span>
            </div>

            <div className="info-row">
              <span>Created By</span>
              <span>{employee.registration_type}</span>
            </div>
          </div>

        
          <div className="d-flex gap-2 mt-3">
            <Button className="btn-edit flex-fill" onClick={handleShow}>Edit</Button>
              <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            <Button className="btn-disable flex-fill">Disable</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
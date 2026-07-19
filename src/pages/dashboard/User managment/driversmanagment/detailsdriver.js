import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Badge,
  Button,
  Modal
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faCalendar,
  faCar,
  faMoneyBill,
  faRoad,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import { useParams } from "react-router-dom";

import { Axios } from "../../../../api/axios";
import { beasURL, GETDRIVERS, TOGGLE_DRIVER_STATUS } from "../../../../api/api";

import "./details.css";

export default function DetailsDriver() {

  const { id } = useParams();

const [statusLoading, setStatusLoading] = useState(false);

  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

const [selectedImage, setSelectedImage] = useState("");

const [modalTitle, setModalTitle] = useState("");
const handleShowImage = (image, title) => {

  setSelectedImage(image);

  setModalTitle(title);

  setShowModal(true);

};
const handleToggleStatus = async () => {
  try {
    setStatusLoading(true);

    const res = await Axios.patch(
      `${beasURL}/${TOGGLE_DRIVER_STATUS(id)}`
    );

    console.log(res.data);

    // تحديث الحالة مباشرة
    setData((prev) => ({
      ...prev,
      personal_information: {
        ...prev.personal_information,
        account_status:
          res.data.data.account_status === 1
            ? "active"
            : "inactive",
      },
    }));

  } catch (error) {
    console.log(error);
  } finally {
    setStatusLoading(false);
  }
};

  useEffect(() => {

    Axios.get(`${beasURL}/${GETDRIVERS(id)}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));

  }, [id]);

  if (!data)
    return <p style={{ color: "white" }}>Loading...</p>;

  const p = data.personal_information;
  const v = data.vehicle_information;
  const t = data.trips_history;
  const f = data.financial_earnings;
  const r = data.ratings_reviews;

  return (
     <div className="w-100 p-2"> 
               {/* 🔙 Back */}
        <div className="d-flex align-items-center px-3">
           <span className="td-back" onClick={() => window.history.back()}> ← </span>
            <h2 style={{ color: "white", padding: 5 }}> Drivers Details : </h2>
                 </div> 
    <div className="driver-page">

      {/* HEADER */}
      <Card className="top-carde">

        <div className="top-contente">

          {/* IMAGE */}
          <div className="driver-avatare">
            <Image
              src={p.personal_photo}
              roundedCircle
            />
          </div>

          {/* INFO */}
          <div className="drivere-main-info">

            <div className="namee-row">

              <h2>{p.full_name}</h2>

              <Badge
                bg={
                  p.account_status === "active"
                    ? "success"
                    : "warning"
                }
              >
                {p.account_status}
              </Badge>

            </div>

            <div className="info-gride">

              <div>
                <FontAwesomeIcon icon={faPhone} />
                <span>{p.phone}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{p.email}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{p.address}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faCalendar} />
                <span>{p.created_at.slice(0, 10)}</span>
              </div>
              
               <Button
  onClick={handleToggleStatus}
  disabled={statusLoading}
  style={{
    background:
      p.account_status === "active"
        ? "#dc3545"
        : "#198754",
    border: "none",
    width: "300px",
    fontWeight: "600",
  }}
>
  {statusLoading
    ? "Loading..."
    : p.account_status === "active"
    ? "Deactivate Account"
    : "Activate Account"}
</Button>
              

            </div>

          </div>

        </div>

      </Card>

      {/* TOP STATS */}
      <div className="top-state">

        <div className="mini-state">
          <div className="state-left">
            <FontAwesomeIcon icon={faRoad} />
            <span>Total Trips</span>
          </div>

          <h4>{t.total_trips_count}</h4>
        </div>

        <div className="mini-state">
          <div className="state-left">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span>Completed</span>
          </div>

          <h4>{t.completed_trips_count}</h4>
        </div>

        <div className="mini-state">
          <div className="state-left">
            <FontAwesomeIcon icon={faCar} />
            <span>Active</span>
          </div>

          <h4>{t.active_trips_count}</h4>
        </div>

        <div className="mini-state">
          <div className="state-left">
            <FontAwesomeIcon icon={faMoneyBill} />
            <span>Balance</span>
          </div>

          <h4>${f.total_net_earnings}</h4>
        </div>

      </div>

      {/* GRID */}
      <div className="cards-gridee">

        {/* VEHICLE */}
        <Card className="section-cardee">

          <div className="section-header-e">
            <h4>Vehicle Information</h4>
          </div>

          <div className="vehiclee-grid">

            <div>
              <span className="labele">Car Type</span>
              <h6>{v.car_type}</h6>
            </div>

            <div>
              <span className="labele">Plate Number</span>
              <h6>{v.plate_number}</h6>
            </div>
             

          </div>

          <div className="gallerye">

            {v.car_photos.map((img, i) => (

              <Image
                key={i}
                src={img}
                className="gallery-imge"
              />

            ))}

          </div>

        </Card>

        {/* DOCUMENTS */}
        <Card className="section-cardee">

          <div className="section-header-e">
            <h4>Documents</h4>
          </div>

          <div className="documente-list">

            {/* LICENSE */}
            <div className="documente-item">

              <span>Driving License</span>

              <Badge bg="success">
                Verified
              </Badge>

              <Button
  variant="outline-light"
  size="sm"
  onClick={() =>
    handleShowImage(
      v.driving_license_image,
      "Driving License"
    )
  }
>
  View
</Button>

            </div>

            {/* ID CARD */}
            <div className="documente-item">

              <span>ID Card</span>

              <Badge bg="success">
                Verified
              </Badge>

             <Button
  variant="outline-light"
  size="sm"
  onClick={() =>
    handleShowImage(
      p.id_card_image,
      "ID Card"
    )
  }
>
  View
</Button>

            </div>

            {/* SALE CONTRACT */}
            {v.sale_contract.exists && (

              <div className="documente-item">

                <span>Sale Contract</span>

                <Badge
                  bg={
                    v.sale_contract.contract_validation_flag
                      ? "success"
                      : "danger"
                  }
                >
                  {
                    v.sale_contract.contract_validation_flag
                      ? "Valid"
                      : "Rejected"
                  }
                </Badge>

                <Button
  variant="outline-light"
  size="sm"
  onClick={() =>
    handleShowImage(
      v.sale_contract.contract_image,
      "Sale Contract"
    )
  }
>
  View
</Button>

              </div>

            )}

          </div>

        </Card>

        {/* RATINGS */}
        <Card className="section-cardee">

          <div className="section-header-e ">
            <h4>Ratings & Reviews</h4>
          </div>

          <div className="rating-wrapper">

            <div className="rating-scoree">

              <h1>
                {r.average_rating}
              </h1>

              <p>
                {r.total_ratings_count} Reviews
              </p>

            </div>

            <div className="reviews-list">

              {
                r.reviews.length === 0
                  ? (
                    <div className="empty-state">
                      No Reviews Yet
                    </div>
                  )
                  : (
                    r.reviews.map((rev, i) => (

                      <div
                        key={i}
                        className="review-box"
                      >
                        {rev.comment}
                      </div>

                    ))
                  )
              }

            </div>

          </div>

        </Card>

        {/* FINANCIAL */}
        <Card className="section-cardee">

          <div className="section-header-e ">
            <h4>Financial Details</h4>
          </div>

          <div className="financial-box">

            <div className="financial-item">
              <span>Total Earnings</span>
              <h5>${f.total_gross_earnings}</h5>
            </div>

            <div className="financial-item">
              <span>Commission</span>
              <h5>${f.total_commission}</h5>
            </div>

            <div className="financial-item">
              <span>Net Earnings</span>
              <h5>${f.total_net_earnings}</h5>
            </div>

          </div>

        </Card>

      </div>

    </div>
    <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  size="lg"
>

  <Modal.Header closeButton className="custom-modal-header">

    <Modal.Title>
      {modalTitle}
    </Modal.Title>

  </Modal.Header>

  <Modal.Body className="custom-modal-body">

    <img
      src={selectedImage}
      alt="document"
      className="modal-image"
    />

  </Modal.Body>

</Modal>
      </div>
  );
}

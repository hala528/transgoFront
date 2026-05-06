import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Badge,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { beasURL , GETDRIVERS } from "../../../../api/api";
import './details.css';
export default function DetailsDriver() {
   const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    Axios.get(`${beasURL}/${GETDRIVERS(id)}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!data) return <p style={{ color: "white" }}>Loading...</p>;

  const p = data.personal_information;
  const v = data.vehicle_information;
  const t = data.trips_history;
  const f = data.financial_earnings;
  const r = data.ratings_reviews;

  return (
    <div className="w-100 p-2">
     <h2 style={{ color: "white", padding: 5 }}>Driver Pages :</h2>

      <Tabs defaultActiveKey="profile" className="custom-tabs mb-3">

        {/* 🔹 TAB 1: Profile */}
        <Tab eventKey="profile" title=" information driver">
          <Row>
          
            <Card className="driver-card-details p-2 ">
  <div className="profile-container">

    {/* 🔹 Image */}
    <div className="profile-image">
      <Image
        src={p.personal_photo}
        className="driver-imge"
        roundedCircle
      />
    </div>

    {/* 🔹 Info */}
    <div className="profile-info">
      <h4>{p.full_name}</h4>

      <Badge bg="success" className="mb-2">
        {p.account_status}
      </Badge>

      <hr />

      <p>
        <FontAwesomeIcon icon={faPhone} className="icon" />
        {p.phone}
      </p>

      <p>
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        {p.email}
      </p>

      <p>
        <FontAwesomeIcon icon={faLocationDot} className="icon" />
        {p.address}
      </p>

      <p>
        <FontAwesomeIcon icon={faCalendar} className="icon" />
        {p.created_at.slice(0, 10)}
      </p>
    </div>

  </div>
</Card>
            
          </Row>
        </Tab>

        {/* 🔹 TAB 2: Vehicle */}
        <Tab eventKey="vehicle" title=" information car">
          <Card className="driver-card-details p-3">
            <h5>information car </h5>

            <p>type car : {v.car_type}</p>
            <p>number plate : {v.plate_number}</p>

            <div className="d-flex gap-3 flex-wrap">
              {v.car_photos.map((img, i) => (
                <Image key={i} src={img} width={200} className="car-img" />
              ))}
            </div>
          </Card>
        </Tab>

        {/* 🔹 TAB 3: Trips */}
        <Tab eventKey="trips" title=" Trips history">
          <Row>
            <Col md={3}>
              <Card className="stat-card">
                <h6>all</h6>
                <h3>{t.total_trips_count}</h3>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="stat-card">
                <h6>completed</h6>
                <h3>{t.completed_trips_count}</h3>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="stat-card">
                <h6>cancelled</h6>
                <h3>{t.cancelled_trips_count}</h3>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="stat-card">
                <h6>active</h6>
                <h3>{t.active_trips_count}</h3>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* 🔹 TAB 4: Earnings */}
        <Tab eventKey="earnings" title=" Earnings">
          <Card className="driver-card-details p-3">
            <p>Total Earnings: {f.total_gross_earnings}</p>
            <p>Commission: {f.total_commission}</p>
            <p>Net Earnings: {f.total_net_earnings}</p>
          </Card>
        </Tab>

        {/* 🔹 TAB 5: Documents */}
        <Tab eventKey="docs" title="📄 المستندات">
          <Card className="driver-card p-3">

            <div className="doc-row">
              <span>رخصة القيادة</span>
              <Badge bg="success">Verified</Badge>
              <Button size="sm">عرض</Button>
            </div>

            <div className="doc-row">
              <span>بطاقة الهوية</span>
              <Badge bg="success">Verified</Badge>
              <Button size="sm">عرض</Button>
            </div>

            <div className="doc-row">
              <span>عقد البيع</span>
              <Badge bg="warning">Pending</Badge>
              <Button size="sm">عرض</Button>
            </div>

          </Card>
        </Tab>

        {/* 🔹 TAB 6: Reviews */}
        <Tab eventKey="reviews" title="⭐ التقييمات">
          <Card className="driver-card p-3">
            <h4>{r.average_rating}</h4>

            {r.reviews.length === 0 ? (
              <p>لا توجد تقييمات</p>
            ) : (
              r.reviews.map((rev, i) => (
                <p key={i}>{rev.comment}</p>
              ))
            )}
          </Card>
        </Tab>

      </Tabs>
    </div>
  );
}
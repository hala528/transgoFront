import { useEffect, useState } from "react";

import { Card, Button, Row, Col, Image, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { beasURL ,IMAGE_BASE ,DRIVER} from "../../../../api/api";
import person from "../../../../assest/personal.png";

export default function ManagmentDriver() {
  const [drivers, setDrivers] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    account_status: "",
  });

  // ⭐ جلب البيانات مثل الموظفين
  useEffect(() => {
    Axios.get(`${beasURL}/${DRIVER}`, {
      params: {
        search: filters.search,
        account_status: filters.account_status,
      },
    })
      .then((res) => {
        setDrivers(res.data.data.data);
      })
      .catch((err) => console.log(err));
  }, [filters]);

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function renderStars(rating) {
    const r = Math.round(rating || 0);
    return "★".repeat(r) + "☆".repeat(5 - r);
  }

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white", padding: 5 }}>Driver Pages :</h2>

      {/* 🔹 Filters */}
      <div className="card-driver d-flex justify-content-between align-items-center px-3 mb-3">
        <Link to={'driver.id'}>
          <Button
            style={{
              background:
                "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))",
              width: "180px",
              border: "none",
            }}
            size="sm"
          >
            + Add Driver
          </Button>
        </Link>

        <div className="d-flex gap-2">
          <Form.Select
            name="account_status"
            onChange={handleFilterChange}
            className="custom-select"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </Form.Select>

          <Form.Control
            type="text"
            name="search"
            onChange={handleFilterChange}
            placeholder="Search Drivers..."
            className="custom-input-driver"
            style={{
              width: "250px",
              borderRadius: "10px",
              color: "white",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>
      </div>

      {/* 🔹 Cards */}
      <Row>
        {drivers.map((driver) => (
          <Col md={4} key={driver.user_id} className="mb-3">
            <Card className="driver-card p-3">

              {/* Header */}
              <div className="header d-flex justify-content-between">
                <span>ID: {driver.user_id}</span>
                <span>{driver.created_at?.slice(0, 10)}</span>
              </div>

              {/* Body */}
              <Row className="align-items-center mt-2">
                <Col>
                  <h5>{driver.full_name}</h5>

                  <p>📞 {driver.phone}</p>
                  <p>✉️ {driver.email}</p>

                  <p>
                    rating:
                    <span className="stars ms-2">
                      {renderStars(driver.rating)}
                    </span>
                  </p>

                  <div className="d-flex gap-2">
                    <Badge bg="secondary">driver</Badge>

                    <Badge
                      bg={
                        driver.account_status === 1 ? "success" : "danger"
                      }
                    >
                      {driver.account_status === 1
                        ? "active"
                        : "inactive"}
                    </Badge>

                    
                  </div>
                </Col>

                <Col md={4} className="text-center">
                  <Image
                    src={
                      driver.driver_profile?.personal_photo
                        ? `${IMAGE_BASE}/${driver.driver_profile.personal_photo}`
                        : person
                    }
                    roundedCircle
                    className="driver-img"
                  />
                </Col>
              </Row>

              {/* Wallet */}
              <div className="wallet-box p-2">
                <h6>Wallet</h6>
                <p>
                  Balance: {driver.wallet?.balance || 0} L.E
                </p>
                <p>
                  Address: {driver.driver_profile?.address || "-"}
                </p>
              </div>

              {/* Button */}
              <div >
                <Link to={`details/${driver.user_id}`}>
                  <Button
                    style={{
                      background:
                        "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))",
                      width: "180px",
                      border: "none",
                    }}
                    size="sm"
                  >
                    view details
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
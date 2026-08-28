import { useEffect, useState } from "react";

import { Card, Button, Row, Col, Image, Badge, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../../../api/axios";
import { beasURL ,IMAGE_BASE ,DRIVER} from "../../../../api/api";
import person from "../../../../assest/personal.png";
import { useTranslation } from "react-i18next";

export default function ManagmentDriver() {
  const { t } = useTranslation();
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
  console.log(JSON.stringify(res.data, null, 2));
  setDrivers(res.data.data.data);
})
      .catch((err) => console.log(err));
  }, 
  [filters]);

  function handleFilterChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function renderStars(rating) {
    const r = Math.round(rating || 0);
    return "★".repeat(r) + "☆".repeat(5 - r);
  }

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white", padding: 5 }}>{t("managmentDriver.pageTitle")}</h2>

      {/* 🔹 Filters */}
      <div className="drv-filters d-flex justify-content-between align-items-center flex-wrap gap-3">
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
            + {t("managmentDriver.addDriver")}
          </Button>
        </Link>

        <div className="d-flex gap-2">
          <Form.Select
            name="account_status"
            onChange={handleFilterChange}
            className="custom-select"
          >
            <option value="">{t("complaintsList.allStatus")}</option>
            <option value="1">{t("vehicleCategories.active")}</option>
            <option value="0">{t("vehicleCategories.inactive")}</option>
          </Form.Select>

          <Form.Control
            type="text"
            name="search"
            onChange={handleFilterChange}
            placeholder={t("managmentDriver.searchDrivers")}
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
     <Row className="drv-grid">
  {drivers.map((driver) => (
    <Col
      xs={12}
      md={6}
      lg={4}
      key={driver.user_id}
      className="mb-3"
    >
      <Card className="drv-card">
  <div className="drv-card-header">
    <div>
      <span className="drv-id">
        #{driver.user_id}
      </span>
    </div>

    <Badge
      bg={
        driver.account_status === 1
          ? "success"
          : "danger"
      }
    >
      {driver.account_status === 1
        ? t("vehicleCategories.active")
        : t("vehicleCategories.inactive")}
    </Badge>
  </div>

  <div className="drv-profile">
    <Image
      src={
        driver.driver_profile?.personal_photo
          ? `${IMAGE_BASE}/${driver.driver_profile.personal_photo}`
          : person
      }
      roundedCircle
      className="drv-avatar"
    />

    <div className="drv-info">
      <h5>{driver.full_name}</h5>

      <p>📞 {driver.phone}</p>

      <p>✉️ {driver.email}</p>

      <div className="drv-rating">
        {renderStars(driver.rating)}
        <span>
          ({driver.rating || 0})
        </span>
      </div>
    </div>
  </div>

  <div className="drv-wallet">
    <div>
      <span>{t("managmentDriver.wallet")}</span>

      <strong>
        {driver.wallet?.balance || 0} {t("managmentDriver.currencyLE")}
      </strong>
    </div>

    <div>
      <span>{t("bookingDetails.address")}</span>

      <strong>
        {driver.driver_profile?.address ||
          "-"}
      </strong>
    </div>
  </div>

  <div className="drv-footer">
    <Link
      to={`details/${driver.user_id}`}
    >
      <Button className="drv-btn">
        {t("booking.details")}
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
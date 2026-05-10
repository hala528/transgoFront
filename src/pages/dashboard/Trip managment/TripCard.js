import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../../../api/api";
import { FaClock, FaUser, FaRoute, FaCar } from "react-icons/fa";

export default function TripCard({ trip, onCancel }) {
  const statusKey = (trip.status || "unknown").toLowerCase();

  return (
    <div className="t-card-horizontal">

     {/* SECTION 1 */}
<div className="t-section-left">

  <span className="t-id">
    Trip #{trip.id || trip.trip_id}
  </span>

  <span className={`t-status t-status-${statusKey}`}>
    <span className="t-status-dot"></span>
    {trip.status}
  </span>

</div>

{/* SECTION 2 */}
<div className="t-section-center">

  <div className="t-route">
    <FaRoute className="icon" />
    <span>{trip.from || trip.departure?.from}</span>
    <span className="arrow">→</span>
    <span>{trip.to || trip.departure?.to}</span>
  </div>

  <div className="t-item">
    <FaClock />
    <span>
      {trip.time} · {trip.date}
    </span>
  </div>

  <div className="t-item">
    <FaCar />
    <span>{trip.type || trip.trip_type}</span>
  </div>

</div>

{/* SECTION 3 */}
<div className="t-section-right">

  <div className="driver-info">

    <div className="t-avatar">
      {trip.driverImg && (
        <img
          src={trip.driverImg}
          alt="driver"
        />
      )}
    </div>

    <div className="driver-details">

      <div className="driver-name">
        {trip.driver}
      </div>

      <div className="driver-phone">
        {trip.driverPhone}
      </div>

    </div>

  </div>
  <div className="btn-row">
    <Link to={`/dashboard/trips/${trip.id || trip.trip_id}`}>
      <Button className="t-btn-view">View</Button>
    </Link>

    {onCancel && (
      <Button className="t-btn-cancel">
        Cancel
      </Button>
    )}
  </div>

</div>

</div>

    
  );
}
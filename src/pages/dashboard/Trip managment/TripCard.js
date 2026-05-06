import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../../../api/api";
import { FaClock, FaUser, FaRoute, FaCar } from "react-icons/fa";

export default function TripCard({ trip, onCancel }) {
  const statusKey = (trip.status || "unknown").toLowerCase();

  return (
    <div className="t-card-horizontal">

      {/* LEFT: CAR AVATAR */}
      <div className="t-avatar">
        {(trip.carImg || trip.vehicle?.image) && (
          <img
            src={
              trip.carImg
                ? trip.carImg
                : `${IMAGE_BASE}/${trip.vehicle?.image}`
            }
            alt="car"
          />
        )}
      </div>

      {/* CENTER: INFO */}
      <div className="t-content">

        {/* HEADER */}
        <div className="t-top">
  <span className="t-id">Trip #{trip.id || trip.trip_id}</span>

  <span className={`t-status t-status-${statusKey}`}>
    <span className="t-status-dot"></span>
    {trip.status}
  </span>
</div>
        {/* ROUTE */}
        <div className="t-route">
          <FaRoute className="icon" />
          <span>{trip.from || trip.departure?.from}</span>
          <span className="arrow">→</span>
          <span>{trip.to || trip.departure?.to}</span>
        </div>

        {/* META */}
        <div className="t-meta">

          <div className="t-item">
            <FaUser />
            <span>{trip.driver || trip.driver?.full_name}</span>
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
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="t-actions">



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
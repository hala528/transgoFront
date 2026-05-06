import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../../../api/api";
import { FaClock, FaUser, FaRoute } from "react-icons/fa";

export default function TripCard({ trip, onCancel, showDelay = false }) {
  const statusKey = (trip.status || "unknown").toLowerCase();

  return (
    <div className="t-card">

      {/* HEADER */}
      <div className="t-card-header">
        <span className="t-id">
          #{trip.id || trip.trip_id}
        </span>

        <div className={`t-status t-status-${statusKey}`}>
          <span className="t-status-dot"></span>
          <span className="t-status-text">
            {trip.status}
          </span>
        </div>
      </div>

      {/* CAR IMAGE */}
      {(trip.carImg || trip.vehicle?.image) && (
        <img
          src={
            trip.carImg
              ? trip.carImg
              : `${IMAGE_BASE}/${trip.vehicle?.image}`
          }
          className="t-car-img"
          alt="car"
        />
      )}

      {/* ROUTE VISUAL */}
      <div className="t-route-visual">

        <div className="t-stop-row">
          <div className="t-stop t-stop-from"></div>
          <span className="t-stop-label">
            {trip.from || trip.departure?.from}
          </span>
        </div>

        <div className="t-line"></div>

        <div className="t-stop-row">
          <div className="t-stop t-stop-to"></div>
          <span className="t-stop-label">
            {trip.to || trip.departure?.to}
          </span>
        </div>

        {/* DELAY BRANCH */}
        {showDelay && (
          <div className="t-route-branch">
            <div className="t-route-branch-line"></div>

            <div className="t-delay-box">
              <span className="t-delay-label">Delay Timer</span>
              <span className="t-delay-time">
                {trip.delay_minutes || "—"} min
              </span>
            </div>
          </div>
        )}
      </div>

      {/* META */}
      <div className="t-meta-block">

        <div className="t-meta-item">
          <FaUser className="t-icon driver" />
          <span className="t-label">Driver:</span>
          <span className="t-value">
            {trip.driver || trip.driver?.full_name}
          </span>
        </div>

        <div className="t-meta-item">
          <FaClock className="t-icon time" />
          <span className="t-label">Time & Date:</span>
          <span className="t-value">
            {trip.time} {trip.date && `· ${trip.date}`}
          </span>
        </div>

        <div className="t-meta-item">
          <FaRoute className="t-icon type" />
          <span className="t-label">Type:</span>
          <span className="t-value">
            {trip.type || trip.trip_type}
          </span>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="t-actions">

        <Link
          to={`/dashboard/trips/${trip.id || trip.trip_id}`}
          style={{ flex: 1 }}
        >
          <Button size="sm" className="t-btn-view">
            view details
          </Button>
        </Link>

        {onCancel && (
          <Button
            size="sm"
            className="t-btn-cancel"
            onClick={() => onCancel(trip.id || trip.trip_id)}
          >
            Cancel
          </Button>
        )}

      </div>

    </div>
  );
}
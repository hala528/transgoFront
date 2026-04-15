import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IMAGE_BASE } from "../../../api/api";

export default function TripCard({ trip, onCancel, showDelay = false }) {
  return (
    <div className="t-card">

      <div className="t-card-header">
        <span className="t-id">
          #{trip.id || trip.trip_id}
        </span>

        <div
          className="t-status"
          style={{ color: trip.statusColor || trip.status?.color }}
        >
          <span className="t-status-dot"></span>
          <span className="t-status-text">
            {(trip.status?.key || trip.status || "").toString()}
          </span>
        </div>
      </div>

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

      <div className="t-driver-row">
        <img
          src={
            trip.driverImg
              ? trip.driverImg
              : `${IMAGE_BASE}/${trip.driver?.photo}`
          }
          className="t-driver-img"
          alt="driver"
        />
        <span className="t-driver-name">
          {trip.driver || trip.driver?.full_name}
        </span>
      </div>

      <div className="t-type t-type-right">
        {trip.type || trip.trip_type}
      </div>

      <div className="t-time">
        {trip.time} {trip.date && `· ${trip.date}`}
      </div>

      <div className="t-actions">
        <Link to={`/dashboard/trips/${trip.id || trip.trip_id}`} style={{ flex: 1 }}>
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

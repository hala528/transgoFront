import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LiveMap from "./LiveMap";
import { Axios } from "../../../api/axios";
import { GETTRIPS, IMAGE_BASE } from "../../../api/api";

export default function Trips() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("");
const [date, setDate] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function getTrips() {
      setLoading(true);

      
      console.log("FILTER SENT:", {
        search: search || undefined,
        status: filter !== "all" ? filter : undefined,
 departure_date: date || undefined
      });

      try {
        const res = await Axios.get(GETTRIPS, {
          params: {
            search: search || undefined,
            status: filter !== "all" ? filter : undefined,
             departure_date: date || undefined,
          },
        });

       
        console.log("FULL RESPONSE:", res);

      
        console.log("RAW DATA:", res.data);

      
        console.log("FILTERED ITEMS FROM BACKEND:", res.data?.data?.items);

        setTrips(res.data?.data?.items || []);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    getTrips();
  }, [search, filter, date]);

  
  const getImage = (path) =>
    path ? `${IMAGE_BASE}/${path}` : "";


  const formattedTrips = trips.map((trip) => {
    const dateObj = trip?.departure?.at
      ? new Date(trip.departure.at)
      : new Date();

    console.log("TRIP ITEM:", trip);

    return {
      id: trip?.trip_id,
      status: trip?.status?.key,
      statusColor: trip?.status?.color,
      from: trip?.departure?.from,
      to: trip?.departure?.to,
      driver: trip?.driver?.full_name,
      type: trip?.trip_type,

      time: dateObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      date: dateObj.toLocaleDateString(),

      driverImg: trip?.driver?.photo
        ? `${IMAGE_BASE}/${trip.driver.photo}`
        : "",

      carImg: trip?.vehicle?.image
        ? `${IMAGE_BASE}/${trip.vehicle.image}`
        : "",

      canCancel: !!trip?.actions?.cancel_endpoint,
    };
  });

  const filtered = formattedTrips;

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white", padding: 5 }}>
        Management Trips :
      </h2>

      {/* FILTER */}
      
      <div className="card-driver d-flex justify-content-between align-items-center px-3 mb-3">
        <div className="d-flex gap-2 align-items-center">
          {["all", "pending", "active", "completed", "cancelled"].map(
            (f) => (
              <Button
                key={f}
                size="sm"
                onClick={() => {
                  setFilter(f);
                  setActiveView("");
                }}
                style={{
                  background:
                    filter === f
                      ? "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))"
                      : "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "20px",
                  color: filter === f ? "white" : "#cbd5f5",
                  fontSize: "11px",
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Button>
            )
          )}
          
  

          <div
            className="live-map-btn"
            onClick={() => setActiveView("live")}
          >
            <span className="live-dot"></span>
            <span className="live-text">Live Map</span>
          </div>

          <div
            className="delayed-trips-btn"
            onClick={() => setActiveView("delayed")}
          >
            <span className="delayed-dot"></span>
            <span className="delayed-text">Delayed Trips</span>
          </div>
        </div>

  {/* DATE */}
  <Form.Control
    type="date"
    value={date}
    onChange={(e) => {
      setDate(e.target.value);
      setActiveView("");
    }}
    style={{
      width: "170px",
      borderRadius: "10px",
      color: "white",
      background: "rgba(255,255,255,0.08)",
    }}
  />
        {/* SEARCH */}
        <Form.Control
          type="text"
          placeholder="Search by ID or driver..."
          className="custom-input-driver"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActiveView("");
          }}
          style={{
            width: "220px",
            borderRadius: "10px",
            color: "white",
            background: "rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="t-grid">
        {activeView === "live" ? (
          <LiveMap
            trips={filtered.filter(
              (t) => t.status === "active" || t.status === "pending"
            )}
          />
        ) : activeView === "delayed" ? (
          <div
            style={{
              color: "#cbd5f5",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            Delayed trips view
          </div>
        ) : filtered.length === 0 ? (
          <div
            style={{
              color: "#cbd5f5",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            No trips found.
          </div>
        ) : (
          filtered.map((trip) => (
            <div key={trip.id} className="t-card">
              <div className="t-card-header">
                <span className="t-id">#{trip.id}</span>

                <div
                  className="t-status"
                  style={{ color: trip.statusColor }}
                >
                  <span className="t-status-dot"></span>
                  <span className="t-status-text">
                    {trip.status?.charAt(0).toUpperCase() +
                      trip.status?.slice(1)}
                  </span>
                </div>
              </div>

              {trip.carImg && (
                <img
                  src={trip.carImg}
                  className="t-car-img"
                  alt="car"
                />
              )}

              <div className="t-route-visual">
                <div className="t-stop-row">
                  <div className="t-stop t-stop-from"></div>
                  <span className="t-stop-label">{trip.from}</span>
                </div>
                <div className="t-line"></div>
                <div className="t-stop-row">
                  <div className="t-stop t-stop-to"></div>
                  <span className="t-stop-label">{trip.to}</span>
                </div>
              </div>

              <div className="t-driver-row">
                <img
                  src={trip.driverImg}
                  className="t-driver-img"
                  alt="driver"
                />
                <span className="t-driver-name">{trip.driver}</span>
              </div>

              <div className="t-type t-type-right">{trip.type}</div>

              <div className="t-time">
                {trip.time} · {trip.date}
              </div>

              <div className="t-actions">
                <Link to={`/trips/${trip.id}`} style={{ flex: 1 }}>
                  <Button size="sm" className="t-btn-view">
                    view details
                  </Button>
                </Link>

                <Button
                  size="sm"
                  disabled={!trip.canCancel}
                  className="t-btn-cancel"
                  style={{
                    background: trip.canCancel
                      ? "rgba(239,68,68,0.15)"
                      : "rgba(255,255,255,0.05)",
                    border: trip.canCancel
                      ? "1px solid rgba(239,68,68,0.3)"
                      : "1px solid rgba(255,255,255,0.1)",
                    color: trip.canCancel ? "#f87171" : "#555",
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

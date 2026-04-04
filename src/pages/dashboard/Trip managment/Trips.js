import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import carImg from "../../../assest/CAR.PNG";
import LiveMap from "./LiveMap";

export default function Trips() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("");

  const trips = [
    { id: 1042, status: "pending", from: "Damascus", to: "Aleppo", driver: "Ahmad Karimi", type: "Shared", time: "10:30 AM", date: "14 Apr", lat: 33.5138, lng: 36.2765 },
    { id: 1043, status: "active", from: "Homs", to: "Latakia", driver: "Sara Mahmoud", type: "Private", time: "11:00 AM", date: "14 Apr", lat: 34.7300, lng: 36.7100 },
    { id: 1044, status: "active", from: "Aleppo", to: "Damascus", driver: "Khalid Omar", type: "Shared", time: "09:00 AM", date: "13 Apr", lat: 36.2021, lng: 37.1343 },
    { id: 1045, status: "cancelled", from: "Tartus", to: "Homs", driver: "Lina Hassan", type: "Private", time: "02:00 PM", date: "12 Apr", lat: 34.8970, lng: 36.7200 },
    { id: 1046, status: "active", from: "Damascus", to: "Tartus", driver: "Mohamad Rami", type: "Shared", time: "01:00 PM", date: "14 Apr", lat: 33.5138, lng: 36.2765 },
  ];

  const statusStyle = {
    pending: { color: "#fbbf24" },
    active: { color: "#4ade80" },
    completed: { color: "#93c5fd" },
    cancelled: { color: "#f87171" },
  };

  const filtered = trips.filter((t) => {
    const matchFilter = filter === "all" ? true : t.status === filter;
    const matchSearch =
      search === "" ||
      String(t.id).includes(search) ||
      t.driver.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const canCancel = (status) => status === "active" || status === "pending";

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white", flex: 1, padding: 5 }}>Management Trips :</h2>

      <div className="card-driver d-flex justify-content-between align-items-center px-3 mb-3">
        <div className="d-flex gap-2 align-items-center">
          {["all", "pending", "active", "completed", "cancelled"].map((f) => (
            <Button
              key={f}
              size="sm"
              onClick={() => { setFilter(f); setActiveView(""); }}
              style={{
                background: filter === f ? "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))" : "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "20px",
                color: filter === f ? "white" : "#cbd5f5",
                fontSize: "11px",
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}

          <div className="live-map-btn" onClick={() => setActiveView("live")}>
            <span className="live-dot"></span>
            <span className="live-text">Live Map</span>
          </div>

          <div className="delayed-trips-btn" onClick={() => setActiveView("delayed")}>
            <span className="delayed-dot"></span>
            <span className="delayed-text">Delayed Trips</span>
          </div>
        </div>

        <Form.Control
          type="text"
          placeholder="Search by ID or driver..."
          className="custom-input-driver"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setActiveView(""); }}
          style={{ width: "220px", borderRadius: "10px", color: "white", background: "rgba(255,255,255,0.08)" }}
        />
      </div>

      <div className="t-grid">
        {activeView === "live" ? (
          <LiveMap trips={filtered.filter(t => (t.status === "active" || t.status === "pending") && t.lat && t.lng)} />
        ) : activeView === "delayed" ? (
          <div style={{ color: "#cbd5f5", textAlign: "center", width: "100%", padding: "20px 0" }}>
            Delayed trips view (يمكن لاحقاً إضافة خريطة أو قائمة للرحلات المتأخرة)
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ color: "#cbd5f5", textAlign: "center", width: "100%", padding: "20px 0" }}>
            No trips found.
          </div>
        ) : (
          filtered.map((trip) => (
            <div key={trip.id} className="t-card">
              <div className="t-card-header">
                <span className="t-id">#{trip.id}</span>
              <div className={`t-status t-status-${trip.status}`}>
  <span className="t-status-dot"></span>
  <span className="t-status-text">
    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
  </span>
</div>

              </div>

              <img src={carImg} className="t-car-img" alt="car" />
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
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="t-driver-img"
                  alt="driver"
                />
                <span className="t-driver-name">{trip.driver}</span>
              </div>

              <div className="t-type t-type-right">{trip.type}</div>
              <div className="t-time">{trip.time} · {trip.date}</div>

              <div className="t-actions">
                <Link to={`/${trip.id}`} style={{ flex: 1 }}>
                  <Button size="sm" className="t-btn-view">view details</Button>
                </Link>
                <Button
                  size="sm"
                  disabled={!canCancel(trip.status)}
                  className="t-btn-cancel"
                  style={{
                    background: canCancel(trip.status) ? "rgba(239,68,68,0.15)" : "rgba(255,255,255,0.05)",
                    border: canCancel(trip.status) ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.1)",
                    color: canCancel(trip.status) ? "#f87171" : "#555",
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

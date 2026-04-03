import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

import carImg from "../../../assest/logo.jpg"; 
import TripsMap from "./liveTrip";

export default function Trips() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const trips = [
    { id: 1042, status: "pending", from: "Damascus", to: "Aleppo", driver: "Ahmad Karimi", type: "Shared", time: "10:30 AM", date: "14 Apr" },
    { id: 1043, status: "active", from: "Homs", to: "Latakia", driver: "Sara Mahmoud", type: "Private", time: "11:00 AM", date: "14 Apr" },
    { id: 1044, status: "completed", from: "Aleppo", to: "Damascus", driver: "Khalid Omar", type: "Shared", time: "09:00 AM", date: "13 Apr" },
    { id: 1045, status: "cancelled", from: "Tartus", to: "Homs", driver: "Lina Hassan", type: "Private", time: "02:00 PM", date: "12 Apr" },
    { id: 1046, status: "active", from: "Damascus", to: "Tartus", driver: "Mohamad Rami", type: "Shared", time: "01:00 PM", date: "14 Apr" },
  ];

  const statusStyle = {
    pending: { color: "#fbbf24" },
    active: { color: "#4ade80" },
    completed: { color: "#93c5fd" },
    cancelled: { color: "#f87171" },
  };

  const filtered = trips.filter((t) => {
    const matchFilter = filter === "all"
  ? true
  : t.status === filter;
    const matchSearch =
      search === "" 
      String(t.id).includes(search) 
      t.driver.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const canCancel = (status) =>
  status === "active" || status === "pending";

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white", flex: 1, padding: 5 }}>Management Trips :</h2>
<div className="card-driver d-flex justify-content-between align-items-center px-3 mb-3">
  <div className="d-flex gap-2 align-items-center">
    {["all", "pending", "active", "completed", "cancelled"].map((f) => (
      <Button
        key={f}
        size="sm"
        onClick={() => setFilter(f)}
        style={{
          background: filter === f
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
    ))}

    {/* زر Live Map */}
    <div className="live-map-btn">
      <span className="live-dot"></span>
      <span className="live-text">Live Map</span>
    </div>

    {/* زر Delayed Trips */}
    <div className="delayed-trips-btn">
      <span className="delayed-dot"></span>
      <span className="delayed-text">Delayed Trips</span>
    </div>
  </div>

  <Form.Control
    type="text"
    placeholder="Search by ID or driver..."
    className="custom-input-driver"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "220px",
      borderRadius: "10px",
      color: "white",
      background: "rgba(255,255,255,0.08)",
    }}
  />
  <TripsMap trips={trips} />
</div>



      {/* الكروت */}
      <div className="t-grid">
        {filtered.length === 0 && <div style={{ color: "#cbd5f5" }}>No trips found.</div>}

        {filtered.map((trip) => (
          <div key={trip.id} className="t-card">

            {/* الهيدر */}
            <div className="t-card-header">
              <span className="t-id">#{trip.id}</span>
              <span style={{ ...statusStyle[trip.status], fontSize: 12, fontWeight: 500 }}>
                {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
              </span>
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
              <Link to={'${trip.id}'} style={{ flex: 1 }} >
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
        ))}
      </div>
    </div>
  );
}

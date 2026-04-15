import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LiveMap from "./LiveMap";
import { Axios } from "../../../api/axios";
import { GETTRIPS, IMAGE_BASE ,CANCEL_TRIP} from "../../../api/api";
import DelayedTrips from "./DelayedTrips";

import TripCard from "./TripCard";

export default function Trips() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("");
const [date, setDate] = useState("");
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [err, setErr] = useState("");

//   const statusMap = {
//   all: undefined,
//   pending: "pending",
//   active: "active",
//   completed: "completed",
//   canceled: "canceled", 
// };

 const handleCancel = async (id) => {
  try {
    const res = await Axios.post(CANCEL_TRIP(id));

    console.log("CANCEL RESPONSE:", res.data);

    
    setSuccess(res.data?.message || "Trip canceled successfully");
    setErr("");
    setTimeout(() => setSuccess(""), 3000);


    
    const refreshed = await Axios.get(GETTRIPS, {
      params: {
        search: search || undefined,
        status: filter !== "all" ? filter : undefined,
        departure_date: date || undefined,
      },
    });

    setTrips(refreshed.data?.data?.items || []);
  } catch (err) {
    console.log("CANCEL ERROR:", err);

    setErr(
      err.response?.data?.message || "Failed to cancel trip"
    );
    setSuccess("");
    setTimeout(() => setErr(""), 3000);
  }
};


  
  useEffect(() => {
    let interval;

    async function getTrips() {
      setLoading(true);

      console.log("FILTER SENT:", {
        search: search || undefined,
        // status: statusMap[filter],
        departure_date: date || undefined,
      });

      try {
        const res = await Axios.get(GETTRIPS, {
          params: {
            search: search || undefined,
            status: filter !== "all" ? filter : undefined,
            departure_date: date || undefined,
          },
        });

        setTrips(res.data?.data?.items || []);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    
    getTrips();

    
    interval = setInterval(() => {
      getTrips();
    }, 1000);

    return () => clearInterval(interval);
  }, [search, filter, date]);

  // const getImage = (path) =>
  //   path ? `${IMAGE_BASE}/${path}` : "";

  const formattedTrips = trips.map((trip) => {
    const dateObj = trip?.departure?.at
      ? new Date(trip.departure.at)
      : new Date();

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
      {success && <span className="success">{success}</span>}
{err && <span className="error">{err}</span>}

      <div className="card-driver d-flex justify-content-between align-items-center px-3 mb-3">
        <div className="d-flex gap-2 align-items-center">
          {["all", "pending", "active", "completed", "canceled"].map(
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
  style={{
    background:
      activeView === "live"
        ? "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))"
        : "rgba(255,255,255,0.08)",
    color: activeView === "live" ? "white" : "#cbd5f5",
    borderRadius: "20px",
    padding: "6px 12px",
    cursor: "pointer",
  }}
>
  <span className="live-dot"></span>
  <span className="live-text">Live Map</span>
</div>

<div
  className="delayed-trips-btn"
  onClick={() => setActiveView("delayed")
    
  }
  style={{
    background:
      activeView === "delayed"
        ? "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))"
        : "rgba(255,255,255,0.08)",
    color: activeView === "delayed" ? "white" : "#cbd5f5",
    borderRadius: "20px",
    padding: "6px 12px",
    cursor: "pointer",
  }}
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
    <DelayedTrips search={search} date={date}   
  handleCancel={handleCancel}/>

  ) 
//   : filtered.length === 0 ? (

//           <div
//             style={{
//               color: "#cbd5f5",
//               textAlign: "center",
//               padding: "20px 0",
//             }}
//           >
//             No trips found.
//           </div>
//         ) : 
//         (
//           filtered.map((trip) => (
//             <div key={trip.id} className="t-card">
//               <div className="t-card-header">
//                 <span className="t-id">#{trip.id}</span>

//                 <div
//                   className="t-status"
//                   style={{ color: trip.statusColor }}
//                 >
//                   <span className="t-status-dot"></span>
//                   <span className="t-status-text">
//                     {trip.status?.charAt(0).toUpperCase() +
//                       trip.status?.slice(1)}
//                   </span>
//                 </div>
//               </div>

//               {trip.carImg && (
//                 <img
//                   src={trip.carImg}
//                   className="t-car-img"
//                   alt="car"
//                 />
//               )}

//               <div className="t-route-visual">
//                 <div className="t-stop-row">
//                   <div className="t-stop t-stop-from"></div>
//                   <span className="t-stop-label">{trip.from}</span>
//                 </div>
//                 <div className="t-line"></div>
//                 <div className="t-stop-row">
//                   <div className="t-stop t-stop-to"></div>
//                   <span className="t-stop-label">{trip.to}</span>
//                 </div>
//               </div>

//               <div className="t-driver-row">
//                 <img
//                   src={trip.driverImg}
//                   className="t-driver-img"
//                   alt="driver"
//                 />
//                 <span className="t-driver-name">{trip.driver}</span>
//               </div>

//               <div className="t-type t-type-right">{trip.type}</div>

//               <div className="t-time">
//                 {trip.time} · {trip.date}
//               </div>

//               <div className="t-actions">
//                <Link to={`/dashboard/trips/${trip.id}`} style={{ flex: 1 }}>
//                   <Button size="sm" className="t-btn-view">
//                     view details
//                   </Button>
//                 </Link>
// <Button
//   size="sm"
//   disabled={!trip.canCancel}
//   className="t-btn-cancel"
//   onClick={() => handleCancel(trip.id)}
// >
//   Cancel
// </Button>



//               </div>
//             </div>
//           ))
//         )}
:filtered.length === 0 ? (
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
    <TripCard
      key={trip.id}
      trip={trip}
      onCancel={handleCancel}
    />
  ))
)}

      </div>
    </div>
  );
}

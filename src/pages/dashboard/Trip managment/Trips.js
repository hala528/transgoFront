import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

import LiveTripsMap from "./viewTactive";
import { Axios } from "../../../api/axios";
import { GETTRIPS, IMAGE_BASE ,CANCEL_TRIP} from "../../../api/api";
import DelayedTrips from "./DelayedTrips";
import TopFilterBar from "../../../components/dashboard/TopFilterBar";
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

    
    interval = setInterval(() => {
      getTrips();
    }, 30000);

    return () => clearInterval(interval);
  }, [search, filter, date]);

  // const getImage = (path) =>
  //   path ? `${IMAGE_BASE}/${path}` : "";

  const formattedTrips = trips.map((trip) => {
    const rawDate = trip?.departure?.at;

    return {
      id: trip?.trip_id,
      status: trip?.status?.key,
      statusColor: trip?.status?.color,
      from: trip?.departure?.from,
      to: trip?.departure?.to,
      driver: trip?.driver?.full_name,
      type: trip?.trip_type,
 driverPhone: trip?.driver?.phone,
   time: rawDate
  ? new Date(rawDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
  : "",

  
 date: rawDate?.slice(0, 10),
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

    <TopFilterBar
  filter={filter}
  setFilter={setFilter}
  filtersList={["all", "pending", "active", "completed", "canceled"]}

  search={search}
  setSearch={setSearch}

  date={date}
  setDate={setDate}

  activeView={activeView}
  setActiveView={setActiveView}

  extraButtons={[
    {
      key: "live",
      className: "live-map-btn",
      onClick: () => setActiveView("live"),
      content: (
        <>
          <span className="live-dot"></span>
          <span className="live-text">Live Map</span>
        </>
      ),
    },
    {
      key: "delayed",
      className: "delayed-trips-btn",
      onClick: () => setActiveView("delayed"),
      content: (
        <>
          <span className="delayed-dot"></span>
          <span className="delayed-text">Delayed Trips</span>
        </>
      ),
    },
  ]}
/>


      {/* CONTENT */}
   <div className="t-grid">
 {activeView === "live" ? (
  <LiveTripsMap />
) : activeView === "delayed" ? (
  <DelayedTrips search={search} date={date} handleCancel={handleCancel} />
) : filtered.length === 0 ? (
  <div style={{ color: "#cbd5f5", textAlign: "center", padding: "20px 0" }}>
    No trips found.
  </div>
) : (
  filtered.map((trip) => (
    <TripCard key={trip.id} trip={trip} onCancel={handleCancel} />
  ))
)}
      </div>
    </div>
  );
}

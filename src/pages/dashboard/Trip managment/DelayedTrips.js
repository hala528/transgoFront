import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { DELAYED_TRIPS, IMAGE_BASE } from "../../../api/api";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import TripCard from "./TripCard";
export default function DelayedTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
const [date, setDate] = useState("");
 const [search, setSearch] = useState("");

  useEffect(() => {
         async function fetchDelayed() {

      setLoading(true);

      
      console.log("FILTER SENT:", {
        search: search || undefined,
      

 departure_date: date || undefined
      });

      try {
        const res = await Axios.get(DELAYED_TRIPS, {
         params: { search, departure_date: date }
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
 fetchDelayed();
  }, [search,  date]);

  if (loading) return <div style={{ color: "#cbd5f5" }}>Loading...</div>;

  if (!trips.length) {
    return (
      <div style={{ color: "#cbd5f5", textAlign: "center" }}>
        No delayed trips
      </div>
    );
  }

    
  return (
    <>
      
      
  {trips.length === 0 ? (
    <div style={{ color: "#cbd5f5", textAlign: "center" }}>
      No delayed trips
    </div>
  ) : (
    trips.map((trip) => (
      <TripCard
        key={trip.trip_id}
        trip={{
          id: trip.trip_id,
          status: trip.status?.key,
          statusColor: trip.status?.color,
          from: trip.departure?.from,
          to: trip.departure?.to,
          driver: trip.driver?.full_name,
          driverImg: trip.driver?.photo,
          carImg: trip.vehicle?.image,
          type: trip.trip_type,
          time: trip.departure?.at,
          delayMinutes: trip.delay_minutes
        }}
        variant="delayed"
        onCancel={() => {}}
      />
    ))
  )}
</>

  );
}

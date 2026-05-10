import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { DELAYED_TRIPS } from "../../../api/api";
import TripCard from "./TripCard";

export default function DelayedTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    async function fetchDelayed() {
      setLoading(true);

      try {
        const res = await Axios.get(DELAYED_TRIPS);
 console.log("FULL RESPONSE:", res);

      
        console.log("RAW DATA:", res.data);

      
        console.log("FILTERED ITEMS FROM BACKEND:", res.data?.data?.items);
        const items = res.data?.data?.items || [];

        setTrips(items);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDelayed();
  }, []);

  if (loading) {
    return <div style={{ color: "#cbd5f5" }}>Loading...</div>;
  }

  if (!trips.length) {
    return (
      <div style={{ color: "#cbd5f5", textAlign: "center" }}>
        No delayed trips
      </div>
    );
  }

  return (
    <>
      {trips.map((trip) => (
        <TripCard
          key={trip.trip_id}
          trip={{
            id: trip.trip_id,
            status: trip.status?.key, 
            from: trip.departure?.from,
            to: trip.departure?.to,
            driver: trip.driver?.full_name,
            driverPhone: trip.driver?.phone,
            driverImg: trip.driver?.photo,
            carImg: trip.vehicle?.image,
            type: trip.trip_type,
            time: trip.departure?.at,
            date: trip.departure?.at?.slice(0, 10),
            delayMinutes: trip.delay?.minutes,
          }}
          onCancel={() => {}}
        />
      ))}
    </>
  );
}
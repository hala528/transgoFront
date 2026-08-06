// import { useEffect, useState } from "react";
// import { Axios } from "../../../api/axios";
// import { DELAYED_TRIPS } from "../../../api/api";
// import TripCard from "./TripCard";

// export default function DelayedTrips() {
//   const [trips, setTrips] = useState([]);
//   const formatDelay = (minutes) => {
//   if (!minutes || minutes <= 0) return "0 min";

//   const days = Math.floor(minutes / (60 * 24));
//   const hours = Math.floor((minutes % (60 * 24)) / 60);
//   const mins = minutes % 60;

//   if (days > 0) return `${days} days ${hours} h`;
//   if (hours > 0) return `${hours} hours ${mins} min`;

//   return `${mins} min`;
// };
//   const [loading, setLoading] = useState(false);
// const formattedTrips = trips.map((trip) => ({
//   id: trip.trip_id,

//   status: trip.status?.key,          // أو trip.status?.name إذا بدك تعرض "نشطة"

//   from: trip.route?.from,
//   to: trip.route?.to,

//   driver: trip.driver_name,

//  driverPhone: trip?.driver?.phone,

//   driverImg: "",

//   carImg: "",

//   type: "",

//   time: trip.departure_at
//     ? new Date(trip.departure_at).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       })
//     : "",

//   date: trip.departure_at?.slice(0, 10),

//   delayMinutes: ` (${formatDelay(trip.delay?.minutes)})  ${trip.delay?.minutes}`,
//   // ${trip.delay?.minutes}

//   canCancel: false,
// }));
//   useEffect(() => {
    
//     async function fetchDelayed() {
//       setLoading(true);

//       try {
//         const res = await Axios.get(DELAYED_TRIPS);
//  console.log("FULL RESPONSE:", res);

      
//         console.log("RAW DATA:", res.data);

      
//         console.log("FILTERED ITEMS FROM BACKEND:", res.data?.data?.items);
//         const items = res.data?.data?.items || [];
// console.log(items[0]);
//         setTrips(items);
//       } catch (err) {
//         console.log("ERROR:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDelayed();
//   }, []);

//   if (loading) {
//     return <div style={{ color: "#cbd5f5" }}>Loading...</div>;
//   }

//   if (!trips.length) {
//     return (
//       <div style={{ color: "#cbd5f5", textAlign: "center" }}>
//         No delayed trips
//       </div>
//     );
//   }

//   return (
//     <>
//       {formattedTrips.map((trip) => (
//   <TripCard
//     key={trip.id}
//     trip={trip}
//     onCancel={() => {}}
//   />
// ))}
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Axios } from "../../../api/axios";
import { DELAYED_TRIPS } from "../../../api/api";
import TripCard from "./TripCard";

export default function DelayedTrips() {
  const { t } = useTranslation();
  const [trips, setTrips] = useState([]);
  const formatDelay = (minutes) => {
  if (!minutes || minutes <= 0) return `0 ${t("trips.min")}`;

  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days} ${t("trips.days")} ${hours} ${t("trips.hours")}`;
  if (hours > 0) return `${hours} ${t("trips.hours")} ${mins} ${t("trips.min")}`;

  return `${mins} ${t("trips.min")}`;
};
  const [loading, setLoading] = useState(false);
const formattedTrips = trips.map((trip) => ({
  id: trip.trip_id,

  status: trip.status?.key,          // أو trip.status?.name إذا بدك تعرض "نشطة"

  from: trip.route?.from,
  to: trip.route?.to,

  driver: trip.driver_name,

 driverPhone: trip?.driver?.phone,

  driverImg: "",

  carImg: "",

  type: "",

  time: trip.departure_at
    ? new Date(trip.departure_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "",

  date: trip.departure_at?.slice(0, 10),

  delayMinutes: ` (${formatDelay(trip.delay?.minutes)})  ${trip.delay?.minutes}`,
  // ${trip.delay?.minutes}

  canCancel: false,
}));
  useEffect(() => {
    
    async function fetchDelayed() {
      setLoading(true);

      try {
        const res = await Axios.get(DELAYED_TRIPS);
 console.log("FULL RESPONSE:", res);

      
        console.log("RAW DATA:", res.data);

      
        console.log("FILTERED ITEMS FROM BACKEND:", res.data?.data?.items);
        const items = res.data?.data?.items || [];
console.log(items[0]);
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
    return <div style={{ color: "#cbd5f5" }}>{t("trips.loading")}</div>;
  }

  if (!trips.length) {
    return (
      <div style={{ color: "#cbd5f5", textAlign: "center" }}>
        {t("trips.noDelayedTrips")}
      </div>
    );
  }

  return (
    <>
      {formattedTrips.map((trip) => (
  <TripCard
    key={trip.id}
    trip={trip}
    onCancel={() => {}}
  />
))}
    </>
  );
}
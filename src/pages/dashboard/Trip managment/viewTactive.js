// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";

// import { FiActivity, FiAlertTriangle } from "react-icons/fi";

// import { Axios } from "../../../api/axios";
// import {
//   TRIPS_TRACKING_ACTIVE,
//   GOOGLE_MAPS_API_KEY,
// } from "../../../api/api";

// export default function LiveTrips() {
//   // =========================
//   // STATE
//   // =========================
  
//   const [trips, setTrips] = useState([]);
//   const [summary, setSummary] = useState({
//     active_count: 0,
//     delayed_count: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   // =========================
//   // INITIAL FETCH
//   // =========================
//   const fetchTrips = async () => {
//   try {
//     const res = await Axios.get(TRIPS_TRACKING_ACTIVE);

//     console.log("========== INITIAL RESPONSE ==========");
//     console.log(res);
//     console.log(res.data);

//     const data = res.data?.data;

//     setTrips(data.items || []);
//     setSummary(data.summary || {});
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };
//  const formatDelay = (minutes) => {
//   if (!minutes || minutes <= 0) return "0 min";

//   const days = Math.floor(minutes / (60 * 24));
//   const hours = Math.floor((minutes % (60 * 24)) / 60);
//   const mins = minutes % 60;

//   if (days > 0) return `${days} days ${hours} h`;
//   if (hours > 0) return `${hours} hours ${mins} min`;

//   return `${mins} min`;
// };
//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   // =========================
//   // POLLING (LIVE UPDATES)
//   // =========================
//   const fetchLiveUpdates = async () => {
//     try {
//       const res = await Axios.get(TRIPS_TRACKING_ACTIVE);
//       const data = res.data?.data;

//       setTrips((prev) =>
//         prev.map((trip) => {
//           const updated = data.items.find(
//             (t) => t.trip_id === trip.trip_id
//           );

//           if (!updated) return trip;

//           return {
//             ...trip,
//             current_position: updated.current_position,
//             progress_percent: updated.progress_percent,
//             delay: updated.delay,
//           };
//         })
//       );

//       setSummary(data.summary || {});
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchLiveUpdates();
//     }, 3000); // كل 3 ثواني

//     return () => clearInterval(interval);
//   }, []);

//   // =========================
//   // CENTER MAP
//   // =========================
// const firstTrip = trips.find(
//     t => t.current_position
// );

// // const center = firstTrip
// //     ? {
// //           lat: firstTrip.current_position.latitude,
// //           lng: firstTrip.current_position.longitude,
// //       }
// //     : {
// //           lat:33.5138,
// //           lng:36.3481,
// //       };

// const center = firstTrip
//   ? {
//       lat: firstTrip.current_position.latitude,
//       lng: firstTrip.current_position.longitude,
//     }
//   : { lat: 33.5138, lng: 36.3481 };

//   // =========================
//   // LOADING
//   // =========================
//   if (loading) {
//     return (
//       <div style={{ color: "white", padding: 20 }}>
//         Loading live trips...
//       </div>
//     );
//   }

//   // =========================
//   // UI
//   // =========================
//   return (
//     <div className="dashboard">

//       {/* SUMMARY */}
//       <div className="summary-row">
//         <div className="summary-card active">
//           <FiActivity />
//           <div>
//             <span>Active Trips</span>
//             <h3>{summary.active_count}</h3>
//           </div>
//         </div>

//         <div className="summary-card delayed">
//           <FiAlertTriangle />
//           <div>
//             <span>Delayed Trips</span>
//             <h3>{summary.delayed_count}</h3>
//           </div>
//         </div>
//       </div>

//       {/* MAIN LAYOUT */}
//       <div className="layout">

//         {/* MAP */}
//         {/* <div className="map-box">
         
//         </div> */}

//         {/* SIDEBAR */}
//         <div className="sidebar">

//           {trips.map((trip) => (
//             <div key={trip.trip_id} className="t-card">

//               {/* HEADER */}
//               <div className="t-card-header">

//                 <div className="driver-details">
//                   <div className="driver-name">
//                     {trip.driver_name}
//                   </div>
//                   <div className="driver-phone">
//                     Trip #{trip.trip_id}
//                   </div>
//                 </div>

//                 {/* STATUS */}
//                 <div
//                   className={`t-status ${
//                     trip.delay?.is_delayed
//                       ? "t-status-delayed"
//                       : "t-status-active"
//                   }`}
//                 >
//                   <span className="t-status-dot" />
//                   {trip.status?.name}
//                 </div>
//               </div>

//               {/* ROUTE */}
//               <div className="t-route">
//                 {trip.route.from}
//                 <span className="arrow">→</span>
//                 {trip.route.to}
//               </div>

//               {/* PROGRESS */}
//               {/* <div className="progress">
//                 <div
//                   className="progress-fill"
//                   style={{
//                     width: `${trip.progress_percent}%`,
//                   }}
//                 />
//               </div> */}

//               {/* <div className="progress-text">

//     {trip.progress_percent}% •
//     {trip.current_position
//         ? `${trip.current_position.speed_kmh} km/h`
//         : "No GPS"}

// </div> */}
// {/* <div className="last-update">

// Last Update

// <br/>

// {trip.last_location_at ?? "No Location"}

// </div> */}
// {/* {!trip.has_live_location && (

// <div className="gps-off">

// No Live GPS

// </div>

// )} */}

//               {/* DELAY */}
//              {trip.delay?.is_delayed && (
//   <div className="t-delay-box">
//     <div className="t-delay-label">DELAY</div>
//     <div className="t-delay-time">
//         ({formatDelay(trip.delay?.minutes)})  {trip.delay?.minutes} min Delay
//     </div>
//   </div>
// )}
// <div className="tracking-btn-container">
//   <Link to={`/dashboard/trips/${trip.trip_id}`}>
//     <button className="t-btn-view">
//       View Tracking
//     </button>
//   </Link>
// </div>

//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

import { FiActivity, FiAlertTriangle } from "react-icons/fi";

import { Axios } from "../../../api/axios";
import {
  TRIPS_TRACKING_ACTIVE,
  GOOGLE_MAPS_API_KEY,
} from "../../../api/api";

export default function LiveTrips() {
  const { t } = useTranslation();
  // =========================
  // STATE
  // =========================
  
  const [trips, setTrips] = useState([]);
  const [summary, setSummary] = useState({
    active_count: 0,
    delayed_count: 0,
  });
  const [loading, setLoading] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // =========================
  // INITIAL FETCH
  // =========================
  const fetchTrips = async () => {
  try {
    const res = await Axios.get(TRIPS_TRACKING_ACTIVE);

    console.log("========== INITIAL RESPONSE ==========");
    console.log(res);
    console.log(res.data);

    const data = res.data?.data;

    setTrips(data.items || []);
    setSummary(data.summary || {});
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
 const formatDelay = (minutes) => {
  if (!minutes || minutes <= 0) return `0 ${t("liveTrips.min")}`;

  const days = Math.floor(minutes / (60 * 24));
  const hours = Math.floor((minutes % (60 * 24)) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days} ${t("liveTrips.days")} ${hours} ${t("liveTrips.hoursShort")}`;
  if (hours > 0) return `${hours} ${t("liveTrips.hoursFull")} ${mins} ${t("liveTrips.min")}`;

  return `${mins} ${t("liveTrips.min")}`;
};
  useEffect(() => {
    fetchTrips();
  }, []);

  // =========================
  // POLLING (LIVE UPDATES)
  // =========================
  const fetchLiveUpdates = async () => {
    try {
      const res = await Axios.get(TRIPS_TRACKING_ACTIVE);
      const data = res.data?.data;

      setTrips((prev) =>
        prev.map((trip) => {
          const updated = data.items.find(
            (t) => t.trip_id === trip.trip_id
          );

          if (!updated) return trip;

          return {
            ...trip,
            current_position: updated.current_position,
            progress_percent: updated.progress_percent,
            delay: updated.delay,
          };
        })
      );

      setSummary(data.summary || {});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveUpdates();
    }, 3000); // كل 3 ثواني

    return () => clearInterval(interval);
  }, []);

  // =========================
  // CENTER MAP
  // =========================
const firstTrip = trips.find(
    t => t.current_position
);

// const center = firstTrip
//     ? {
//           lat: firstTrip.current_position.latitude,
//           lng: firstTrip.current_position.longitude,
//       }
//     : {
//           lat:33.5138,
//           lng:36.3481,
//       };

const center = firstTrip
  ? {
      lat: firstTrip.current_position.latitude,
      lng: firstTrip.current_position.longitude,
    }
  : { lat: 33.5138, lng: 36.3481 };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div style={{ color: "white", padding: 20 }}>
        {t("liveTrips.loading")}
      </div>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="dashboard">

      {/* SUMMARY */}
      <div className="summary-row">
        <div className="summary-card active">
          <FiActivity />
          <div>
            <span>{t("liveTrips.activeTrips")}</span>
            <h3>{summary.active_count}</h3>
          </div>
        </div>

        <div className="summary-card delayed">
          <FiAlertTriangle />
          <div>
            <span>{t("liveTrips.delayedTrips")}</span>
            <h3>{summary.delayed_count}</h3>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="layout">

        {/* MAP */}
        {/* <div className="map-box">
         
        </div> */}

        {/* SIDEBAR */}
        <div className="sidebar">

          {trips.map((trip) => (
            <div key={trip.trip_id} className="t-card">

              {/* HEADER */}
              <div className="t-card-header">

                <div className="driver-details">
                  <div className="driver-name">
                    {trip.driver_name}
                  </div>
                  <div className="driver-phone">
                    {t("liveTrips.tripId", { id: trip.trip_id })}
                  </div>
                </div>

                {/* STATUS */}
                <div
                  className={`t-status ${
                    trip.delay?.is_delayed
                      ? "t-status-delayed"
                      : "t-status-active"
                  }`}
                >
                  <span className="t-status-dot" />
                  {trip.status?.name}
                </div>
              </div>

              {/* ROUTE */}
              <div className="t-route">
                {trip.route.from}
                <span className="arrow">→</span>
                {trip.route.to}
              </div>

              {/* PROGRESS */}
              {/* <div className="progress">
                <div
                  className="progress-fill"
                  style={{
                    width: `${trip.progress_percent}%`,
                  }}
                />
              </div> */}

              {/* <div className="progress-text">

    {trip.progress_percent}% •
    {trip.current_position
        ? `${trip.current_position.speed_kmh} km/h`
        : "No GPS"}

</div> */}
{/* <div className="last-update">

Last Update

<br/>

{trip.last_location_at ?? "No Location"}

</div> */}
{/* {!trip.has_live_location && (

<div className="gps-off">

No Live GPS

</div>

)} */}

              {/* DELAY */}
             {trip.delay?.is_delayed && (
  <div className="t-delay-box">
    <div className="t-delay-label">{t("trips.delaySuffix").toUpperCase()}</div>
    <div className="t-delay-time">
        ({formatDelay(trip.delay?.minutes)})  {trip.delay?.minutes} {t("trips.delaySuffix")}
    </div>
  </div>
)}
<div className="tracking-btn-container">
  <Link to={`/dashboard/trips/${trip.trip_id}`}>
    <button className="t-btn-view">
      {t("liveTrips.viewTracking")}
    </button>
  </Link>
</div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
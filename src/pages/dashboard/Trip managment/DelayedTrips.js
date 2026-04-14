// import { useEffect, useState } from "react";
// import { Axios } from "../../../api/axios";
// import { DELAYED_TRIPS, IMAGE_BASE } from "../../../api/api";
// import { Button } from "react-bootstrap";

// export default function DelayedTrips() {
//   const [trips, setTrips] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchDelayedTrips() {
//       setLoading(true);

//       try {
//         const res = await Axios.get(DELAYED_TRIPS);

//         console.log("DELAYED RESPONSE:", res.data);

//         setTrips(res.data?.data?.items || []);
//       } catch (err) {
//         console.log("ERROR DELAYED:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDelayedTrips();
//   }, []);

//   if (loading) {
//     return (
//       <div style={{ color: "#cbd5f5", textAlign: "center", padding: 20 }}>
//         Loading delayed trips...
//       </div>
//     );
//   }

//   if (trips.length === 0) {
//     return (
//       <div style={{ color: "#cbd5f5", textAlign: "center", padding: 20 }}>
//         No delayed trips found 🚫
//       </div>
//     );
//   }

//   return (
//     <div className="t-grid">
//       {trips.map((trip) => (
//         <div key={trip.trip_id} className="t-card">

          
//           <div className="t-card-header">
//             <span className="t-id">#{trip.trip_id}</span>

//             <div style={{ color: "red" }}>
//               ⚠ Delayed
//             </div>
//           </div>

        
//           {trip.vehicle?.image && (
//             <img
//               src={`${IMAGE_BASE}/${trip.vehicle.image}`}
//               className="t-car-img"
//               alt="car"
//             />
//           )}

//           {/* ROUTE (نفس Trips) */}
//           <div className="t-route-visual">
//             <div className="t-stop-row">
//               <div className="t-stop t-stop-from"></div>
//               <span className="t-stop-label">
//                 {trip.departure?.from}
//               </span>
//             </div>

//             <div className="t-line"></div>

//             <div className="t-stop-row">
//               <div className="t-stop t-stop-to"></div>
//               <span className="t-stop-label">
//                 {trip.departure?.to}
//               </span>
//             </div>
//           </div>

//           {/* DRIVER (نفس Trips) */}
//           <div className="t-driver-row">
//             <img
//               src={
//                 trip.driver?.photo
//                   ? `${IMAGE_BASE}/${trip.driver.photo}`
//                   : ""
//               }
//               className="t-driver-img"
//               alt="driver"
//             />

//             <span className="t-driver-name">
//               {trip.driver?.full_name}
//             </span>
//           </div>

//           {/* 🔥 NEW: Delay تحت السائق */}
//           <div className="t-time">
//             Delay time: {trip.delay_minutes ?? "N/A"} min
//           </div>

//           {/* ACTIONS (نفس Trips بدون Cancel) */}
//           <div className="t-actions">
//             <Button size="sm" className="t-btn-view">
//               View details
//             </Button>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// }

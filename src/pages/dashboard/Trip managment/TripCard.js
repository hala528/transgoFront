// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function TripCard({ trip }) {
//   return (
//     <div className="t-card">
//       <div className="t-card-header">
//         <span className="t-id">#{trip.id}</span>

//         <div className="t-status" style={{ color: trip.statusColor }}>
//           <span className="t-status-dot"></span>
//           <span className="t-status-text">
//             {trip.status?.charAt(0).toUpperCase() + trip.status?.slice(1)}
//           </span>
//         </div>
//       </div>

//       {trip.carImg && (
//         <img src={trip.carImg} className="t-car-img" alt="car" />
//       )}

//       <div className="t-route-visual">
//         <div className="t-stop-row">
//           <div className="t-stop t-stop-from"></div>
//           <span className="t-stop-label">{trip.from}</span>
//         </div>

//         <div className="t-line"></div>

//         <div className="t-stop-row">
//           <div className="t-stop t-stop-to"></div>
//           <span className="t-stop-label">{trip.to}</span>
//         </div>
//       </div>

//       <div className="t-driver-row">
//         <img src={trip.driverImg} className="t-driver-img" alt="driver" />
//         <span className="t-driver-name">{trip.driver}</span>
//       </div>

//       <div className="t-type t-type-right">{trip.type}</div>

//       <div className="t-time">
//         {trip.time} · {trip.date}
//       </div>

//       <div className="t-actions">
//         <Link to={`/dashboard/trips/${trip.id}`} style={{ flex: 1 }}>
//           <Button size="sm" className="t-btn-view">
//             view details
//           </Button>
//         </Link>

//         <Button
//           size="sm"
//           disabled={!trip.canCancel}
//           className="t-btn-cancel"
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// }

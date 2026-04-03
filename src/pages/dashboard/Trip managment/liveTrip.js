// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { useState } from "react";

// export default function TripsMap({ trips }) {
//   const [showMap, setShowMap] = useState(false);

//   const activeTrips = trips.filter(t => t.status === "active");

//   return (
//     <div style={{ marginTop: 20 }}>
//       {/* زر Live Map */}
//       <button
//         onClick={() => setShowMap(!showMap)}
//         style={{
//           background: "rgba(0,255,0,0.2)",
//           color: "white",
//           border: "1px solid rgba(0,255,0,0.5)",
//           padding: "6px 12px",
//           borderRadius: 6,
//           cursor: "pointer",
//           display: "flex",
//           alignItems: "center",
//           gap: 6
//         }}
//       >
//         <span 
//           style={{
//             width: 10,
//             height: 10,
//             borderRadius: "50%",
//             background: "limegreen",
//             animation: showMap ? "blink 1s infinite" : "none"
//           }}
//         ></span>
//         Live Map
        

//       </button>

//       {/* الخريطة */}
//       {showMap && (
//         <div style={{ height: "400px", marginTop: 12, borderRadius: 12, overflow: "hidden" }}>
//           <MapContainer center={[34.7, 36.7]} zoom={6} style={{ height: "100%", width: "100%" }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {activeTrips.map((trip) => (
//               <Marker key={trip.id} position={[trip.lat, trip.lng]}>
//                 <Popup>
//                   {trip.driver} - {trip.from} → {trip.to}
//                 </Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//       )}

//       {/* Animation CSS */}
//       <style>
//         {`
//           @keyframes blink {
//             0%, 50%, 100% { opacity: 1; }
//             25%, 75% { opacity: 0; }
//           }
//         `}
//       </style>
//     </div>
//   );
// }
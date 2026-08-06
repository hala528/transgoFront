// import React from "react";
// import "./TripTracking.css";
// import { useParams } from "react-router-dom";
// import { Axios } from "../../../api/axios";
// import { TRIP_TRACKING, GOOGLE_MAPS_API_KEY } from "../../../api/api";
// import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
// import polyline from "@mapbox/polyline";

// export default function TripTracking() {
//   const { id } = useParams();

//   const [tripData, setTripData] = React.useState(null);
//   const [carPosition, setCarPosition] = React.useState(null);

//   const tracking = tripData?.tracking;
//   const last = tracking?.last_position;

//   const logs = tracking?.history?.items || [];
//   const routePoints = tracking?.route?.points || [];

//   const mapContainerStyle = {
//     width: "100%",
//     height: "100%",
//   };

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//     libraries: ["maps"],
//   });

  
//   // React.useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const res = await Axios.get(TRIP_TRACKING(id));
//   //       console.log("TRIP TRACK RESPONSE:", res.data);
//   //       setTripData(res.data.data);
//   //     } catch (err) {
//   //       console.log(err);
//   //     }
//   //   };

//   //   if (id) fetchData();
//   // }, [id]);
// const fetchData = async () => {
//   try {
//     const res = await Axios.get(TRIP_TRACKING(id));
//     console.log("TRIP TRACK RESPONSE:", res.data);
//     setTripData(res.data.data);
//   } catch (err) {
//     console.log(err);
//   }
// };
// React.useEffect(() => {
//   if (id) {
//     fetchData();
//   }
// }, [id]);
// React.useEffect(() => {
//   if (!id) return;

//   const interval = setInterval(() => {
//     fetchData();
//   }, 5000);

//   return () => clearInterval(interval);
// }, [id]);
//   // const tracking = tripData?.tracking;
//   // React.useEffect(() => {
//   //   if (logs.length > 0) {
//   //     const sorted = [...logs].sort(
//   //       (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
//   //     );

//   //     setCarPosition({
//   //       lat: sorted[0].latitude,
//   //       lng: sorted[0].longitude,
//   //     });
//   //   }
//   // }, [logs]);
// React.useEffect(() => {
//   if (!tracking?.last_position) return;

//   setCarPosition({
//     lat: tracking.last_position.latitude,
//     lng: tracking.last_position.longitude,
//   });
// }, [tracking?.last_position]);
 
//   // React.useEffect(() => {
//   //   if (!logs.length) return;

//   //   const sorted = [...logs].sort(
//   //     (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
//   //   );

//   //   let i = 0;

//   //   const interval = setInterval(() => {
//   //     if (i < sorted.length) {
//   //       setCarPosition({
//   //         lat: sorted[i].latitude,
//   //         lng: sorted[i].longitude,
//   //       });
//   //       i++;
//   //     }
//   //   }, 1500);

//   //   return () => clearInterval(interval);
//   // }, [logs]);

  
//   const routePath = React.useMemo(() => {

//     if (tripData?.trip?.route_polyline) {
//       return polyline.decode(tripData.trip.route_polyline).map(([lat, lng]) => ({
//         lat,
//         lng,
//       }));
//     }


//     if (tracking?.route_polyline) {
//       return polyline.decode(tracking.route_polyline).map(([lat, lng]) => ({
//         lat,
//         lng,
//       }));
//     }

//     return [];
//   }, [tripData?.trip?.route_polyline, tracking?.route_polyline]);

//   return (
//     <div className="trip-dashboard" dir="ltr">

//       {/* HEADER */}
//      <div className="td-header">
//         <div className="td-title-row">
//           <span className="td-back" onClick={() => window.history.back()}>
//             ←
//           </span>
//           <h1 className="main-title">
//             Trip Tracking #{tripData?.trip_id || "—"}
//           </h1>
//         </div>
//       </div>

//       {/* TOP CARDS */}
//       {/* TOP CARDS */}
// <section className="top-cards-grid">

//   {/* STATUS */}
//   <div className="top-card">
//     <span className="card-label">Trip Status</span>
//     <span
//  className={`t-status t-status-${tripData?.status?.key}`}
// >
//  <span className="t-status-dot"></span>

//  {tripData?.status?.name || "—"}

// </span>
//   </div>

//   {/* TRIP ID */}
//   <div className="top-card">
//     <span className="card-label">Trip ID</span>
//     <div className="card-value-route">
//       {tripData?.trip_id || "—"}
//     </div>
//   </div>

//   {/* ROUTE */}
//   <div className="top-card">
//     <span className="card-label">Route</span>
//     <div className="card-value-route">
//       {tripData?.trip?.to || "—"} → {tripData?.trip?.from || "—"}
//     </div>
//   </div>

//   {/* DEPARTURE */}
//   <div className="top-card">
//     <span className="card-label">Departure</span>
//    <div className="card-value-date">

// {tripData?.trip?.departure_at
//  ? `${tripData.trip.departure_at.slice(0,10)}
//     ${new Date(
//       tripData.trip.departure_at
//     ).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit",
//       hour12:true,
//       // timeZone:"UTC",
//     })}`
//  : "—"}

// </div>
//   </div>

//   {/* LAST UPDATE */}
//   <div className="top-card">
//     <span className="card-label">last_location_at</span>
//     <div className="card-value-date text-amber">

// {tripData?.tracking?.last_location_at
//  ? `${tripData.tracking.last_location_at.slice(0,10)}
//     ${new Date(
//       tripData.tracking.last_location_at
//     ).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit",
//       hour12:true,
//       // timeZone:"UTC",
//     })}`
//  : "—"}

// </div>
//   </div>

//   {/* LIVE STATUS */}
//   <div className="top-card">
//     <span className="card-label">Live Tracking</span>
// <span
//  className={`t-status ${
//   tripData?.tracking?.is_tracking_active
//    ? "t-status-active"
//    : "t-status-canceled"
//  }`}
// >

//  <span className="t-status-dot"></span>

//  {tripData?.tracking?.is_tracking_active
//    ? "Active"
//    : "Inactive"}

// </span>
//   </div>

// </section>

//       {/* MAIN */}
//       <div className="main-layout-grid">

//         {/* SIDEBAR */}
//         <aside className="sidebar-section">

//          <div className="sidebar-card tracking-card">
//   <h3 className="sidebar-card-title">📡 Tracking Status</h3>

//   <div className="info-list">

//     <div className="info-row">
//       <span>Tracking Active</span>
//       <span className={tracking?.is_tracking_active ? "badge-green" : "badge-red"}>
//         {tracking?.is_tracking_active ? "Yes" : "No"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>Live Location</span>
//       <span className={tracking?.has_live_location ? "badge-green" : "badge-red"}>
//         {tracking?.has_live_location ? "Yes" : "No"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>last_location_at</span>
//       <span className="text-muted">
//        {tracking?.last_location_at
//  ? `${tracking.last_location_at.slice(0,10)}
//     ${new Date(
//       tracking.last_location_at
//     ).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit",
//       hour12:true,
//       // timeZone:"UTC",
//     })}`
//  : "—"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>tracking_started_at</span>
//     <span className="text-muted">

// {tracking?.tracking_started_at
//  ? `${tracking.tracking_started_at.slice(0,10)}
//     ${new Date(
//       tracking.tracking_started_at
//     ).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit",
//       hour12:true,
//       // timeZone:"UTC",
//     })}`
//  : "—"}

// </span>
//     </div>

//     <div className="info-row">
//       <span>tracking_stopped_at</span>
//      <span className="text-muted">

// {tracking?.tracking_stopped_at
//  ? `${tracking.tracking_stopped_at.slice(0,10)}
//     ${new Date(
//       tracking.tracking_stopped_at
//     ).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit",
//       hour12:true,
//       // timeZone:"UTC",
//     })}`
//  : "—"}

// </span>
//     </div>

//   </div>
// </div>

//         <div className="sidebar-card">
//   <h3 className="sidebar-card-title">📍 Last Location</h3>

//   <div className="info-list">

//     <div className="info-row">
//       <span>Latitude</span>
//       <span className="font-mono">
//         {last?.latitude ?? "—"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>Longitude</span>
//       <span className="font-mono">
//         {last?.longitude ?? "—"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>Speed</span>
//       <span className="text-cyan">
//         {last?.speed_kmh != null ? `${last.speed_kmh} km/h` : "—"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>Heading</span>
//       <span>
//         {last?.heading != null ? `${last.heading}°` : "—"}
//       </span>
//     </div>

//     <div className="info-row">
//       <span>Accuracy</span>
//       <span>
//         {last?.accuracy_meters != null ? `${last.accuracy_meters} m` : "—"}
//       </span>
//     </div>

//   </div>
// </div>

//         </aside>

//         {/* MAIN CONTENT */}
//         <main className="main-content-section">

//           {/* MAP */}
//      <div className="map-wrapper-placeholder">

//   {!isLoaded ? (
//     <div style={{ color: "white", padding: 20 }}>
//       Loading Map...
//     </div>
//   ) : (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       center={
//         carPosition || {
//           lat: last?.latitude || 33.5138,
//           lng: last?.longitude || 36.3481,
//         }
//       }
//       zoom={15}
//       options={{
//   zoomControl: true,
//   streetViewControl: false,
//   mapTypeControl: false,
//   fullscreenControl: true,
// }}
//     >

//       {/* 🔵 Start + End dynamically */}
//       {routePoints.map((p) => (
//         <Marker
//           key={p.point_id}
//           position={{
//             lat: p.latitude,
//             lng: p.longitude,
//           }}
//           label={p.type === "start" ? "A" : "B"}
//         />
//       ))}

//       {/*  Car Marker (moving) */}
//       {carPosition && (
//         <Marker
//           position={carPosition}
//           icon={{
//            url:"https://cdn-icons-png.flaticon.com/512/744/744465.png",
//             scaledSize: new window.google.maps.Size(45, 45),
//           }}
//         />
//       )}

//       {/* Real Route Line (polyline decoded) */}
//       {routePath.length > 0 && (
//         <Polyline
//           path={routePath}
//           options={{
//             strokeColor: "#8b5cf6",
//             strokeOpacity: 1,
//             strokeWeight: 4,
//           }}
//         />
//       )}

//     </GoogleMap>
//   )}

// </div>

//           {/* ROUTE */}
//         <div className="route-timeline-card">

//   <div className="timeline-header">
//     <span>Route Timeline</span>
//   </div>

//   <div className="timeline-body">

//     {/* START */}
//     {routePoints.find(p => p.type === "start") && (
//       <div className="timeline-point text-right">
//         <div className="point-badge alpha-bg">A</div>

//         <div className="point-info">
//           <h4>
//             {routePoints.find(p => p.type === "start")?.address}
//           </h4>

//           <p>
//             {routePoints.find(p => p.type === "start")?.address}
//           </p>

//           <span className="badge-green-sm">Start</span>
//         </div>
//       </div>
//     )}

//     {/* CONNECTOR */}
//     <div className="timeline-line-connector">
//       <span className="distance-text">Route</span>
//       <div className="dashed-line"></div>
//       <span className="moving-car">🚘</span>
//     </div>

//     {/* END */}
//     {routePoints.find(p => p.type === "end") && (
//       <div className="timeline-point text-left">
//         <div className="point-badge beta-bg">B</div>

//         <div className="point-info">
//           <h4>
//             {routePoints.find(p => p.type === "end")?.address}
//           </h4>

//           <p>
//             {routePoints.find(p => p.type === "end")?.address}
//           </p>

//           <span className="badge-red-sm">End</span>
//         </div>
//       </div>
//     )}

//   </div>
// </div>

//           {/* TABLE */}
//           <div className="table-card">

//   <h3 className="table-card-title">
//     Location Logs (Last 5)
//   </h3>

//   <div className="table-responsive">
//     <table className="custom-dashboard-table">

//       <thead>
//         <tr>
//           <th>#</th>
//           <th>Time</th>
//           <th>Lat</th>
//           <th>Lng</th>
//           <th>Speed</th>
//           <th>Heading</th>
//           <th>Accuracy</th>
//         </tr>
//       </thead>

//       <tbody>
//         {logs.map((log) => (
//           <tr key={log.location_id}>

//             <td>
//               <span className="table-dot"></span>
//               {log.location_id}
//             </td>

//             <td className="font-mono">
//               {/* {log.recorded_at || "—"} */}
//               {log?.recorded_at
//  ? `${log.recorded_at.slice(0,10)}
//     ${new Date(
//       log.recorded_at
//     ).toLocaleTimeString([],{
//       hour:"2-digit",
//       minute:"2-digit",
//       hour12:true,
//       // timeZone:"UTC",
//     })}`
//  : "—"}
//             </td>

//             <td className="font-mono">
//               {log.latitude ?? "—"}
//             </td>

//             <td className="font-mono">
//               {log.longitude ?? "—"}
//             </td>

//             <td>
//               {log.speed_kmh != null ? `${log.speed_kmh} km/h` : "—"}
//             </td>

//             <td>
//               {log.heading != null ? `${log.heading}°` : "—"}
//             </td>

//             <td>
//               {log.accuracy_meters != null ? `${log.accuracy_meters} m` : "—"}
//             </td>

//           </tr>
//         ))}
//       </tbody>

//     </table>
//   </div>

// </div>

//         </main>
//       </div>
//     </div>
//   );
// }
import React from "react";
import "./TripTracking.css";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Axios } from "../../../api/axios";
import { TRIP_TRACKING, GOOGLE_MAPS_API_KEY } from "../../../api/api";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import polyline from "@mapbox/polyline";

export default function TripTracking() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [tripData, setTripData] = React.useState(null);
  const [carPosition, setCarPosition] = React.useState(null);

  const tracking = tripData?.tracking;
  const last = tracking?.last_position;

  const logs = tracking?.history?.items || [];
  const routePoints = tracking?.route?.points || [];

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["maps"],
  });

  
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await Axios.get(TRIP_TRACKING(id));
  //       console.log("TRIP TRACK RESPONSE:", res.data);
  //       setTripData(res.data.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   if (id) fetchData();
  // }, [id]);
const fetchData = async () => {
  try {
    const res = await Axios.get(TRIP_TRACKING(id));
    console.log("TRIP TRACK RESPONSE:", res.data);
    setTripData(res.data.data);
  } catch (err) {
    console.log(err);
  }
};
React.useEffect(() => {
  if (id) {
    fetchData();
  }
}, [id]);
React.useEffect(() => {
  if (!id) return;

  const interval = setInterval(() => {
    fetchData();
  }, 5000);

  return () => clearInterval(interval);
}, [id]);
  // const tracking = tripData?.tracking;
  // React.useEffect(() => {
  //   if (logs.length > 0) {
  //     const sorted = [...logs].sort(
  //       (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
  //     );

  //     setCarPosition({
  //       lat: sorted[0].latitude,
  //       lng: sorted[0].longitude,
  //     });
  //   }
  // }, [logs]);
React.useEffect(() => {
  if (!tracking?.last_position) return;

  setCarPosition({
    lat: tracking.last_position.latitude,
    lng: tracking.last_position.longitude,
  });
}, [tracking?.last_position]);
 
  // React.useEffect(() => {
  //   if (!logs.length) return;

  //   const sorted = [...logs].sort(
  //     (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
  //   );

  //   let i = 0;

  //   const interval = setInterval(() => {
  //     if (i < sorted.length) {
  //       setCarPosition({
  //         lat: sorted[i].latitude,
  //         lng: sorted[i].longitude,
  //       });
  //       i++;
  //     }
  //   }, 1500);

  //   return () => clearInterval(interval);
  // }, [logs]);

  
  const routePath = React.useMemo(() => {

    if (tripData?.trip?.route_polyline) {
      return polyline.decode(tripData.trip.route_polyline).map(([lat, lng]) => ({
        lat,
        lng,
      }));
    }


    if (tracking?.route_polyline) {
      return polyline.decode(tracking.route_polyline).map(([lat, lng]) => ({
        lat,
        lng,
      }));
    }

    return [];
  }, [tripData?.trip?.route_polyline, tracking?.route_polyline]);

  return (
    <div className="trip-dashboard" dir="ltr">

      {/* HEADER */}
     <div className="td-header">
        <div className="td-title-row">
          <span className="td-back" onClick={() => window.history.back()}>
            ←
          </span>
          <h1 className="main-title">
            {t("tripTracking.title", { id: tripData?.trip_id || "—" })}
          </h1>
        </div>
      </div>

      {/* TOP CARDS */}
      {/* TOP CARDS */}
<section className="top-cards-grid">

  {/* STATUS */}
  <div className="top-card">
    <span className="card-label">{t("tripTracking.tripStatus")}</span>
    <span
 className={`t-status t-status-${tripData?.status?.key}`}
>
 <span className="t-status-dot"></span>

 {tripData?.status?.name || "—"}

</span>
  </div>

  {/* TRIP ID */}
  <div className="top-card">
    <span className="card-label">{t("tripTracking.tripId")}</span>
    <div className="card-value-route">
      {tripData?.trip_id || "—"}
    </div>
  </div>

  {/* ROUTE */}
  <div className="top-card">
    <span className="card-label">{t("tripTracking.route")}</span>
    <div className="card-value-route">
      {tripData?.trip?.to || "—"} → {tripData?.trip?.from || "—"}
    </div>
  </div>

  {/* DEPARTURE */}
  <div className="top-card">
    <span className="card-label">{t("tripTracking.departure")}</span>
   <div className="card-value-date">

{tripData?.trip?.departure_at
 ? `${tripData.trip.departure_at.slice(0,10)}
    ${new Date(
      tripData.trip.departure_at
    ).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      // timeZone:"UTC",
    })}`
 : "—"}

</div>
  </div>

  {/* LAST UPDATE */}
  <div className="top-card">
    <span className="card-label">{t("tripTracking.lastLocationAt")}</span>
    <div className="card-value-date text-amber">

{tripData?.tracking?.last_location_at
 ? `${tripData.tracking.last_location_at.slice(0,10)}
    ${new Date(
      tripData.tracking.last_location_at
    ).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      // timeZone:"UTC",
    })}`
 : "—"}

</div>
  </div>

  {/* LIVE STATUS */}
  <div className="top-card">
    <span className="card-label">{t("tripTracking.liveTracking")}</span>
<span
 className={`t-status ${
  tripData?.tracking?.is_tracking_active
   ? "t-status-active"
   : "t-status-canceled"
 }`}
>

 <span className="t-status-dot"></span>

 {tripData?.tracking?.is_tracking_active
   ? t("tripTracking.active")
   : t("tripTracking.inactive")}

</span>
  </div>

</section>

      {/* MAIN */}
      <div className="main-layout-grid">

        {/* SIDEBAR */}
        <aside className="sidebar-section">

         <div className="sidebar-card tracking-card">
  <h3 className="sidebar-card-title">{t("tripTracking.trackingStatus")}</h3>

  <div className="info-list">

    <div className="info-row">
      <span>{t("tripTracking.trackingActive")}</span>
      <span className={tracking?.is_tracking_active ? "badge-green" : "badge-red"}>
        {tracking?.is_tracking_active ? t("tripTracking.yes") : t("tripTracking.no")}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.liveLocation")}</span>
      <span className={tracking?.has_live_location ? "badge-green" : "badge-red"}>
        {tracking?.has_live_location ? t("tripTracking.yes") : t("tripTracking.no")}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.lastLocationAt")}</span>
      <span className="text-muted">
       {tracking?.last_location_at
 ? `${tracking.last_location_at.slice(0,10)}
    ${new Date(
      tracking.last_location_at
    ).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      // timeZone:"UTC",
    })}`
 : "—"}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.trackingStartedAt")}</span>
    <span className="text-muted">

{tracking?.tracking_started_at
 ? `${tracking.tracking_started_at.slice(0,10)}
    ${new Date(
      tracking.tracking_started_at
    ).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      // timeZone:"UTC",
    })}`
 : "—"}

</span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.trackingStoppedAt")}</span>
     <span className="text-muted">

{tracking?.tracking_stopped_at
 ? `${tracking.tracking_stopped_at.slice(0,10)}
    ${new Date(
      tracking.tracking_stopped_at
    ).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      // timeZone:"UTC",
    })}`
 : "—"}

</span>
    </div>

  </div>
</div>

        <div className="sidebar-card">
  <h3 className="sidebar-card-title">{t("tripTracking.lastLocation")}</h3>

  <div className="info-list">

    <div className="info-row">
      <span>{t("tripTracking.latitude")}</span>
      <span className="font-mono">
        {last?.latitude ?? "—"}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.longitude")}</span>
      <span className="font-mono">
        {last?.longitude ?? "—"}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.speed")}</span>
      <span className="text-cyan">
        {last?.speed_kmh != null ? `${last.speed_kmh} km/h` : "—"}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.heading")}</span>
      <span>
        {last?.heading != null ? `${last.heading}°` : "—"}
      </span>
    </div>

    <div className="info-row">
      <span>{t("tripTracking.accuracy")}</span>
      <span>
        {last?.accuracy_meters != null ? `${last.accuracy_meters} m` : "—"}
      </span>
    </div>

  </div>
</div>

        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content-section">

          {/* MAP */}
     <div className="map-wrapper-placeholder">

  {!isLoaded ? (
    <div style={{ color: "white", padding: 20 }}>
      {t("tripTracking.loadingMap")}
    </div>
  ) : (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={
        carPosition || {
          lat: last?.latitude || 33.5138,
          lng: last?.longitude || 36.3481,
        }
      }
      zoom={15}
      options={{
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
}}
    >

      {/* 🔵 Start + End dynamically */}
      {routePoints.map((p) => (
        <Marker
          key={p.point_id}
          position={{
            lat: p.latitude,
            lng: p.longitude,
          }}
          label={p.type === "start" ? "A" : "B"}
        />
      ))}

      {/*  Car Marker (moving) */}
      {carPosition && (
        <Marker
          position={carPosition}
          icon={{
           url:"https://cdn-icons-png.flaticon.com/512/744/744465.png",
            scaledSize: new window.google.maps.Size(45, 45),
          }}
        />
      )}

      {/* Real Route Line (polyline decoded) */}
      {routePath.length > 0 && (
        <Polyline
          path={routePath}
          options={{
            strokeColor: "#8b5cf6",
            strokeOpacity: 1,
            strokeWeight: 4,
          }}
        />
      )}

    </GoogleMap>
  )}

</div>

          {/* ROUTE */}
        <div className="route-timeline-card">

  <div className="timeline-header">
    <span>{t("tripTracking.routeTimeline")}</span>
  </div>

  <div className="timeline-body">

    {/* START */}
    {routePoints.find(p => p.type === "start") && (
      <div className="timeline-point text-right">
        <div className="point-badge alpha-bg">A</div>

        <div className="point-info">
          <h4>
            {routePoints.find(p => p.type === "start")?.address}
          </h4>

          <p>
            {routePoints.find(p => p.type === "start")?.address}
          </p>

          <span className="badge-green-sm">{t("tripTracking.start")}</span>
        </div>
      </div>
    )}

    {/* CONNECTOR */}
    <div className="timeline-line-connector">
      <span className="distance-text">{t("tripTracking.route")}</span>
      <div className="dashed-line"></div>
      <span className="moving-car">🚘</span>
    </div>

    {/* END */}
    {routePoints.find(p => p.type === "end") && (
      <div className="timeline-point text-left">
        <div className="point-badge beta-bg">B</div>

        <div className="point-info">
          <h4>
            {routePoints.find(p => p.type === "end")?.address}
          </h4>

          <p>
            {routePoints.find(p => p.type === "end")?.address}
          </p>

          <span className="badge-red-sm">{t("tripTracking.end")}</span>
        </div>
      </div>
    )}

  </div>
</div>

          {/* TABLE */}
          <div className="table-card">

  <h3 className="table-card-title">
    {t("tripTracking.locationLogs")}
  </h3>

  <div className="table-responsive">
    <table className="custom-dashboard-table">

      <thead>
        <tr>
          <th>{t("tripTracking.colNum")}</th>
          <th>{t("tripTracking.colTime")}</th>
          <th>{t("tripTracking.colLat")}</th>
          <th>{t("tripTracking.colLng")}</th>
          <th>{t("tripTracking.colSpeed")}</th>
          <th>{t("tripTracking.colHeading")}</th>
          <th>{t("tripTracking.colAccuracy")}</th>
        </tr>
      </thead>

      <tbody>
        {logs.map((log) => (
          <tr key={log.location_id}>

            <td>
              <span className="table-dot"></span>
              {log.location_id}
            </td>

            <td className="font-mono">
              {/* {log.recorded_at || "—"} */}
              {log?.recorded_at
 ? `${log.recorded_at.slice(0,10)}
    ${new Date(
      log.recorded_at
    ).toLocaleTimeString([],{
      hour:"2-digit",
      minute:"2-digit",
      hour12:true,
      // timeZone:"UTC",
    })}`
 : "—"}
            </td>

            <td className="font-mono">
              {log.latitude ?? "—"}
            </td>

            <td className="font-mono">
              {log.longitude ?? "—"}
            </td>

            <td>
              {log.speed_kmh != null ? `${log.speed_kmh} km/h` : "—"}
            </td>

            <td>
              {log.heading != null ? `${log.heading}°` : "—"}
            </td>

            <td>
              {log.accuracy_meters != null ? `${log.accuracy_meters} m` : "—"}
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>

        </main>
      </div>
    </div>
  );
}

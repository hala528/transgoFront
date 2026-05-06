import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./TripDetails.css";
import { useState, useEffect } from "react";
import { TRIP_DETAILS, IMAGE_BASE,CANCEL_TRIP  } from "../../../api/api";
import { Axios } from "../../../api/axios";
import polyline from "@mapbox/polyline";
import LiveMap from "./LiveMap";
import { useNavigate } from "react-router-dom";



import {
  FaRegClipboard,
  FaRegCalendarAlt,
  FaRegClock,
  FaUsers,
  FaRoute,
  FaCar,
  FaHashtag,
  FaUser,
  FaRegCalendarCheck
} from "react-icons/fa";

export default function TripDetails() {
  const { id } = useParams();
const [success, setSuccess] = useState("");
const [err, setErr] = useState("");
const [showMap, setShowMap] = useState(false);
const navigate = useNavigate();
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(true);
const path = trip?.route?.polyline
  ? polyline.decode(trip.route.polyline).map(([lat, lng]) => ({
      lat,
      lng,
    }))
  : [];

 const handleCancel = async (id) => {
  try {
    const res = await Axios.post(CANCEL_TRIP(id));

    console.log("CANCEL RESPONSE:", res.data);

    
    setSuccess(res.data?.message || "Trip canceled successfully");
    setErr("");
    setTimeout(() => setSuccess(""), 3000);

    const refreshed = await Axios.get(TRIP_DETAILS(id));
    setTrip(refreshed.data.data);

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
    async function getTrip() {
      try {
        const res = await Axios.get(TRIP_DETAILS(id));
        
             
        console.log("FULL RESPONSE:", res);

      
        console.log("RAW DATA:", res.data);

      
        console.log("FILTERED ITEMS FROM BACKEND:", res.data?.data?.items);

    setTrip(res.data.data);
      } catch (err) {
        console.log("ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    getTrip();
  }, [id]);

  if (loading) return <div className="empty-state">Loading...</div>;
  if (!trip) return <div className="empty-state">Trip not found</div>;

  
  const status = trip.status?.key;

  const bookings = trip.booking_info?.bookings || [];

  const departureRaw = trip.general?.departure_at;
const arrivalRaw = trip.general?.expected_arrival_at;

  const driver = trip.driver;
  const vehicle = trip.vehicle;
  const routePoints = trip.route?.points || [];

  return (
    <div className="trip-details-page">
{success && <span className="success">{success}</span>}
{err && <span className="error">{err}</span>}

      {/* HEADER */}
      <div className="td-header">
        <div className="td-title-row">
          <span className="td-back" onClick={() => window.history.back()}>
            ←
          </span>

          <span className="td-breadcrumb">
            Management Trips
          </span>

          <span className="td-separator">/</span>

          <h2>
            Trip #{id}

            <span className={`t-status t-status-${status}`}>
              <span className="t-status-dot"></span>
            {trip.status?.key}

            </span>

          </h2>
        </div>

        <div className="td-header-actions">
          <Button className="td-btn-map">Track on Map</Button>
    <Button
  className="td-btn-cancel"
  onClick={() => handleCancel(id)}
>
  Cancel Trip
</Button>
 

        </div>
      </div>

      <div className="td-grid">

        {/* LEFT */}
        <div className="td-left">

          {/* GENERAL INFO */}
          <div className="td-card">
            <h4>
              <FaRegClipboard className="td-title-icon purple" />
              General Information
            </h4>

            <div className="td-info-grid">

              <div className="td-info-box">
                <span><FaHashtag /> Trip ID</span>
                <strong>#{id}</strong>
              </div>

              <div className="td-info-box">
                <span><FaRegCalendarAlt /> Departure Date</span>
                <strong>
                  {departureRaw?.slice(0, 10)}
                </strong>
              </div>

  <div className="td-info-box">
                <span><FaRegCalendarAlt /> 
estimated_distance_km
</span>
                <strong>
                  {trip.general?.estimated_distance_km}
                </strong>
              </div>
              
  <div className="td-info-box">
                <span><FaRegCalendarAlt /> 
estimated_duration_minutes
:
</span>
                <strong>
                  {trip.general?.estimated_duration_minutes}
                </strong>
              </div>

              <div className="td-info-box">
                <span><FaRegClock /> Departure Time</span>
                <strong>
              {new Date(departureRaw).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
})}
                </strong>
              </div>

              <div className="td-info-box">
                <span><FaRoute /> Trip Type</span>
                <strong>{trip.booking_info?.trip_type
}</strong>

              </div>

              <div className="td-info-box">
                <span><FaRegClock /> Expected Arrival</span>
                <strong>
                  {new Date(arrivalRaw).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
})}
                </strong>
              </div>

              {/* <div className="td-info-box">
                <span><FaUsers /> Seats</span>
                <strong>
                  {vehicle.seats - trip.booking_info.remaining_seats} / {vehicle.seats}
                </strong>
              </div> */}

            </div>
          </div>

          {/* ROUTE */}
          <div className="td-card">
            <h4>
              <FaRoute className="td-title-icon green" />
              Route & Stops
            </h4>

            <div className="td-route">

              {routePoints.map((p, index) => (
                <div key={p.point_id} className="td-route-item">

                  <div className="td-route-top">
                    <span className={`td-badge-${String.fromCharCode(97 + index)}`}>
                      {String.fromCharCode(65 + index)}
                    </span>

                    <div>
                      {p.address}
                      <div className="td-route-sub">
                        {p.type} ·{" "}
                       {new Date(p.expected_arrival_at).toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
})}
                      </div>
                    </div>
                  </div>

                  {index !== routePoints.length - 1 && <div className="td-line" />}
                </div>
              ))}
            


 <div className="td-map-btn-wrapper">
  <Button
  className="td-btn-map w-100"
  onClick={() => setShowMap(!showMap)}
>
  {showMap ? "Close Map" : "Open The Map"}
</Button>
{showMap && (
  <div className="td-map-container">
    <LiveMap
      center={
        routePoints[0]
          ? {
              lat: routePoints[0].latitude,
              lng: routePoints[0].longitude,
            }
          : { lat: 33.5, lng: 36.3 }
      }
      zoom={7}
      markers={[
        routePoints[0] && {
          id: "start",
          lat: routePoints[0].latitude,
          lng: routePoints[0].longitude,
          label: "A",
        },
        routePoints[routePoints.length - 1] && {
          id: "end",
          lat: routePoints[routePoints.length - 1].latitude,
          lng: routePoints[routePoints.length - 1].longitude,
          label: "B",
        },
      ].filter(Boolean)}
      path={path}
    />
  </div>
)}



    </div>

            </div>
          </div>

          {/* BOOKINGS */}
          <div className="td-card">
            <h4>
              <FaRegCalendarCheck className="td-title-icon purple" />
              Bookings ({bookings.length})
            </h4>

            <table className="td-booking-table">

              <thead>
               <tr>
  <th>ID</th>
  
  <th>Name</th>
  <th>booking_code</th>
  <th>pickup_point</th>
  <th>seats_reserved</th>
  <th>Payment</th>
  <th>Status</th>
  {/* <th>Amount</th> */}
  <th>Action</th>
</tr>

              </thead>

             <tbody>
  {bookings.length === 0 ? (
    <tr>
      <td colSpan="7">No bookings</td>
    </tr>
  ) : (
    bookings.map((b) => (
      <tr key={b.booking_id}>

        {/* ID */}
        <td>{b.booking_id}</td>

        {/* Name */}
        <td>{b.passenger?.full_name}</td>
<td>{b.booking_code}</td>
        {/* Pickup */}
       <td>
  {b.pickup_point?.point_name
    ? `${b.pickup_point.point_name}، ${b.pickup_point.governorate?.name || b.pickup_point.governorate}`
    : "—"}
</td>


        {/* Seats */}
        <td>{b.seats_reserved}</td>

        {/* Payment */}
        <td>
          {/* {b.payment?.amount} */}
           ({b.payment?.method})
        </td>

        {/* Status */}
        <td>
          <span className={`t-status t-status-${b.status?.key}`}>
            <span className="t-status-dot"></span>
            {b.status?.key}
          </span>
        </td>

        {/* Attendance
        <td>
         {b.payment?.amount}
        </td> */}

        {/* Action */}
       <td>
  <button
    className="td-btn-action"
    onClick={() => navigate(`/dashboard/BookingDetails/${b.booking_id}`)}
  >
    View Details
  </button>
</td>


      </tr>
    ))
  )}
</tbody>

            </table>
          </div>

        </div>

        {/* RIGHT */}
        <div className="td-right">

          {/* DRIVER */}
          <div className="td-card">
            <h5>
              <FaUser className="td-title-icon purple" />
              Driver Info
            </h5>

            <div className="td-driver">

              <img
                className="td-driver-img"
                src={`${IMAGE_BASE}/${driver.photo}`}
                alt="driver"
              />

              <h6 className="td-driver-name">{driver.full_name}</h6>
              <span className="td-driver-phone">PHone:  {driver.phone}</span>
<h6 className="td-driver-phone">Address:   {driver.profile.address}</h6>
              <div className="td-driver-rating">Rating:  
                ⭐ {driver.profile?.rating}
              </div>

            </div>
          </div>

          {/* VEHICLE */}
          <div className="td-card">
            <h5>
              <FaCar className="td-title-icon green" />
              Vehicle Info
            </h5>

            <div className="td-vehicle">
              <p><span>Type</span> {vehicle.type}</p>
              <p><span>Plate</span> {vehicle.id_card}</p>
              <p><span>Seats</span> {vehicle.seats}</p>
              <p><span>Amenities</span> {vehicle.amenities.join(", ")}</p>

              <img
                className="td-vehicle-img"
                src={`${IMAGE_BASE}/${vehicle.image}`}
                alt="car"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

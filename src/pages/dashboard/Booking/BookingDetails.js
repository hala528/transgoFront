import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { BOOKING_DETAILS } from "../../../api/api";
import LiveMap from "../Trip managment/LiveMap";

export default function BookingDetails() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDateTime = (date) => {
  if (!date) return { date: "-", time: "-" };

  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return {
    date: `${day} - ${month} - ${year}`,
    time: d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      // timeZone: "UTC",
    }),
  };
};
  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await Axios.get(BOOKING_DETAILS(id));
        setData(res.data.data);

        console.log("FULL RESPONSE:", res);
        console.log("DATA:", res.data);
        console.log("ITEMS:", res.data.data.items);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  if (loading) return <div className="empty-state">Loading...</div>;
  if (!data) return <div className="empty-state">No Data</div>;

  const {
    passenger_info,
    booking_info,
    pickup_point_info,
    trip_info,
  } = data;

  // ✅ formatting مرة وحدة
  const bookingCreated = formatDateTime(booking_info.created_at);
  const pickupTime = formatDateTime(pickup_point_info.meeting_time);
  const tripTime = formatDateTime(trip_info.departure_time);

  return (
    <div className="trip-details-page">

      {/* HEADER */}
      <div className="td-header">
        <div className="td-title-row">
          <span className="td-back" onClick={() => window.history.back()}>
            ←
          </span>

          <span className="td-breadcrumb">
            Management Bookings
          </span>

          <span className="td-separator">/</span>

          <h2>
            Booking #{booking_info.booking_id}

            <span className={`t-status t-status-${booking_info.status.key}`}>
              <span className="t-status-dot"></span>
              {booking_info.status.key}
            </span>
          </h2>
        </div>
      </div>

      <div className="td-grid">

        {/* LEFT */}
        <div className="td-left">

          {/* PASSENGER */}
          <div className="td-card">
            <h4>Passenger Info</h4>

            <div className="td-info-grid">
              <div className="td-info-box">
                <span>Full Name</span>
                <strong>{passenger_info.full_name}</strong>
              </div>

              <div className="td-info-box">
                <span>Phone</span>
                <strong>{passenger_info.phone}</strong>
              </div>

              <div className="td-info-box">
                <span>Seats_reserved</span>
                <strong>{passenger_info.seats_reserved}</strong>
              </div>

              <div className="td-info-box">
                <span>Attendance_status</span>
                <strong
                  className={
                    passenger_info.attendance_status === "not_recorded"
                      ? "status-orange"
                      : "status-green"
                  }
                >
                  {passenger_info.attendance_status}
                </strong>
              </div>
            </div>
          </div>

          {/* BOOKING */}
          <div className="td-card">
            <h4>Booking Info</h4>

            <div className="td-info-grid">

              <div className="td-info-box">
                <span>ID</span>
                <strong>{booking_info.booking_id}</strong>
              </div>

              <div className="td-info-box">
                <span>booking_code</span>
                <strong>{booking_info.booking_code}</strong>
              </div>

              <div className="td-info-box">
                <span>booking_type</span>
                <strong>{booking_info.booking_type}</strong>
              </div>

              <div className="td-info-box">
                <span>created_at date</span>
                <strong>{bookingCreated.date}</strong>
              </div>

              <div className="td-info-box">
                <span>created_at time</span>
                <strong>{bookingCreated.time}</strong>
              </div>

              <div className="td-info-box">
                <span>Payment</span>
                <strong>{booking_info.payment_method}</strong>
              </div>

              <div className="td-info-box">
                <span>Reason</span>
                <strong className="status-red">
                  {booking_info.rejection_cancellation_reason || "—"}
                </strong>
              </div>

              <div className="td-info-box">
                <span>Total_amount</span>
                <strong>{booking_info.total_amount}</strong>
              </div>

              <div className="td-info-box">
                <span>Status</span>
                <strong>
                  <span className={`t-status t-status-${booking_info.status.key}`}>
                    <span className="t-status-dot"></span>
                    {booking_info.status.key}
                  </span>
                </strong>
              </div>

            </div>
          </div>

          {/* PICKUP */}
          <div className="td-card">
            <h4>Pickup Point</h4>

            <div className="td-pickup-map-layout">

              <div className="td-pickup-list">

                <div className="td-row">
                  <span className="td-label">Point_name</span>
                  <strong>{pickup_point_info.point_name}</strong>
                </div>

                <div className="td-row">
                  <span className="td-label">Governorate</span>
                  <strong>{pickup_point_info.governorate}</strong>
                </div>

                <div className="td-row">
                  <span className="td-label">Address</span>
                  <strong>{pickup_point_info.address}</strong>
                </div>

                <div className="td-row">
                  <span className="td-label">Meeting Time</span>
                  <strong>
                    {pickupTime.date} - {pickupTime.time}
                  </strong>
                </div>

                <div className="td-row">
                  <span className="td-label">Area</span>
                  <strong>{pickup_point_info.area || "—"}</strong>
                </div>

                <div className="td-row">
                  <span className="td-label">Status</span>
                  <strong className="td-status-green">
                    {pickup_point_info.point_status}
                  </strong>
                </div>

              </div>

              <div className="td-mini-map-side">
                <LiveMap
                  center={{
                    lat: Number(pickup_point_info.location_coordinates?.lat),
                    lng: Number(pickup_point_info.location_coordinates?.lng),
                  }}
                  zoom={14}
                  markers={[
                    {
                      id: "pickup",
                      lat: Number(pickup_point_info.location_coordinates?.lat),
                      lng: Number(pickup_point_info.location_coordinates?.lng),
                    },
                  ]}
                />
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="td-right">

          <div className="td-card">
            <h4>Trip Info</h4>

            <div className="td-pickup-list">

              <div className="td-row">
                <span className="td-label">From</span>
                <strong>{trip_info.from}</strong>
              </div>

              <div className="td-row">
                <span className="td-label">To</span>
                <strong>{trip_info.to}</strong>
              </div>

              <div className="td-row">
                <span className="td-label">Departure</span>
                <strong>
                  {tripTime.date} , {tripTime.time}
                </strong>
              </div>

              <div className="td-row">
                <span className="td-label">Driver</span>
                <strong>{trip_info.driver_name}</strong>
              </div>

              <div className="td-row">
                <span className="td-label">Phone</span>
                <strong>{trip_info.driver_phone}</strong>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
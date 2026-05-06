import { useState, useEffect } from "react";
import TopFilterBar from "../../../components/dashboard/TopFilterBar";
import "./Booking.css";
import { FaClock, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { Axios } from "../../../api/axios";
import { GET_BOOKINGS } from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [expandedTrip, setExpandedTrip] = useState(null);
const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const [paymentFilter, setPaymentFilter] = useState("All");

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  function toggleTrip(id) {
    setExpandedTrip(expandedTrip === id ? null : id);
  }

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  async function getBookings() {
    setLoading(true);
    
    try {
      const res = await Axios.get(GET_BOOKINGS,
        
        {

        params: {
          search: search || undefined,
          status: filter !== "All" ? filter.toLowerCase() : undefined,
          payment_method:
            paymentFilter !== "All"
              ? paymentFilter.toLowerCase()
              : undefined,
          from_date: date || undefined,
          to_date: date || undefined,
          // per_page: 10,
        },
      });

      const items = res.data.data.items;

         console.log("FULL RESPONSE:", res);
console.log("DATA:", res.data);
console.log("ITEMS:", res.data.data.items);
      const grouped = {};

    items.forEach((item) => {
      const dateObj = new Date(item.departure_time);
  if (!grouped[item.trip_id]) {
    grouped[item.trip_id] = {
      id: item.trip_id,
      from: item.from,
      to: item.to,
    // time: item.departure_time,

time: item.departure_time
  ? new Date(item.departure_time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
  : "",

date: item.departure_time.slice(0,10),

      driver_name: item.driver_name,
      status: "Active",
      bookings: [],
    };
  }

  item.bookings.forEach((b) => {
    grouped[item.trip_id].bookings.push({
      id: b.booking_id,
      passenger_name: b.passenger_name,
      seats: b.seats_reserved,
      payment_method:
        b.payment_method === "cash" ? "Cash" : "Electronic",
      status: b.status, 
      amount: b.total_amount,
      date: b.created_at,
      
    });
  });
});


      setTrips(Object.values(grouped));
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }


  useEffect(() => {
    getBookings();
  }, [filter, search, date, paymentFilter]);

  const filteredTrips = trips;

  return (
    <div className="bookings-page">
      <h2 className="page-title">Management Bookings :</h2>

      {/*  FILTER */}
      <TopFilterBar
        filter={filter}
        setFilter={setFilter}
        filtersList={[
          "All",
          "pending",
          "accepted",
          "rejected",
          "canceled",
          "completed",
        ]}
        search={search}
        setSearch={setSearch}
        date={date}
        setDate={setDate}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
      />

      {loading && <p style={{ color: "white" }}>Loading...</p>}

      {filteredTrips.map((trip) => (
        <div key={trip.id} className="b-trip-card">
          {/* ===== HEADER ===== */}
          <div className="b-trip-header">
            <div className="b-trip-left">
              <div className="b-trip-id">Trip #{trip.id}</div>

              <div className="b-meta-item">
                <FaMapMarkerAlt className="b-icon location" />
                <span className="b-label">Route:</span>
                <span className="b-value">
                  {trip.from} → {trip.to}
                </span>
              </div>

              <div className="b-meta-item">
                <FaClock className="b-icon time" />
                <span className="b-label">Time & Date:</span>
                <span className="b-value">
  {trip.time} - {trip.date}
</span>

              </div>

              <div className="b-meta-item">
                <FaUser className="b-icon driver" />
                <span className="b-label">Driver:</span>
                <span className="b-value driver">
                  {trip.driver_name}
                </span>
              </div>
            </div>

            <div className="b-trip-right">
              {/* <span className={`b-status ${trip.status.toLowerCase()}`}>
                {trip.status}
              </span> */}

              <span className="b-bookings-count">
                {trip.bookings.length} bookings
              </span>

              <button
                className="b-expand-btn"
                onClick={() => toggleTrip(trip.id)}
              >
                {expandedTrip === trip.id ? "▲" : "▼"}
              </button>
            </div>
          </div>

          {/* ===== TABLE ===== */}
          {expandedTrip === trip.id && (
            <div className="b-table">
              <div className="b-table-head">
                <span>ID</span>
                <span>Passenger</span>
                <span>Seats</span>
                <span>Payment</span>
                <span>Status</span>
                <span>Amount</span>
                <span>Action</span>
              </div>

              {trip.bookings.length === 0 && (
                <div className="b-no-data">No bookings</div>
              )}

              {trip.bookings.map((b) => (
                <div key={b.id} className="b-table-row">
                  <span>B-{b.id}</span>
                  <span>{b.passenger_name}</span>
                  <span>{b.seats}</span>
                  <span>{b.payment_method}</span>
<span className={`t-status t-status-${b.status.toLowerCase()}`}>
  <span className="t-status-dot"></span>
  {b.status}
</span>

                  <span>{b.amount?.toLocaleString()} SYP</span>

                  <button className="b-details-btn"  
                  onClick={() => navigate(`/dashboard/BookingDetails/${b.id}`)}
                  >
                    Details
                    </button>
                    
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

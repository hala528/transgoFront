import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./TripDetails.css";

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

  
  const status = "active";

  
  const bookings = [
    {
      id: "B-201",
      passengerNo: "P-1001",
      name: "Rami Saleh",
      pickup: "Damascus",
      seats: 1,
      payment: "Cash",
      status: "confirmed",
    },
    {
      id: "B-202",
      passengerNo: "P-1002",
      name: "Omar Ali",
      pickup: "Homs",
      seats: 2,
      payment: "Card",
      status: "pending",
    },
  ];

  return (
    <div className="trip-details-page">

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
              {status}
            </span>

          </h2>
        </div>

        <div className="td-header-actions">
          <Button className="td-btn-map">Track on Map</Button>
          <Button className="td-btn-cancel">Cancel Trip</Button>
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
                <strong>14 Apr 2026</strong>
              </div>

              <div className="td-info-box">
                <span><FaRegClock /> Departure Time</span>
                <strong>08:00 AM</strong>
              </div>

              <div className="td-info-box">
                <span><FaRoute /> Trip Type</span>
                <strong>Shared</strong>
              </div>

              <div className="td-info-box">
                <span><FaRegClock /> Expected Arrival</span>
                <strong>12:30 PM</strong>
              </div>

              <div className="td-info-box">
                <span><FaUsers /> Seats</span>
                <strong>3 / 5 booked</strong>
              </div>

            </div>
          </div>

          {/* ROUTE */}
          <div className="td-card">
            <h4>
              <FaRoute className="td-title-icon green" />
              Route & Stops
            </h4>

            <div className="td-route">

              <div className="td-route-item">
                <div className="td-route-top">
                  <span className="td-badge-a">A</span>
                  <div>
                    Damascus - Umayyad Square
                    <div className="td-route-sub">Departure · 08:00 AM</div>
                  </div>
                </div>
                <div className="td-line" />
              </div>

              <div className="td-route-item">
                <div className="td-route-top">
                  <span className="td-badge-b">B</span>
                  <div>
                    Homs - Clock Tower
                    <div className="td-route-sub">Stop · 10:00 AM</div>
                  </div>
                </div>
                <div className="td-line" />
              </div>

              <div className="td-route-item">
                <div className="td-route-top">
                  <span className="td-badge-c">C</span>
                  <div>
                    Aleppo - Saadallah Square
                    <div className="td-route-sub">Arrival · 12:30 PM</div>
                  </div>
                </div>
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
                  <th>Booking ID</th>
                  <th>Passenger No</th>
                  <th>Passenger</th>
                  <th>Pickup</th>
                  <th>Seats</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.passengerNo}</td>
                    <td>{b.name}</td>
                    <td>{b.pickup}</td>
                    <td>{b.seats}</td>
                    <td>{b.payment}</td>

                    
                    <td>
                      <span className={`t-status t-status-${b.status}`}>
                        <span className="t-status-dot"></span>
                        {b.status}
                      </span>
                    </td>

                    <td>
                      <Button className="td-btn-action" size="sm">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
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
                src={require("../../../assest/PERSON.PNG")}
                alt="driver"
              />

              <h6 className="td-driver-name">Ahmad Karimi</h6>
              <span className="td-driver-phone">0955 123 456</span>

              <div className="td-driver-rating">
                ⭐⭐⭐⭐☆
              </div>

              <button className="td-driver-view-btn">
                View Profile
              </button>

            </div>
          </div>

          {/* VEHICLE */}
          <div className="td-card">
            <h5>
              <FaCar className="td-title-icon green" />
              Vehicle Info
            </h5>

            <div className="td-vehicle">
              <p><span>Type</span> Kia Cerato</p>
              <p><span>Plate</span> Damascus 456789</p>
              <p><span>Seats</span> 5</p>
              <p><span>Amenities</span> AC, USB</p>

              <img
                className="td-vehicle-img"
                src={require("../../../assest/CAR.PNG")}
                alt="car"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

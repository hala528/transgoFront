import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom"; 
 import { Row, Col, Button, Image, Spinner } from "react-bootstrap"; 
 import { beasURL, GET_PASSENGER_DETAILS } from "../../../../api/api";
  import personl from "../../../../assest/personal.png";
   import { Axios } from "../../../../api/axios";
    export default function DetailsPassenger() {
       const { id } = useParams(); const [passenger, setPassenger] = useState(null);
        const [loading, setLoading] = useState(true); 
        function renderStars(rating = 0) { const totalStars = 5;
           const fullStars = Math.floor(rating); const emptyStars = totalStars - fullStars;
            return ( <> {"★".repeat(fullStars)} 
            {"☆".repeat(emptyStars)} </> ); }
             useEffect(() => { Axios.get(`${beasURL}/${GET_PASSENGER_DETAILS(id)}`) 
             .then((res) => { setPassenger(res.data?.data); setLoading(false); }) 
             .catch((err) => { console.log(err); setLoading(false); }); },
              [id]); if (loading) { 
                return (
                   <div className="d-flex justify-content-center align-items-center"
                    style={{ height: "50vh" }}> <Spinner animation="border" variant="light" />
                     </div> ); } if (!passenger) { return <h3 style={{ color: "white" }}>
                     Passenger not found</h3>; }
                      const { basic_information, 
                        account_details, 
                        account_info, 
                        bookings } = passenger;
                         return ( <div className="w-100 p-2"> 
                          {/* 🔙 Back */}
                           <div className="d-flex align-items-center px-3">
                            <span className="td-back" onClick={() => window.history.back()}> ← </span>
                             <h2 style={{ color: "white", padding: 5 }}> Passenger Details : </h2>
                              </div> 
                              {/* 🔷 Main Info */}
                               <div className="card-details d-flex px-3">
                                <Row className="gap-3"> <Col xs={5} md={4}> 
                                <Image src={basic_information?.profile_photo || personl} roundedCircle 
                                style={{ width: "120px", height: "120px", border: "4px solid #4f46e5" }}
                                 /> </Col>
                                  <Col>
                                   <h5 style={{ color: "white" }}> Full Name : {basic_information?.full_name} 
                                   </h5>
                                    <div className="d-flex gap-2 mb-2"> 
                                    <Button 
                                    style={{ background: "#4f46e5", borderRadius: "100px", border: "none" }} > 
                                    Passenger </Button>
                                     <Button
                                      style={{ background: basic_information?.account_status === "active" ? "green" : "red", borderRadius: "100px", border: "none" }} >
                                       {basic_information?.account_status}
                                        </Button> 
                                        </div>
                                         <p style={{ color: "white" }}> Phone : {basic_information?.mobile_number}
                                          </p>
                                           <p style={{ color: "white" }}> Email : {basic_information?.email}
                                            </p> 
                                            </Col>
                                             </Row>
                                              </div>
                                               {/* 🔷 Cards */}
                                                <div className="d-flex gap-3 p-2 flex-wrap">
                                                 {/* 🟦 Account Details */} 
                                                 <div className="card-account flex-fill p-3">
                                                  <h5 className="card-title">Account Details
                                                  </h5> <div className="info-row"> <span>ID</span> 
                                                  <span>{account_details?.id}</span>
                                                   </div> <div className="info-row">
                                                     <span>Name</span>
                                                      <span>{account_details?.name}</span>
                                                       </div> 
                                                       <div className="info-row">
                                                         <span>Phone</span>
                                                          <span>{account_details?.phone}</span>
                                                           </div>
                                                            <div className="info-row">
                                                               <span>Email</span> 
                                          <span>{account_details?.email}</span> 
                                         </div>
                                        <div className="info-row"> 
                                           <span>Wallet</span> 
                                                                  
                                         <span>{account_details?.wallet_amount} $</span> 
                                         </div>
                                          <div className="info-row">
                                             <span>Completed Trips</span>
                                              <span>{basic_information?.completed_trips_count}</span> 
                                              </div> <div className="info-row"> 
                                                <span>Cancelled Trips</span> 
                                                <span>{basic_information?.cancelled_trips_count}</span> 
                                                </div>
                                                 </div> 
                                                 {/* 🟪 Account Info */} 
                                                 <div className="card-create flex-fill p-3">
                                                   <h5 className="card-title">Account Info</h5> 
                                                   <div className="info-row">
                                                     <span>Status</span>
                                                      <span style={{ color: "lightgreen" }}> {account_info?.status?.text} </span>
                                                       </div> 
                                                       <div className="info-row"> 
                                                        <span>Rating</span> 
                                                        <span style={{ color: "#facc15", fontSize: "18px" }}>
                                                           {renderStars(basic_information?.average_rating)} 
                                                           </span> </div> <div className="info-row">
                                                             <span>Registration</span>
                                                              <span>{account_info?.registration_method_text}</span>
                                                               </div> 
                                                               <div className="info-row">
                                                                 <span>Created At</span>
                                                                  <span>{account_info?.created_at}</span> 
                                                                  </div>
                                                                   <div className="info-row">
                                                                     <span>Complaints</span> 
                                                                     <span>{account_info?.number_of_complaints}</span>
                                                                      </div>
                                                                       </div> 
{/* 🟧 Bookings */} 
               {bookings?.length > 0 ? ( bookings.map((booking) => (
                 <div key={booking.booking_id} className="card-account flex-fill p-3">
                   <h5 className="card-title">Booking #{booking.booking_id}</h5> 
                   <div className="info-row">
                     <span>Trip ID</span>
                      <span>{booking.trip_id}</span>
                       </div>
                        <div className="info-row"> 
                          <span>Date</span>
                           <span>{new Date(booking.date).toLocaleString()}</span>
                            </div>
                             <div className="info-row"> 
                              <span>Type</span>
                               <span>{booking.type}</span>
                                </div>
                                 <div className="info-row"> 
                                  <span>Status</span> 
                                  <span>{booking.status?.name}</span>
                                   </div> 
          <div className="info-row">
             <span>Payment</span>
              <span>{booking.payment_method}</span>
               </div> <div className="info-row">
                 <span>From</span>
                  <span>{booking.route?.from}</span>
                   </div> <div className="info-row"> 
                    <span>To</span> 
                    <span>{booking.route?.to}</span> 
                    </div>
                     </div>
                      )) ) 
                      : ( <div className="card-account flex-fill p-3">
                         <h5 className="card-title">Bookings</h5> 
                         <p>No bookings available</p> 
                         </div> )}
                          </div>
                           </div>
                            );
                           }
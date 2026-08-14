// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Row, Col, Button, Image, Spinner } from "react-bootstrap";
// import {
//   beasURL,
//   GET_PASSENGER_DETAILS,
//   TOGGLE_PASSENGER_STATUS,
// } from "../../../../api/api";

// import personl from "../../../../assest/personal.png";
// import { Axios } from "../../../../api/axios";

// export default function DetailsPassenger() {
//   const { id } = useParams();

//   const [passenger, setPassenger] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [statusLoading, setStatusLoading] = useState(false);

//   function renderStars(rating = 0) {
//     const totalStars = 5;
//     const fullStars = Math.round(Number(rating));
//     const emptyStars = totalStars - fullStars;

//     return (
//       <>
//         {"★".repeat(fullStars)}
//         {"☆".repeat(emptyStars)}
//       </>
//     );
//   }

//   const fetchPassenger = async () => {
//     try {
//       setLoading(true);

//       const res = await Axios.get(
//         `${beasURL}/${GET_PASSENGER_DETAILS(id)}`
//       );

//       setPassenger(res.data?.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPassenger();
//   }, [id]);

//   const handleToggleStatus = async () => {
//     try {
//       setStatusLoading(true);

//       const res = await Axios.patch(
//         `${beasURL}/${TOGGLE_PASSENGER_STATUS(id)}`
//       );

//       const newStatus =
//         res.data?.data?.account_status ??
//         (passenger?.account_status === 1 ? 0 : 1);

//       setPassenger((prev) => ({
//         ...prev,
//         account_status: newStatus,
//       }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: "50vh" }}
//       >
//         <Spinner animation="border" variant="light" />
//       </div>
//     );
//   }

//   if (!passenger) {
//     return (
//       <h3 style={{ color: "white" }}>
//         Passenger not found
//       </h3>
//     );
//   }

//   return (
//     <div className="w-100 p-2">
//       {/* Back */}
//       <div className="d-flex align-items-center px-3">
//         <span
//           className="td-back"
//           onClick={() => window.history.back()}
//         >
//           ←
//         </span>

//         <h2 style={{ color: "white", padding: 5 }}>
//           Passenger Details :
//         </h2>
//       </div>

//       {/* Main Info */}
//       <div className="card-details d-flex px-3 position-relative">
//         <Row className=" w-100">
//           <Col xs={4} md={2}>
//             <Image
//               src={personl}
//               roundedCircle
//               style={{
//                 width: "120px",
//                 height: "120px",
//                 border: "4px solid #4f46e5",
//               }}
//             />
//           </Col>

//           <Col>
//             <h5 style={{ color: "white" }}>
//               Full Name : {passenger?.full_name}
//             </h5>

//             <div className="d-flex gap-2 mb-2">
//               <Button
//                 style={{
//                   background: "#4f46e5",
//                   borderRadius: "100px",
//                   border: "none",
//                   width: "150px",
//                 }}
//               >
//                 {passenger?.roles?.[0]?.name || "Passenger"}
//               </Button>

//               <Button
//                 style={{
//                   background:
//                     passenger?.account_status === 1
//                       ? "green"
//                       : "red",
//                   borderRadius: "100px",
//                   border: "none",
//                   width: "150px",
//                 }}
//               >
//                 {passenger?.account_status === 1
//                   ? "active"
//                   : "inactive"}
//               </Button>
//             </div>

//             <p style={{ color: "white" }}>
//               Phone : {passenger?.phone}
//             </p>

//             <p style={{ color: "white" }}>
//               Email : {passenger?.email}
//             </p>

//             <Button
//               onClick={handleToggleStatus}
//               disabled={statusLoading}
//               style={{
//                 position: "absolute",
//                 bottom: "20px",
//                 right: "20px",
//                 background:
//                   passenger?.account_status === 1
//                     ? "red"
//                     : "green",
//                 border: "none",
//                 width: "200px",
//               }}
//             >
//               {statusLoading
//                 ? "Loading..."
//                 : passenger?.account_status === 1
//                 ? "Deactivate Account"
//                 : "Activate Account"}
//             </Button>
//           </Col>
//         </Row>
//       </div>

//       {/* Info Cards */}
//       <div className="d-flex gap-3 p-2 flex-wrap">
//         {/* Account Details */}
//         <div className="card-account flex-fill p-3">
//           <h5 className="card-title">Account Details</h5>

//           <div className="info-row">
//             <span>User ID</span>
//             <span>{passenger?.user_id}</span>
//           </div>

//           <div className="info-row">
//             <span>Full Name</span>
//             <span>{passenger?.full_name}</span>
//           </div>

//           <div className="info-row">
//             <span>Phone</span>
//             <span>{passenger?.phone}</span>
//           </div>

//           <div className="info-row">
//             <span>Email</span>
//             <span>{passenger?.email}</span>
//           </div>

//           <div className="info-row">
//             <span>Wallet Balance</span>
//             <span>
//               {passenger?.wallet?.balance || "0.00"} $
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Role</span>
//             <span>
//               {passenger?.roles?.map((r) => r.name).join(", ")}
//             </span>
//           </div>
//         </div>

//         {/* Account Info */}
//         <div className="card-create flex-fill p-3">
//           <h5 className="card-title">Account Info</h5>

//           <div className="info-row">
//             <span>Status</span>

//             <span
//               style={{
//                 color:
//                   passenger?.account_status === 1
//                     ? "lightgreen"
//                     : "red",
//               }}
//             >
//               {passenger?.account_status === 1
//                 ? "Active"
//                 : "Inactive"}
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Rating</span>

//             <span
//               style={{
//                 color: "#facc15",
//                 fontSize: "18px",
//               }}
//             >
//               {renderStars(passenger?.rating)}
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Rating Value</span>
//             <span>{passenger?.rating}</span>
//           </div>

//           <div className="info-row">
//             <span>Registration Type</span>
//             <span>{passenger?.registration_type}</span>
//           </div>

//           <div className="info-row">
//             <span>Must Change Password</span>
//             <span>
//               {passenger?.must_change_password
//                 ? "Yes"
//                 : "No"}
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Created At</span>
//             <span>
//               {new Date(
//                 passenger?.created_at
//               ).toLocaleString()}
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Updated At</span>
//             <span>
//               {new Date(
//                 passenger?.updated_at
//               ).toLocaleString()}
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Rating Updated</span>
//             <span>
//               {passenger?.rating_last_updated || "-"}
//             </span>
//           </div>
//         </div>

//         {/* Wallet Details */}
//         <div className="card-account flex-fill p-3">
//           <h5 className="card-title">Wallet Details</h5>

//           <div className="info-row">
//             <span>Wallet ID</span>
//             <span>{passenger?.wallet?.wallet_id}</span>
//           </div>

//           <div className="info-row">
//             <span>Balance</span>
//             <span>{passenger?.wallet?.balance} $</span>
//           </div>

//           <div className="info-row">
//             <span>Created At</span>
//             <span>
//               {passenger?.wallet?.created_at
//                 ? new Date(
//                     passenger.wallet.created_at
//                   ).toLocaleString()
//                 : "-"}
//             </span>
//           </div>

//           <div className="info-row">
//             <span>Updated At</span>
//             <span>
//               {passenger?.wallet?.updated_at
//                 ? new Date(
//                     passenger.wallet.updated_at
//                   ).toLocaleString()
//                 : "-"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Image, Spinner } from "react-bootstrap";
import {
  beasURL,
  GET_PASSENGER_DETAILS,
  TOGGLE_PASSENGER_STATUS,
} from "../../../../api/api";

import personl from "../../../../assest/personal.png";
import { Axios } from "../../../../api/axios";
import { useTranslation } from "react-i18next";

export default function DetailsPassenger() {
  const { t ,i18n} = useTranslation();
  const { id } = useParams();

  const [passenger, setPassenger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  function renderStars(rating = 0) {
    const totalStars = 5;
    const fullStars = Math.round(Number(rating));
    const emptyStars = totalStars - fullStars;

    return (
      <>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </>
    );
  }

  const fetchPassenger = async () => {
    try {
      setLoading(true);

      const res = await Axios.get(
        `${beasURL}/${GET_PASSENGER_DETAILS(id)}`
      );

      setPassenger(res.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassenger();
  }, [id,i18n.language]);

  const handleToggleStatus = async () => {
    try {
      setStatusLoading(true);

      const res = await Axios.patch(
        `${beasURL}/${TOGGLE_PASSENGER_STATUS(id)}`
      );

      const newStatus =
        res.data?.data?.account_status ??
        (passenger?.account_status === 1 ? 0 : 1);

      setPassenger((prev) => ({
        ...prev,
        account_status: newStatus,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!passenger) {
    return (
      <h3 style={{ color: "white" }}>
        {t("detailsPassenger.passengerNotFound")}
      </h3>
    );
  }

  return (
    <div className="w-100 p-2">
      {/* Back */}
      <div className="d-flex align-items-center px-3">
        <span
          className="td-back"
          onClick={() => window.history.back()}
        >
          ←
        </span>

        <h2 style={{ color: "white", padding: 5 }}>
          {t("detailsPassenger.pageTitle")}
        </h2>
      </div>

      {/* Main Info */}
      <div className="card-details d-flex px-3 position-relative">
        <Row className=" w-100">
          <Col xs={4} md={2}>
            <Image
              src={personl}
              roundedCircle
              style={{
                width: "120px",
                height: "120px",
                border: "4px solid #4f46e5",
              }}
            />
          </Col>

          <Col>
            <h5 style={{ color: "white" }}>
              {t("detailsEmployee.fullName")} : {passenger?.full_name}
            </h5>

            <div className="d-flex gap-2 mb-2">
              <Button
                style={{
                  background: "#4f46e5",
                  borderRadius: "100px",
                  border: "none",
                  width: "150px",
                }}
              >
                {passenger?.roles?.[0]?.name_display || t("notifi.passenger")}
              </Button>

              <Button
                style={{
                  background:
                    passenger?.account_status === 1
                      ? "green"
                      : "red",
                  borderRadius: "100px",
                  border: "none",
                  width: "150px",
                }}
              >
                {passenger?.account_status === 1
                  ? t("detailsPassenger.activeLower")
                  : t("detailsPassenger.inactiveLower")}
              </Button>
            </div>

            <p style={{ color: "white" }}>
              {t("bookingDetails.phone")} : {passenger?.phone}
            </p>

            <p style={{ color: "white" }}>
              {t("walletDriver.email")} : {passenger?.email}
            </p>

            <Button
              onClick={handleToggleStatus}
              disabled={statusLoading}
              style={{
                position: "absolute",
                bottom: "20px",
                 insetInlineEnd: "20px",
                background:
                  passenger?.account_status === 1
                    ? "red"
                    : "green",
                border: "none",
                width: "200px",
              }}
            >
              {statusLoading
                ? t("common.loading")
                : passenger?.account_status === 1
                ? t("detailsDriver.deactivateAccount")
                : t("detailsDriver.activateAccount")}
            </Button>
          </Col>
        </Row>
      </div>

      {/* Info Cards */}
      <div className="d-flex gap-3 p-2 flex-wrap">
        {/* Account Details */}
        <div className="card-account flex-fill p-3">
          <h5 className="card-title">{t("detailsEmployee.accountDetails")}</h5>

          <div className="info-row">
            <span>{t("detailsPassenger.userId")}</span>
            <span>{passenger?.user_id}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsEmployee.fullName")}</span>
            <span>{passenger?.full_name}</span>
          </div>

          <div className="info-row">
            <span>{t("bookingDetails.phone")}</span>
            <span>{passenger?.phone}</span>
          </div>

          <div className="info-row">
            <span>{t("walletDriver.email")}</span>
            <span>{passenger?.email}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.walletBalance")}</span>
            <span>
              {passenger?.wallet?.balance || "0.00"} $
            </span>
          </div>

          <div className="info-row">
            <span>{t("detailsEmployee.role")}</span>
            <span>
              {passenger?.roles?.map((r) => r.name_display).join(", ")}
            </span>
          </div>
        </div>

        {/* Account Info */}
        <div className="card-create flex-fill p-3">
          <h5 className="card-title">{t("detailsPassenger.accountInfo")}</h5>

          <div className="info-row">
            <span>{t("booking.status")}</span>

            <span
              style={{
                color:
                  passenger?.account_status === 1
                    ? "lightgreen"
                    : "red",
              }}
            >
              {passenger?.account_status === 1
                ? t("vehicleCategories.active")
                : t("vehicleCategories.inactive")}
            </span>
          </div>

          <div className="info-row">
            <span>{t("ratings.rating")}</span>

            <span
              style={{
                color: "#facc15",
                fontSize: "18px",
              }}
            >
              {renderStars(passenger?.rating)}
            </span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.ratingValue")}</span>
            <span>{passenger?.rating}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.registrationType")}</span>
            <span>{passenger?.registration_type}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.mustChangePassword")}</span>
            <span>
              {passenger?.must_change_password
                ? t("detailsPassenger.yes")
                : t("detailsPassenger.no")}
            </span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.createdAt")}</span>
            <span>
              {new Date(
                passenger?.created_at
              ).toLocaleString()}
            </span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.updatedAt")}</span>
            <span>
              {new Date(
                passenger?.updated_at
              ).toLocaleString()}
            </span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.ratingUpdated")}</span>
            <span>
              {passenger?.rating_last_updated || "-"}
            </span>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="card-account flex-fill p-3">
          <h5 className="card-title">{t("detailsPassenger.walletDetails")}</h5>

          <div className="info-row">
            <span>{t("detailsPassenger.walletId")}</span>
            <span>{passenger?.wallet?.wallet_id}</span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.balance")}</span>
            <span>{passenger?.wallet?.balance} $</span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.createdAt")}</span>
            <span>
              {passenger?.wallet?.created_at
                ? new Date(
                    passenger.wallet.created_at
                  ).toLocaleString()
                : "-"}
            </span>
          </div>

          <div className="info-row">
            <span>{t("detailsPassenger.updatedAt")}</span>
            <span>
              {passenger?.wallet?.updated_at
                ? new Date(
                    passenger.wallet.updated_at
                  ).toLocaleString()
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
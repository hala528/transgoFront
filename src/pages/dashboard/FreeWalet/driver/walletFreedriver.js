
// import { useState, useEffect } from "react";
// import { Axios } from "../../../../api/axios";
// import {
//   beasURL,
//   IMAGE_BASE,
//   SERASH_DRIVER,
//   WALLET_TOP
// } from "../../../../api/api";

// import { Modal, Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function WalletDriver() {
//   const [search, setSearch] = useState("");
//   const [drivers, setDrivers] = useState([]);
//   const [driver, setDriver] = useState(null);
//   const [amount, setAmount] = useState("");
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const [success, setSuccess] = useState("");

//   // ✅ Modal state
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = (item) => {
//     setDriver(item);
//     setShow(true);
//   };

//   // 🔍 البحث
//   const handleSearch = async () => {
//     try {
//       setLoading(true);
//       setErr("");

//       const res = await Axios.get(
//         `${beasURL}/${SERASH_DRIVER}?search=${search}`
//       );

//       setDrivers(res.data.data.data);
//     } catch (err) {
//       setErr("Error fetching drivers");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//   if (success || err) {
//     const timer = setTimeout(() => {
//       setSuccess("");
//       setErr("");
//     }, 2000);

//     return () => clearTimeout(timer);
//   }
// }, [success, err]);

//   // 🔥 Live Search (Debounce)
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       if (search.trim() !== "") {
//         handleSearch();
//       } else {
//         setDrivers([]);
//       }
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [search]);

//   // 💰 الشحن
//   const handleCharge = async () => {
//     if (!driver) {
//       setErr("Please select a driver first");
//       return;
//     }

//     if (!amount || amount <= 0) {
//       setErr("Amount must be greater than 0");
//       return;
//     }

//     try {
//       setLoading(true);
//       setErr("");
//       setSuccess("");

//       await Axios.post(
//         `${beasURL}/${WALLET_TOP(driver.user_id)}`,
//         {
//           user_id: driver.user_id,
//           amount: Number(amount),
//           reason: reason || "Manual top-up"
//         }
//       );

//       // ✅ تحديث الرصيد مباشرة
//       setDrivers((prev) =>
//         prev.map((d) =>
//           d.user_id === driver.user_id
//             ? {
//                 ...d,
//                 wallet: {
//                   ...d.wallet,
//                   balance:
//                     Number(d.wallet.balance) + Number(amount)
//                 }
//               }
//             : d
//         )
//       );

//       setSuccess("Wallet charged successfully ");
//       setAmount("");
//       setReason("");
//       setShow(false);

//     } catch (err) {
//       setErr(err.response?.data?.message || "Charging failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-100 p-2 ">
//       <div className="d-flex align-items-center justify-content-between px-3">
//       <h2 style={{ color: "white" }}>Charging Driver Wallet:</h2>
//       <Link to="/dashboard/wallet/logsdriver">
//       <Button
//           style={{
//             background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
//             width: '150px',
//             border: 'none',
//           }}
//           size="sm"
//         >
//           view financail history
//         </Button>
//       </Link>
//       </div>
//       <div className="wallett-box">
       
      
//            <Form.Control
//   type="text"
//   placeholder="Search name or phone..."
//   name="search"
//   value={search}
//   onChange={(e) => setSearch(e.target.value)}
//   className="custom-input-driver"
         
//           style={{
//             width: '100%',
//             borderRadius: '10px',
//             color: 'white',
//             background: 'rgba(255, 255, 255, 0.08)',
//           }}
//         />
       

//         {loading && <p style={{ color: "white" }}>Loading...</p>}
//         {err && <p className="error">{err}</p>}
//         {success && <p className="success">{success}</p>}

//         {/* 👤 الكروت */}
//         {drivers.map((item) => (
//           <div key={item.user_id} className="driverr-card">
//             <img
//               src={`${IMAGE_BASE}/${item.driver_profile?.personal_photo}`}
//               alt="driver"
//             />

//             <div className="driver-info">
//               <h3 style={{color:'white'}}>Full Name: {item.full_name}</h3>
//               <div className="driverr-details">
//                 <span className="balance">
//                    {item.wallet?.balance} $
//                 </span>

//                 <span
//                   className={`status ${
//                     item.account_status
//                       ? "active-status"
//                       : "inactive-status"
//                   }`}
//                 >
//                   {item.account_status ? "Active" : "Inactive"}
//                 </span>
//               </div>
//               <p className="driver-email"> Email: {item.email}</p>
//               <p className="driver-phone"> Phone: {item.phone}</p>

              

//               <button
//                 className="charge-btn"
//                 onClick={() => handleShow(item)}
//               >
//                 Charge Wallet
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 💳 Modal */}
//       <Modal className="custom-modal" show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Charge Wallet</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter amount"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Reason</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter reason"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>

//           <Button variant="primary" onClick={handleCharge}>
//             {loading ? "Processing..." : "Confirm"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Axios } from "../../../../api/axios";
import {
  beasURL,
  IMAGE_BASE,
  SERASH_DRIVER,
  WALLET_TOP
} from "../../../../api/api";

import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function WalletDriver() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Modal state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setDriver(item);
    setShow(true);
  };

  // 🔍 البحث
  const handleSearch = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await Axios.get(
        `${beasURL}/${SERASH_DRIVER}?search=${search}`
      );

      setDrivers(res.data.data.data);
    } catch (err) {
      setErr(t("walletDriver.errorFetchingDrivers"));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (success || err) {
    const timer = setTimeout(() => {
      setSuccess("");
      setErr("");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [success, err]);

  // 🔥 Live Search (Debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim() !== "") {
        handleSearch();
      } else {
        setDrivers([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  // 💰 الشحن
  const handleCharge = async () => {
    if (!driver) {
      setErr(t("walletDriver.selectDriverFirst"));
      return;
    }

    if (!amount || amount <= 0) {
      setErr(t("walletDriver.amountGreaterThanZero"));
      return;
    }

    try {
      setLoading(true);
      setErr("");
      setSuccess("");

      await Axios.post(
        `${beasURL}/${WALLET_TOP(driver.user_id)}`,
        {
          user_id: driver.user_id,
          amount: Number(amount),
          reason: reason || "Manual top-up"
        }
      );

      // ✅ تحديث الرصيد مباشرة
      setDrivers((prev) =>
        prev.map((d) =>
          d.user_id === driver.user_id
            ? {
                ...d,
                wallet: {
                  ...d.wallet,
                  balance:
                    Number(d.wallet.balance) + Number(amount)
                }
              }
            : d
        )
      );

      setSuccess(t("walletDriver.chargeSuccess"));
      setAmount("");
      setReason("");
      setShow(false);

    } catch (err) {
      setErr(err.response?.data?.message || t("walletDriver.chargingFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-charge-page w-100 p-2">
      <div className="wallet-charge-header d-flex align-items-center justify-content-between px-3">
      <h2 style={{ color: "white" }}>{t("walletDriver.chargingDriverWallet")}</h2>
      <Link to="/dashboard/wallet/logsdriver">
      <Button
          style={{
            background: 'linear-gradient(90deg, var(--primary-blue), var(--primary-purple))',
            width: '150px',
            border: 'none',
          }}
          size="sm"
        >
          {t("walletDriver.viewFinancialHistory")}
        </Button>
      </Link>
      </div>
      <div className="wallet-search-panel wallett-box">
       
      
           <Form.Control
  type="text"
  placeholder={t("walletDriver.searchNameOrPhone")}
  name="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="custom-input-driver"
         
          style={{
            width: '100%',
            borderRadius: '10px',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />
       

        {loading && <p style={{ color: "white" }}>{t("common.loading")}</p>}
        {err && <p className="error">{err}</p>}
        {success && <p className="success">{success}</p>}

        {/* 👤 الكروت */}
        {drivers.map((item) => (
          <div key={item.user_id} className="wallet-user-card driverr-card">
            <div className="wallet-user-photo">
              <img src={`${IMAGE_BASE}/${item.driver_profile?.personal_photo}`} alt={item.full_name} />
            </div>

            <div className="wallet-user-info driver-info">
              <h3 style={{color:'white'}}>{t("walletDriver.fullName")}: {item.full_name}</h3>
              <div className="wallet-badges driverr-details">
                <span className="wallet-role-badge">
                  {t("booking.driver")}
                </span>
                <span className="balance">
                   {item.wallet?.balance} $
                </span>

                <span
                  className={`status ${
                    item.account_status
                      ? "active-status"
                      : "inactive-status"
                  }`}
                >
                  {item.account_status ? t("vehicleCategories.active") : t("vehicleCategories.inactive")}
                </span>
              </div>
              <p className="driver-phone"> {t("bookingDetails.phone")}: {item.phone}</p>
              <p className="driver-email"> {t("walletDriver.email")}: {item.email}</p>

              

              <button
                className="charge-btn"
                onClick={() => handleShow(item)}
              >
                {t("walletDriver.chargeWallet")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💳 Modal */}
      <Modal className="custom-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("walletDriver.chargeWallet")}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t("walletDriver.amount")}</Form.Label>
              <Form.Control
                type="number"
                placeholder={t("walletDriver.enterAmount")}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t("bookingDetails.reason")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("walletDriver.enterReason")}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("walletDriver.close")}
          </Button>

          <Button variant="primary" onClick={handleCharge}>
            {loading ? t("walletDriver.processing") : t("walletDriver.confirm")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// import { useEffect, useState } from "react";

// import {
//   COMMISSION_CURRENT,
//   COMMISSION_RATES,
// } from "../../../api/api";

// import CommissionModal from "./model";
// import { Axios } from "../../../api/axios";

// export default function ViewRating() {
//   const [currentRate, setCurrentRate] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [openModal, setOpenModal] = useState(false);

//   const getCurrentRate = async () => {
//     try {
//       const res = await Axios.get(COMMISSION_CURRENT);

//       setCurrentRate(res.data.data.current_rate);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getHistory = async () => {
//     try {
//       const res = await Axios.get(COMMISSION_RATES);

//       setHistory(res.data.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     getCurrentRate();
//     getHistory();
//   }, []);

//   return (
//     <div className="w-100 p-3">
//         <h2 style={{ color: "white" }}>Commission Rates:</h2>
//     <div className="commission-container">

//       <div className="commission-card">

//         <div className="commission-header">
//           <h2>Current Commission Rate</h2>

//           <button
//             className="edit-btn"
//             onClick={() => setOpenModal(true)}
//           >
//             Edit Commission
//           </button>
//         </div>

//         {currentRate && (
//           <>
//             <h1>{currentRate.percentage}%</h1>

//             <div className="commission-info">
//               <p>
//                 Previous:
//                 {currentRate.previous_percentage || "-"}%
//               </p>

//               <p>
//                 Updated By:
//                 {currentRate.changed_by?.full_name || "System"}
//               </p>

//               <p>
//                 Reason:
//                 {currentRate.change_reason}
//               </p>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="history-card">

//         <h3>Commission History</h3>

//         <table>
//           <thead>
//             <tr>
//               <th>Rate</th>
//               <th>Previous</th>
//               <th>Status</th>
//               <th>Changed By</th>
//               <th>Reason</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {history.map((item) => (
//               <tr key={item.commission_rate_id}>
//                 <td>{item.percentage}%</td>

//                 <td>
//                   {item.previous_percentage || "-"}%
//                 </td>

//                 <td>
//                   <span
//                     className={
//                       item.is_active
//                         ? "active-badge"
//                         : "inactive-badge"
//                     }
//                   >
//                     {item.is_active
//                       ? "Active"
//                       : "Inactive"}
//                   </span>
//                 </td>

//                 <td>
//                   {item.changed_by?.full_name ||
//                     "System"}
//                 </td>

//                 <td>{item.change_reason}</td>

//                 <td>
//                   {new Date(
//                     item.effective_from
//                   ).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <CommissionModal
//         open={openModal}
//         setOpen={setOpenModal}
//         reload={() => {
//           getCurrentRate();
//           getHistory();
//         }}
//       />
//     </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  COMMISSION_CURRENT,
  COMMISSION_RATES,
} from "../../../api/api";

import CommissionModal from "./model";
import { Axios } from "../../../api/axios";

export default function ViewRating() {
  const { t } = useTranslation();
  const [currentRate, setCurrentRate] = useState(null);
  const [history, setHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const getCurrentRate = async () => {
    try {
      const res = await Axios.get(COMMISSION_CURRENT);

      setCurrentRate(res.data.data.current_rate);
    } catch (err) {
      console.log(err);
    }
  };

  const getHistory = async () => {
    try {
      const res = await Axios.get(COMMISSION_RATES);

      setHistory(res.data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentRate();
    getHistory();
  }, []);

  return (
    <div className="w-100 p-3">
        <h2 style={{ color: "white" }}>{t("commission.pageTitle")}</h2>
    <div className="commission-container">

      <div className="commission-card">

        <div className="commission-header">
          <h2>{t("commission.currentRate")}</h2>

          <button
            className="edit-btn"
            onClick={() => setOpenModal(true)}
          >
            {t("commission.editCommission")}
          </button>
        </div>

        {currentRate && (
          <>
            <h1>{currentRate.percentage}%</h1>

            <div className="commission-info">
              <p>
                {t("commission.previous")}:
                {currentRate.previous_percentage || "-"}%
              </p>

              <p>
                {t("commission.updatedBy")}:
                {currentRate.changed_by?.full_name || t("walletDriver.system")}
              </p>

              <p>
                {t("bookingDetails.reason")}:
                {currentRate.change_reason}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="history-card">

        <h3>{t("commission.history")}</h3>

        <table>
          <thead>
            <tr>
              <th>{t("commission.rate")}</th>
              <th>{t("commission.previous")}</th>
              <th>{t("booking.status")}</th>
              <th>{t("commission.changedBy")}</th>
              <th>{t("bookingDetails.reason")}</th>
              <th>{t("revenueReport.date")}</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.commission_rate_id}>
                <td>{item.percentage}%</td>

                <td>
                  {item.previous_percentage || "-"}%
                </td>

                <td>
                  <span
                    className={
                      item.is_active
                        ? "active-badge"
                        : "inactive-badge"
                    }
                  >
                    {item.is_active
                      ? t("vehicleCategories.active")
                      : t("vehicleCategories.inactive")}
                  </span>
                </td>

                <td>
                  {item.changed_by?.full_name ||
                    t("walletDriver.system")}
                </td>

                <td>{item.change_reason}</td>

                <td>
                  {new Date(
                    item.effective_from
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CommissionModal
        open={openModal}
        setOpen={setOpenModal}
        reload={() => {
          getCurrentRate();
          getHistory();
        }}
      />
    </div>
    </div>
  );
}
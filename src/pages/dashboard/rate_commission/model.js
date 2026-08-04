// import { useState } from "react";
// import { Axios } from "../../../api/axios";
// import { CREATE_COMMISSION } from "../../../api/api";

// export default function CommissionModal({
//   open,
//   setOpen,
//   reload,
// }) {
//   const [percentage, setPercentage] = useState("");
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!open) return null;

//   const submit = async () => {
//     try {
//       setLoading(true);

//       await Axios.post(CREATE_COMMISSION, {
//         percentage: Number(percentage),
//         change_reason: reason,
//       });

//       reload();
//       setOpen(false);

//       setPercentage("");
//       setReason("");
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-overlay">

//       <div className="modal-content">

//         <h2>Update Commission Rate</h2>

//         <input
//           type="number"
//           step="0.01"
//           placeholder="Commission %"
//           value={percentage}
//           onChange={(e) =>
//             setPercentage(e.target.value)
//           }
//         />

//         <textarea
//           placeholder="Reason"
//           value={reason}
//           onChange={(e) =>
//             setReason(e.target.value)
//           }
//         />

//         <div className="modal-actions">
//           <button
//             onClick={() => setOpen(false)}
//           >
//             Cancel
//           </button>

//           <button
//             onClick={submit}
//             disabled={loading}
//           >
//             {loading
//               ? "Saving..."
//               : "Save Changes"}
//           </button>
//         </div>
//       </div>

//     </div>
//   );
// }
import { useState } from "react";
import { Axios } from "../../../api/axios";
import { CREATE_COMMISSION } from "../../../api/api";
import { useTranslation } from "react-i18next";

export default function CommissionModal({
  open,
  setOpen,
  reload,
}) {
  const { t } = useTranslation();
  const [percentage, setPercentage] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const submit = async () => {
    try {
      setLoading(true);

      await Axios.post(CREATE_COMMISSION, {
        percentage: Number(percentage),
        change_reason: reason,
      });

      reload();
      setOpen(false);

      setPercentage("");
      setReason("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal-content">

        <h2>{t("commission.updateRate")}</h2>

        <input
          type="number"
          step="0.01"
          placeholder={t("commission.percentagePlaceholder")}
          value={percentage}
          onChange={(e) =>
            setPercentage(e.target.value)
          }
        />

        <textarea
          placeholder={t("bookingDetails.reason")}
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
        />

        <div className="modal-actions">
          <button
            onClick={() => setOpen(false)}
          >
            {t("vehicleCategories.cancel")}
          </button>

          <button
            onClick={submit}
            disabled={loading}
          >
            {loading
              ? t("commission.saving")
              : t("commission.saveChanges")}
          </button>
        </div>
      </div>

    </div>
  );
}
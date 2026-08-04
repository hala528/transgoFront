
// import "./notifi.css";
// import { useState, useEffect } from "react";
// import { Axios } from "../../../api/axios";
// import { SEND_NOTIFICATION, GET_GOVERNORATES ,GET_PASSENGER} from "../../../api/api";
// export default function Notifi() {
//   const [type, setType] = useState("general");
// const [success, setSuccess] = useState("");
// const [err, setErr] = useState("");
// const [passengers, setPassengers] = useState([]);
// const [title, setTitle] = useState("");
// const [body, setBody] = useState("");
// const [role, setRole] = useState("passenger");
// const [governorateId, setGovernorateId] = useState("");
// const [userId, setUserId] = useState("");

// const [governorates, setGovernorates] = useState([]);
// useEffect(() => {
//   Axios.get(GET_GOVERNORATES)
//     .then((res) => {
//       const data =
//   res.data?.data?.items ||
//   res.data?.data ||
//   res.data ||
//   [];

// setGovernorates(Array.isArray(data) ? data : []);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);
// const handleSend = async () => {
//   try {
//     let payload = {
//       title,
//       body,
//     };

//     if (type === "general") {
//       payload.target_role = role;
//     }

//     if (type === "governorate") {
//       payload.target_role = role;
//       payload.target_governorate_id = governorateId;
//     }

//     if (type === "private") {
//       payload.target_user_id = userId;
//     }

//     console.log("📤 Sending Notification Payload:", payload);

//     const res = await Axios.post(SEND_NOTIFICATION, payload);

//     console.log("✅ Notification Response:", res.data);

//     setSuccess(res.data?.message || "Notification sent successfully");
//     setErr("");

//     setTimeout(() => {
//       setSuccess("");
//     }, 3000);

//   } catch (err) {
//     console.log("❌ Notification Error:", err);

//     setErr(
//       err.response?.data?.message ||
//       "Failed to send notification"
//     );

//     setSuccess("");

//     setTimeout(() => {
//       setErr("");
//     }, 3000);
//   }
// };
// useEffect(() => {
//   Axios.get(GET_PASSENGER)
//     .then((res) => {
//       console.log(res.data);

//       setPassengers(res.data?.data?.data || []);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);
//   return (
//     <div className="notifications-page">
//       {success && <span className="success">{success}</span>}

// {err && <span className="error">{err}</span>}
//       <div className="page-header">
//         <h2>Management Notifications :</h2>

//         <button className="send-btn">
//           + Send Notification
//         </button>
//       </div>

//       <div className="notification-card">
//         <div className="type-selector">
//           <button
//             className={type === "general" ? "active" : ""}
//             onClick={() => setType("general")}
//           >
//             General
//           </button>

//           <button
//             className={type === "governorate" ? "active" : ""}
//             onClick={() => setType("governorate")}
//           >
//             Governorate
//           </button>

//           <button
//             className={type === "private" ? "active" : ""}
//             onClick={() => setType("private")}
//           >
//             Private User
//           </button>
//         </div>

//         <div className="form-group">
//           <label>Title</label>
//          <input
//   value={title}
//   onChange={(e) => setTitle(e.target.value)}
// />
//         </div>

//         <div className="form-group">
//           <label>Message</label>
//         <textarea
//   value={body}
//   onChange={(e) => setBody(e.target.value)}
// />
//         </div>

//         {(type === "general" || type === "governorate") && (
//           <div className="form-group">
//             <label>Target Role</label>

//            <select value={role} onChange={(e) => setRole(e.target.value)}>
//   <option value="passenger">Passenger</option>
//   <option value="driver">Driver</option>
// </select>
//           </div>
//         )}

//         {type === "governorate" && (
//           <div className="form-group">
//             <label>Governorate</label>

//          <select
//   value={governorateId}
//   onChange={(e) => setGovernorateId(e.target.value)}
// >
//   {governorates.map((g) => (
//     <option key={g.id} value={g.id}>
//       {g.name}
//     </option>
//   ))}
// </select>
//           </div>
//         )}

//         {type === "private" && (
//           <div className="form-group">
//             <label>User ID</label>

//     <select
//   value={userId}
//   onChange={(e) => setUserId(e.target.value)}
// >
//   <option value="">Select Passenger</option>

//   {passengers.map((user) => (
//     <option key={user.user_id} value={user.user_id}>
//       {user.full_name} - {user.phone}
//     </option>
//   ))}
// </select>
//           </div>
//         )}
// <button className="submit-btn" onClick={handleSend}>
//   Send Notification
// </button>
//       </div>
//     </div>
//   );
// }
import "./notifi.css";
import { useState, useEffect } from "react";
import { Axios } from "../../../api/axios";
import { SEND_NOTIFICATION, GET_GOVERNORATES ,GET_PASSENGER} from "../../../api/api";
import { useTranslation } from "react-i18next";

export default function Notifi() {
  const { t } = useTranslation();
  const [type, setType] = useState("general");
const [success, setSuccess] = useState("");
const [err, setErr] = useState("");
const [passengers, setPassengers] = useState([]);
const [title, setTitle] = useState("");
const [body, setBody] = useState("");
const [role, setRole] = useState("passenger");
const [governorateId, setGovernorateId] = useState("");
const [userId, setUserId] = useState("");

const [governorates, setGovernorates] = useState([]);
useEffect(() => {
  Axios.get(GET_GOVERNORATES)
    .then((res) => {
      const data =
  res.data?.data?.items ||
  res.data?.data ||
  res.data ||
  [];

setGovernorates(Array.isArray(data) ? data : []);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
const handleSend = async () => {
  try {
    let payload = {
      title,
      body,
    };

    if (type === "general") {
      payload.target_role = role;
    }

    if (type === "governorate") {
      payload.target_role = role;
      payload.target_governorate_id = governorateId;
    }

    if (type === "private") {
      payload.target_user_id = userId;
    }

    console.log("📤 Sending Notification Payload:", payload);

    const res = await Axios.post(SEND_NOTIFICATION, payload);

    console.log("✅ Notification Response:", res.data);

    setSuccess(res.data?.message || t("notifi.sentSuccess"));
    setErr("");

    setTimeout(() => {
      setSuccess("");
    }, 3000);

  } catch (err) {
    console.log("❌ Notification Error:", err);

    setErr(
      err.response?.data?.message ||
      t("notifi.sentFail")
    );

    setSuccess("");

    setTimeout(() => {
      setErr("");
    }, 3000);
  }
};
useEffect(() => {
  Axios.get(GET_PASSENGER)
    .then((res) => {
      console.log(res.data);

      setPassengers(res.data?.data?.data || []);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
  return (
    <div className="notifications-page">
      {success && <span className="success">{success}</span>}

{err && <span className="error">{err}</span>}
      <div className="page-header">
        <h2>{t("notifi.pageTitle")}</h2>

        <button className="send-btn">
          + {t("notifi.sendButton")}
        </button>
      </div>

      <div className="notification-card">
        <div className="type-selector">
          <button
            className={type === "general" ? "active" : ""}
            onClick={() => setType("general")}
          >
            {t("notifi.general")}
          </button>

          <button
            className={type === "governorate" ? "active" : ""}
            onClick={() => setType("governorate")}
          >
            {t("notifi.governorate")}
          </button>

          <button
            className={type === "private" ? "active" : ""}
            onClick={() => setType("private")}
          >
            {t("notifi.privateUser")}
          </button>
        </div>

        <div className="form-group">
          <label>{t("notifi.title")}</label>
         <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
        </div>

        <div className="form-group">
          <label>{t("notifi.message")}</label>
        <textarea
  value={body}
  onChange={(e) => setBody(e.target.value)}
/>
        </div>

        {(type === "general" || type === "governorate") && (
          <div className="form-group">
            <label>{t("notifi.targetRole")}</label>

           <select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="passenger">{t("notifi.passenger")}</option>
  <option value="driver">{t("notifi.driver")}</option>
</select>
          </div>
        )}

        {type === "governorate" && (
          <div className="form-group">
            <label>{t("notifi.governorateLabel")}</label>

         <select
  value={governorateId}
  onChange={(e) => setGovernorateId(e.target.value)}
>
  {governorates.map((g) => (
    <option key={g.id} value={g.id}>
      {g.name}
    </option>
  ))}
</select>
          </div>
        )}

        {type === "private" && (
          <div className="form-group">
            <label>{t("notifi.userId")}</label>

    <select
  value={userId}
  onChange={(e) => setUserId(e.target.value)}
>
  <option value="">{t("notifi.selectPassenger")}</option>

  {passengers.map((user) => (
    <option key={user.user_id} value={user.user_id}>
      {user.full_name} - {user.phone}
    </option>
  ))}
</select>
          </div>
        )}
<button className="submit-btn" onClick={handleSend}>
  {t("notifi.sendButton")}
</button>
      </div>
    </div>
  );
}
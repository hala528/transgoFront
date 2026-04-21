import { useState , useEffect } from "react";
import { Axios } from "../../../api/axios";
import { beasURL , AUDIT_LOGS } from "../../../api/api";
import personl from "../../../assest/personal.png";
import {  Form } from 'react-bootstrap';
export default function AuditLog() {
    const [logs, setLogs] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [dateFrom, setDateFrom] = useState("");
const [dateTo, setDateTo] = useState("");
useEffect(() => {
  const fetchLogs = async () => {
    try {
      const res = await Axios.get(`${beasURL}/${AUDIT_LOGS}`, {
        params: {
          actor_name: search || undefined,
          date_from: dateFrom || undefined,
          date_to: dateTo || undefined,
        },
      });

      setLogs(res.data.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  fetchLogs();
}, [search, dateFrom, dateTo]);
if (loading) {
  return <h3 style={{ color: "white" }}>Loading...</h3>;
}
const logsShow = logs.map((log) => {
  const before = log.changes?.before;
  const after = log.changes?.after;

  return (
    <div className="log-card" key={log.id}>
      
      {/* LEFT */}
      <div className="log-left">

        <div
          className="log-icon"
          style={{
            background:
              log.action.includes("created")
                ? "#22c55e"
                : "#f59e0b"
          }}
        >
          <i
            className={`fa-solid ${
              log.action.includes("created")
                ? "fa-user-plus"
                : "fa-file-pen"
            }`}
          ></i>
        </div>

        <div className="log-content">
          <h5>{log.action_label}</h5>

          <p>{log.description}</p>

          {/* 🔥 عرض التغييرات */}
          {before && after && (
            <div className="changes-box">

              {before.full_name && (
                <p>
                  <strong>Name:</strong>{" "}
                  {before.full_name} → {after.full_name}
                </p>
              )}

              {before.phone && (
                <p>
                  <strong>Phone:</strong>{" "}
                  {before.phone} → {after.phone}
                </p>
              )}

              {before.role && (
                <p>
                  <strong>Role:</strong>{" "}
                  {before.role?.[0]} → {after.role?.[0]}
                </p>
              )}
            </div>
          )}

          {/* في حالة create */}
          {!before && after && (
            <div className="changes-box">
              <p><strong>Name:</strong> {after.full_name}</p>
              <p><strong>Email:</strong> {after.email}</p>
            </div>
          )}

        </div>
      </div>

      {/* RIGHT */}
      <div className="log-right">
        <div className="user-box">
          <img src={personl} alt=""  />
          <div>
            <div>{log.actor.full_name}</div>
            <span className="badge-admin">
              {log.actor.primary_role}
            </span>
          </div>
        </div>

        <p style={{ fontSize: "12px", marginTop: 5 }}>
          <i className="fa-regular fa-clock"></i>{" "}
          {log.created_at.display}
        </p>
      </div>
    </div>
  );
});
  return (
    <div className="w-100 p-3">
      <h2 style={{ color: "white" }}>Audit Logs :</h2>
       <div className="card-driver d-flex justify-content-between align-items-center px-3">
        
        <div className="d-flex align-items-center gap-4">
            
        <Form.Control
  type="text"
  placeholder="Search Drivers..."
  name="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="custom-input-driver"
         
          style={{
            width: '250px',
            borderRadius: '10px',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />
        <Form.Control
   type="date"
  value={dateFrom}
  onChange={(e) => setDateFrom(e.target.value)}
  className="custom-input-driver"
  style={{
            width: '250px',
            borderRadius: '10px',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
/>

<Form.Control
  type="date"
  value={dateTo}
  onChange={(e) => setDateTo(e.target.value)}
  className="custom-input-driver"
   style={{
            width: '250px',
            borderRadius: '10px',
            color: 'white',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
/>
        </div>
       
      </div>

      <div className="card-logs">
        {logsShow}
      </div>
    </div>
  );
}
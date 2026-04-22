import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../api/axios";
import { beasURL , GET_WALLET} from "../../../api/api";

export default function FinancailLogs() {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ✅ fetch logs
  const fetchLogs = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await Axios.get(`${beasURL}${GET_WALLET}`, {
        params: {
          search: search || undefined,
          date_from: dateFrom || undefined,
          date_to: dateTo || undefined,
        },
      });

      setLogs(res.data.data.data);
    } catch (error) {
      console.log(error);
      setErr("Failed to fetch logs");
    } finally {
      setLoading(false);
    }
  };

  // ✅ debounce search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLogs();
    }, 500);

    return () => clearTimeout(delay);
  }, [search, dateFrom, dateTo]);

  return (
    <div className="w-100 p-2 ">
    
      <div className="d-flex align-items-center px-3">
        <span className="td-back" onClick={() => window.history.back()}>
          ←
        </span>
        <h2 style={{ color: "white" }}>Financial Logs:</h2>
      </div>

        <div className="card-driver d-flex justify-content-between align-items-center px-3">
      <div className="d-flex align-items-center gap-4 px-3 mt-3">
        {/* Search */}
        <Form.Control
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="custom-input-driver"
          style={{
            width: "250px",
            borderRadius: "10px",
            color: "white",
            background: "rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* Date From */}
        <Form.Control
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="custom-input-driver"
          style={{
            width: "200px",
            borderRadius: "10px",
            color: "white",
            background: "rgba(255, 255, 255, 0.08)",
          }}
        />

        {/* Date To */}
        <Form.Control
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="custom-input-driver"
          style={{
            width: "200px",
            borderRadius: "10px",
            color: "white",
            background: "rgba(255, 255, 255, 0.08)",
          }}
        />
      </div>
  </div>
      {/* 📦 Logs */}
      <div className="card-logg mt-4 px-3">
        {loading && <p>Loading...</p>}
        {err && <p className="error">{err}</p>}

        {!loading && logs.length === 0 && (
          <p style={{ color: "white" }}>No results found</p>
        )}

        {logs.map((item) => (
          <div key={item.transaction_id} className="log-item">
            <div className="log-header">
              <h4>{item.wallet.user.full_name}</h4>
              <span className="amount">+{item.amount} $</span>
            </div>

            <div className="log-body">
              <p>Reference: {item.transaction_reference}</p>
              <p>Status: {item.status}</p>
              <p>Before: {item.balance_before} $</p>
              <p>After: {item.balance_after} $</p>
              <p>By: {item.performer.full_name}</p>
              <p>
                Date:{" "}
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
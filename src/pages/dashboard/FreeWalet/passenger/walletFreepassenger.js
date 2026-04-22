import { useState, useEffect } from "react";
import { Axios } from "../../../../api/axios";
import {
  beasURL,
 
  SERASH_PASSENGER,
  WALLET_TOP_PASSENGER
} from "../../../../api/api";

import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WalletPassenger() {
  const [search, setSearch] = useState("");
  const [passengers, setPassengers] = useState([]);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (item) => {
    setSelectedPassenger(item);
    setShow(true);
  };

  // 🔍 البحث
  const handleSearch = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await Axios.get(
        `${beasURL}/${SERASH_PASSENGER}?search=${search}`
      );

      setPassengers(res.data.data.data);
    } catch (err) {
      setErr("Error fetching passengers");
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ إخفاء الرسائل بعد 5 ثواني
  useEffect(() => {
    if (success || err) {
      const timer = setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [success, err]);

  // 🔥 Debounce Search
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim() !== "") {
        handleSearch();
      } else {
        setPassengers([]);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  // 💰 شحن المحفظة
  const handleCharge = async () => {
    if (!selectedPassenger) {
      setErr("Please select a passenger first");
      return;
    }

    if (!amount || amount <= 0) {
      setErr("Amount must be greater than 0");
      return;
    }

    try {
      setLoading(true);
      setErr("");
      setSuccess("");

      await Axios.post(
        `${beasURL}/${WALLET_TOP_PASSENGER(selectedPassenger.user_id)}`,
        {
          user_id: selectedPassenger.user_id,
          amount: Number(amount),
          reason: reason || "Manual top-up"
        }
      );

      // ✅ تحديث الرصيد مباشرة
      setPassengers((prev) =>
        prev.map((p) =>
          p.user_id === selectedPassenger.user_id
            ? {
                ...p,
                wallet: {
                  ...p.wallet,
                  balance:
                    Number(p.wallet.balance) + Number(amount)
                }
              }
            : p
        )
      );

      setSuccess("Wallet charged successfully ✅");
      setAmount("");
      setReason("");
      setShow(false);

    } catch (err) {
      setErr(err.response?.data?.message || "Charging failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 p-2">
      <div className="d-flex align-items-center justify-content-between px-3">
        <h2 style={{ color: "white" }}>Charging Passenger Wallet</h2>

        <Link to="/dashboard/wallet/logspassenger">
          <Button
            style={{
              background:
                "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))",
              width: "180px",
              border: "none"
            }}
            size="sm"
          >
            View Financial History
          </Button>
        </Link>
      </div>

      <div className="wallet-box">
        {/* 🔍 Search */}
        <Form.Control
          type="text"
          placeholder="Search name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="custom-input-driver"
          style={{
            width: "100%",
            borderRadius: "10px",
            color: "white",
            background: "rgba(255, 255, 255, 0.08)"
          }}
        />

        {loading && <p style={{ color: "white" }}>Loading...</p>}
        {err && <p className="error">{err}</p>}
        {success && <p className="success">{success}</p>}

        {/* 👤 Cards */}
        {passengers.map((item) => (
          <div key={item.user_id} className="driver-card">
           

            <div className="driver-info">
              <h3 style={{ color: "white" }}>
                {item.full_name}
              </h3>

              <div className="driver-details">
                <span className="balance">
                  💰 {item.wallet?.balance || 0} $
                </span>

                <span
                  className={`status ${
                    item.account_status
                      ? "active-status"
                      : "inactive-status"
                  }`}
                >
                  {item.account_status ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="driver-email">
                Email: {item.email}
              </p>
              <p className="driver-phone">
                Phone: {item.phone}
              </p>

              <button
                className="charge-btn"
                onClick={() => handleShow(item)}
              >
                Charge Wallet
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💳 Modal */}
      <Modal className="custom-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Charge Wallet</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleCharge}>
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
import {
  faSearch,
  faMoneyBill,
  faCheck,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Axios } from "../../../api/axios";
import { beasURL, IMAGE_BASE, SERASH_DRIVER, WALLET_TOP } from "../../../api/api";
import { Link } from "react-router-dom";

export default function Wallet() {
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [driver, setDriver] = useState(null);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, errset] = useState("");
  const [success, setSuccess] = useState("");


  const handleSearch = async () => {
    try {
      setLoading(true);
      errset("");
      setSuccess("");

      const res = await Axios.get(
        `${beasURL}/${SERASH_DRIVER}?search=${search}`
      );

      setDrivers(res.data.data.data); 

    } catch (err) {
      errset("Error fetching drivers");
    } finally {
      setLoading(false);
    }
  };


const handleCharge = async () => {
  if (!driver) {
    errset("Please select a driver first");
    return;
  }

  if (!amount || amount <= 0) {
    errset("Amount must be greater than 0");
    return;
  }

  try {
    setLoading(true);
    errset("");
    setSuccess("");

    const res = await Axios.post(
      `${beasURL}/${WALLET_TOP(driver.user_id)}`,
      {
        user_id: driver.user_id,
        amount: Number(amount),
        reason: reason || "Manual top-up", 
      }
    );

    setDriver(res.data.data.driver);

   
    setSuccess(res.data.message);

   
    setAmount("");
    setReason("");

  } catch (err) {
   
    errset(
      err.response?.data?.message || "Charging failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-100 p-2">
      <h2 style={{ color: "white" }}>
        Charging Driver Wallet
      </h2>

    
      <div className="cards">
        <div className="card-wallet">
          <div className="icon-circle purple">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <h5 style={{color:'#cbd5f5'}}>Choose Driver</h5>
        </div>

        <div className="card-wallet">
          <div className="icon-circle green">
            <FontAwesomeIcon icon={faMoneyBill} />
          </div>
          <h5 style={{color:'#cbd5f5'}}>Enter Amount</h5>
        </div>

        <div className="card-wallet">
          <div className="icon-circle blue">
            <FontAwesomeIcon icon={faCheck} />
          </div>
          <h5 style={{color:'#cbd5f5'}}>Confirm</h5>
        </div>

        <div className="card-wallet">
          <div className="icon-circle orange">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <h5 style={{color:'#cbd5f5'}}>Notify</h5>
        </div>
        <Link to={`to={'wallet.id'}`}>
         <div className="card-click">
         
           
         
          <h5 style={{color:'#cbd5f5'}}>click to see the financail history</h5>
        </div>
        </Link>
      </div>

      {/* الصندوق */}
      <div className="wallet-box">

        {/* البحث */}
        <div className="search-box">
          <button onClick={handleSearch}>Search</button>
          <input
            placeholder="Search driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading */}
        {loading && <p style={{ color: "white" }}>Loading...</p>}

     
    

        {/* قائمة السائقين */}
        {drivers.map((item) => (
          <div
            key={item.user_id}
            className={`driver-card ${
              driver?.user_id === item.user_id ? "active" : ""
            }`}
            onClick={() => setDriver(item)}
          >
            <img
              src={`${IMAGE_BASE}/${item.driver_profile?.personal_photo}`}
              alt="driver"
            />

            <div className="driver-info">
              <h3 style={{color:'#cbd5f5'}}>{item.full_name}</h3>

              <div className="driver-details">
                <span className="balance">
                  {item.wallet?.balance} $
                </span>

                <span className="status">
                  {item.account_status ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* إدخال المبلغ */}
        <div className="amount-box">
          <input
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>$</span>
        </div>
       <div className="amount-box">
  <input
    placeholder="Enter reason (optional)"
    
    value={reason}
    onChange={(e) => setReason(e.target.value)}
  />
</div>

        {/* زر التنفيذ */}
        <button
          className="submit-btn"
          onClick={handleCharge}
          disabled={!driver || loading}
        >
          {loading ? "Processing..." : "Execute Charging "}
        </button>
     {err && <p className="error">{err}</p>}
{success && <p className="success">{success}</p>}
      </div>
    </div>
  );
}
import "./Revenue.css";

import { useState } from "react";
import DriverEarnings from "./DriverEarnings";
import RevenueReportMock from "./RevenueReportMock";

function RevenueR() {

  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="reports-page">

      <div className="topbar">

        <h1>Reports & Analytics</h1>

      </div>

      {/* TABS */}

      <div className="tabs">

        <button
          className={`tab ${activeTab === "DriverEarnings" ? "active" : ""}`}
          onClick={() => setActiveTab("DriverEarnings")}
        >
         DriverEarnings
        </button>
         <button
          className={`tab ${activeTab === "RevenueReportMock" ? "active" : ""}`}
          onClick={() => setActiveTab("RevenueReportMock")}
        >
         RevenueReport
        </button>
      
      </div>

      {/* CONTENT */}

     
{activeTab === "DriverEarnings" && <DriverEarnings />}
{activeTab === "RevenueReportMock" && <RevenueReportMock />}
    </div>
  );
}

export default RevenueR;
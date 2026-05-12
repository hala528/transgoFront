import "./Reports.css";
import ActivityReport from "./ActivityReport";
import DriversPerformance from "./DriversPerformance";
import AppUsageReport from "./AppUsageReport";
import ComplaintsReport from "./complaintsr";
import { useState } from "react";

function ReportsSection() {

  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="reports-page">

      <div className="topbar">

        <h1>Reports & Analytics</h1>

      </div>

      {/* TABS */}

      <div className="tabs">

        <button
          className={`tab ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activity by Governorate
        </button>

        <button
          className={`tab ${activeTab === "drivers" ? "active" : ""}`}
          onClick={() => setActiveTab("drivers")}
        >
          Drivers Performance
        </button>
 <button
  className={`tab ${activeTab === "appusage" ? "active" : ""}`}
  onClick={() => setActiveTab("appusage")}
>
  App Usage
</button>
<button
  className={`tab ${activeTab === "complaints" ? "active" : ""}`}
  onClick={() => setActiveTab("complaints")}
>
  complaints
</button>
      </div>

      {/* CONTENT */}

      {activeTab === "activity" && <ActivityReport />}

      {activeTab === "drivers" && <DriversPerformance />}
{activeTab === "appusage" && <AppUsageReport />}
{activeTab === "complaints" && <ComplaintsReport />}
    </div>
  );
}

export default ReportsSection;
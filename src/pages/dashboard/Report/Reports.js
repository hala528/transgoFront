// import "./Reports.css";
// import ActivityReport from "./ActivityReport";
// import DriversPerformance from "./DriversPerformance";
// import AppUsageReport from "./AppUsageReport";
// import ComplaintsReport from "./complaintsr";
// import { useState } from "react";
// // import DriverEarnings from "./DriverEarnings";
// // import RevenueReport from "./RevenueReport";

// function ReportsSection() {

//   const [activeTab, setActiveTab] = useState("activity");

//   return (
//     <div className="reports-page">

//       <div className="topbar">

//         <h1>Reports & Analytics</h1>

//       </div>

//       {/* TABS */}

//       <div className="tabs">

       
//         <button
//           className={`tab ${activeTab === "activity" ? "active" : ""}`}
//           onClick={() => setActiveTab("activity")}
//         >
//           Activity by Governorate
//         </button>

//         <button
//           className={`tab ${activeTab === "drivers" ? "active" : ""}`}
//           onClick={() => setActiveTab("drivers")}
//         >
//           Drivers Performance
//         </button>
//  <button
//   className={`tab ${activeTab === "appusage" ? "active" : ""}`}
//   onClick={() => setActiveTab("appusage")}
// >
//   App Usage
// </button>
// <button
//   className={`tab ${activeTab === "complaints" ? "active" : ""}`}
//   onClick={() => setActiveTab("complaints")}
// >
//   complaints
// </button>
//       </div>

//       {/* CONTENT */}

//       {activeTab === "activity" && <ActivityReport />}

//       {activeTab === "drivers" && <DriversPerformance />}
// {activeTab === "appusage" && <AppUsageReport />}
// {activeTab === "complaints" && <ComplaintsReport />}

//     </div>
//   );
// }

// export default ReportsSection;
import "./Reports.css";
import ActivityReport from "./ActivityReport";
import DriversPerformance from "./DriversPerformance";
import AppUsageReport from "./AppUsageReport";
import ComplaintsReport from "./complaintsr";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import DriverEarnings from "./DriverEarnings";
// import RevenueReport from "./RevenueReport";

function ReportsSection() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="reports-page">

      <div className="topbar">

        <h1>{t("revenue.pageTitle")}</h1>

      </div>

      {/* TABS */}

      <div className="tabs">

       
        <button
          className={`tab ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          {t("reportsSection.activityTab")}
        </button>

        <button
          className={`tab ${activeTab === "drivers" ? "active" : ""}`}
          onClick={() => setActiveTab("drivers")}
        >
          {t("reportsSection.driversTab")}
        </button>
 <button
  className={`tab ${activeTab === "appusage" ? "active" : ""}`}
  onClick={() => setActiveTab("appusage")}
>
  {t("reportsSection.appUsageTab")}
</button>
<button
  className={`tab ${activeTab === "complaints" ? "active" : ""}`}
  onClick={() => setActiveTab("complaints")}
>
  {t("reportsSection.complaintsTab")}
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
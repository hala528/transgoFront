// // AppUsageReport.jsx

// import { useEffect, useState } from "react";

// import {
//   Users,
//   UserPlus,
//   CalendarCheck2,
//   Percent,
//   CalendarDays,
// } from "lucide-react";

// import { Axios } from "../../../api/axios";
// import { APP_USAGE_REPORT } from "../../../api/api";

// function AppUsageReport() {

//   // =========================
//   // States
//   // =========================

//   const [loading, setLoading] = useState(false);

//   const [success, setSuccess] =
//     useState("");

//   const [err, setErr] = useState("");

//   const [filters, setFilters] =
//     useState({
//       from_date: "",
//       to_date: "",
//       user_type: "all",
//       governorate_id: "",
//       user_role: "admin",
//       employee_governorates: "",
//     });

//   const [summary, setSummary] =
//     useState({
//       active_users: 0,
//       new_users: 0,
//       total_bookings_completed: 0,
//       active_users_percentage: 0,
//     });

//   // const [appliedFilters, setAppliedFilters] =
//   //   useState(null);

//   const [lastUpdated, setLastUpdated] =
//     useState("");

//   // =========================
//   // Fetch Report
//   // =========================

//   const fetchReport = async () => {

//     try {

//       setLoading(true);

//       const response = await Axios.get(
//         APP_USAGE_REPORT,
//         {
//           params: {
//             from_date:
//               filters.from_date || null,

//             to_date:
//               filters.to_date || null,

//             user_type:
//               filters.user_type === "all"
//                 ? null
//                 : filters.user_type,

//             governorate_id:
//               filters.governorate_id || null,

//             user_role:
//               filters.user_role || null,

//             employee_governorates:
//               filters.user_role ===
//               "employee"
//                 ? filters.employee_governorates
//                 : null,
//           },
//         }
//       );

//       const data = response.data.data;

//       // Summary
//       setSummary(data.summary);

//       // Applied Filters
//       // setAppliedFilters(
//       //   data.filters_applied
//       // );

//       // Last Update
//       setLastUpdated(
//         response.data.timestamp
//       );

//       // Success Message
//       setSuccess(
//         response.data?.message ||
//           "Report loaded successfully"
//       );

//       setErr("");

//       setTimeout(() => {
//         setSuccess("");
//       }, 3000);

//       console.log(
//         "Applied Filters:",
//         data.filters_applied
//       );

//     } catch (error) {

//       console.log(
//         "App Usage Report Error:",
//         error.response?.data || error
//       );

//       // Error Message
//       setErr(
//         error.response?.data?.message ||
//           "Failed to load report"
//       );

//       setSuccess("");

//       setTimeout(() => {
//         setErr("");
//       }, 3000);

//     } finally {

//       setLoading(false);

//     }
//   };

//   // =========================
//   // First Load
//   // =========================

//   useEffect(() => {
//     fetchReport();
//   }, []);

//   // =========================
//   // Render
//   // =========================

//   return (
//     <div className="app-usage-report">

//       {/* Messages */}
//       {success && (
//         <span className="success">
//           {success}
//         </span>
//       )}

//       {err && (
//         <span className="error">
//           {err}
//         </span>
//       )}

//       {/* Filters */}
     
// {/* Filters */}
// <div className="app-filters-box">

//   <div className="app-filters-grid">

//     {/* From Date */}
//     <div className="app-filter-item">

//       <label>From Date</label>

//       <input
//         type="date"
//         value={filters.from_date}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             from_date: e.target.value,
//           })
//         }
//       />

//     </div>

//     {/* To Date */}
//     <div className="app-filter-item">

//       <label>To Date</label>

//       <input
//         type="date"
//         value={filters.to_date}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             to_date: e.target.value,
//           })
//         }
//       />

//     </div>

//     {/* User Type */}
//     <div className="app-filter-item">

//       <label>User Type</label>

//       <select
//         value={filters.user_type}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             user_type: e.target.value,
//           })
//         }
//       >
//         <option value="all">
//           All Users
//         </option>

//         <option value="passenger">
//           Passenger
//         </option>

//         <option value="driver">
//           Driver
//         </option>

//       </select>

//     </div>

//     {/* User Role */}
//     <div className="app-filter-item">

//       <label>User Role</label>

//       <select
//         value={filters.user_role}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             user_role: e.target.value,
//           })
//         }
//       >
//         <option value="admin">
//           Admin
//         </option>

//         <option value="employee">
//           Employee
//         </option>

//       </select>

//     </div>

//     {/* Employee Governorates */}
//     {filters.user_role === "employee" && (

//       <div className="app-filter-item">

//         <label>
//           Employee Governorates
//         </label>

//         <input
//           type="text"
//           placeholder="مثال: 1,2,3"
//           value={
//             filters.employee_governorates
//           }
//           onChange={(e) =>
//             setFilters({
//               ...filters,
//               employee_governorates:
//                 e.target.value,
//             })
//           }
//         />

//       </div>

//     )}

//     {/* Apply Button */}
//     <button
//       className="app-apply-btn"
//       onClick={fetchReport}
//     >
//       {loading
//         ? "Loading..."
//         : "Apply Filters"}
//     </button>

//   </div>

// </div>



//       {/* Summary */}
//       <div className="usage-summary">

//         <div className="cards-grid">

//           {/* Active Users */}
//           <div className="summary-card">

//             <div className="icon purple">
//               <Users size={24} />
//             </div>

//             <div className="card-content">

//               <h4>
//                 Active Users
//               </h4>

//               <h2>
//                 {
//                   summary.active_users
//                 }
//               </h2>

//               <p>
//                 Active users in this
//                 period
//               </p>

//             </div>
//           </div>

//           {/* New Users */}
//           <div className="summary-card">

//             <div className="icon orange">
//               <UserPlus size={24} />
//             </div>

//             <div className="card-content">

//               <h4>
//                 New Users
//               </h4>

//               <h2>
//                 {summary.new_users}
//               </h2>

//               <p>
//                 New users registered
//               </p>

//             </div>
//           </div>

//           {/* Bookings */}
//           <div className="summary-card">

//             <div className="icon green">
//               <CalendarCheck2
//                 size={24}
//               />
//             </div>

//             <div className="card-content">

//               <h4>
//                 Total Bookings
//                 Completed
//               </h4>

//               <h2>
//                 {
//                   summary.total_bookings_completed
//                 }
//               </h2>

//               <p>
//                 Completed bookings
//               </p>

//             </div>
//           </div>

//           {/* Percentage */}
//           <div className="summary-card">

//             <div className="icon blue">
//               <Percent size={24} />
//             </div>

//             <div className="card-content">

//               <h4>
//                 Active Users
//                 Percentage
//               </h4>

//               <h2>
//                 {
//                   summary.active_users_percentage
//                 }
//                 %
//               </h2>

//               <p>
//                 Percentage of active
//                 users
//               </p>

//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Footer */}
//       <div className="last-update">

//         <CalendarDays size={18} />

//         <span>
//           Last updated:{" "}

//           {lastUpdated
//             ? new Date(
//                 lastUpdated
//               ).toLocaleString()
//             : "--"}
//         </span>

//       </div>

//     </div>
//   );
// }

// export default AppUsageReport;
// AppUsageReport.jsx

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Users,
  UserPlus,
  CalendarCheck2,
  Percent,
  CalendarDays,
} from "lucide-react";

import { Axios } from "../../../api/axios";
import { APP_USAGE_REPORT } from "../../../api/api";

function AppUsageReport() {
  const { t } = useTranslation();

  // =========================
  // States
  // =========================

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] =
    useState("");

  const [err, setErr] = useState("");

  const [filters, setFilters] =
    useState({
      from_date: "",
      to_date: "",
      user_type: "all",
      governorate_id: "",
      user_role: "admin",
      employee_governorates: "",
    });

  const [summary, setSummary] =
    useState({
      active_users: 0,
      new_users: 0,
      total_bookings_completed: 0,
      active_users_percentage: 0,
    });

  // const [appliedFilters, setAppliedFilters] =
  //   useState(null);

  const [lastUpdated, setLastUpdated] =
    useState("");

  // =========================
  // Fetch Report
  // =========================

  const fetchReport = async () => {

    try {

      setLoading(true);

      const response = await Axios.get(
        APP_USAGE_REPORT,
        {
          params: {
            from_date:
              filters.from_date || null,

            to_date:
              filters.to_date || null,

            user_type:
              filters.user_type === "all"
                ? null
                : filters.user_type,

            governorate_id:
              filters.governorate_id || null,

            user_role:
              filters.user_role || null,

            employee_governorates:
              filters.user_role ===
              "employee"
                ? filters.employee_governorates
                : null,
          },
        }
      );

      const data = response.data.data;

      // Summary
      setSummary(data.summary);

      // Applied Filters
      // setAppliedFilters(
      //   data.filters_applied
      // );

      // Last Update
      setLastUpdated(
        response.data.timestamp
      );

      // Success Message
      setSuccess(
        response.data?.message ||
          t("appUsageReport.loadSuccess")
      );

      setErr("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

      console.log(
        "Applied Filters:",
        data.filters_applied
      );

    } catch (error) {

      console.log(
        "App Usage Report Error:",
        error.response?.data || error
      );

      // Error Message
      setErr(
        error.response?.data?.message ||
          t("appUsageReport.loadFail")
      );

      setSuccess("");

      setTimeout(() => {
        setErr("");
      }, 3000);

    } finally {

      setLoading(false);

    }
  };

  // =========================
  // First Load
  // =========================

  useEffect(() => {
    fetchReport();
  }, []);

  // =========================
  // Render
  // =========================

  return (
    <div className="app-usage-report">

      {/* Messages */}
      {success && (
        <span className="success">
          {success}
        </span>
      )}

      {err && (
        <span className="error">
          {err}
        </span>
      )}

      {/* Filters */}
     
{/* Filters */}
<div className="app-filters-box">

  <div className="app-filters-grid">

    {/* From Date */}
    <div className="app-filter-item">

      <label>{t("driverEarnings.fromDate")}</label>

      <input
        type="date"
        value={filters.from_date}
        onChange={(e) =>
          setFilters({
            ...filters,
            from_date: e.target.value,
          })
        }
      />

    </div>

    {/* To Date */}
    <div className="app-filter-item">

      <label>{t("driverEarnings.toDate")}</label>

      <input
        type="date"
        value={filters.to_date}
        onChange={(e) =>
          setFilters({
            ...filters,
            to_date: e.target.value,
          })
        }
      />

    </div>

    {/* User Type */}
    <div className="app-filter-item">

      <label>{t("appUsageReport.userType")}</label>

      <select
        value={filters.user_type}
        onChange={(e) =>
          setFilters({
            ...filters,
            user_type: e.target.value,
          })
        }
      >
        <option value="all">
          {t("appUsageReport.allUsers")}
        </option>

        <option value="passenger">
          {t("notifi.passenger")}
        </option>

        <option value="driver">
          {t("notifi.driver")}
        </option>

      </select>

    </div>

    {/* User Role */}
    <div className="app-filter-item">

      <label>{t("appUsageReport.userRole")}</label>

      <select
        value={filters.user_role}
        onChange={(e) =>
          setFilters({
            ...filters,
            user_role: e.target.value,
          })
        }
      >
        <option value="admin">
          {t("appUsageReport.admin")}
        </option>

        <option value="employee">
          {t("appUsageReport.employee")}
        </option>

      </select>

    </div>

    {/* Employee Governorates */}
    {filters.user_role === "employee" && (

      <div className="app-filter-item">

        <label>
          {t("appUsageReport.employeeGovernorates")}
        </label>

        <input
          type="text"
          placeholder="مثال: 1,2,3"
          value={
            filters.employee_governorates
          }
          onChange={(e) =>
            setFilters({
              ...filters,
              employee_governorates:
                e.target.value,
            })
          }
        />

      </div>

    )}

    {/* Apply Button */}
    <button
      className="app-apply-btn"
      onClick={fetchReport}
    >
      {loading
        ? t("common.loading")
        : t("driverEarnings.applyFilters")}
    </button>

  </div>

</div>



      {/* Summary */}
      <div className="usage-summary">

        <div className="cards-grid">

          {/* Active Users */}
          <div className="summary-card">

            <div className="icon purple">
              <Users size={24} />
            </div>

            <div className="card-content">

              <h4>
                {t("appUsageReport.activeUsers")}
              </h4>

              <h2>
                {
                  summary.active_users
                }
              </h2>

              <p>
                {t("appUsageReport.activeUsersDesc")}
              </p>

            </div>
          </div>

          {/* New Users */}
          <div className="summary-card">

            <div className="icon orange">
              <UserPlus size={24} />
            </div>

            <div className="card-content">

              <h4>
                {t("appUsageReport.newUsers")}
              </h4>

              <h2>
                {summary.new_users}
              </h2>

              <p>
                {t("appUsageReport.newUsersDesc")}
              </p>

            </div>
          </div>

          {/* Bookings */}
          <div className="summary-card">

            <div className="icon green">
              <CalendarCheck2
                size={24}
              />
            </div>

            <div className="card-content">

              <h4>
                {t("appUsageReport.totalBookingsCompleted")}
              </h4>

              <h2>
                {
                  summary.total_bookings_completed
                }
              </h2>

              <p>
                {t("appUsageReport.completedBookingsDesc")}
              </p>

            </div>
          </div>

          {/* Percentage */}
          <div className="summary-card">

            <div className="icon blue">
              <Percent size={24} />
            </div>

            <div className="card-content">

              <h4>
                {t("appUsageReport.activeUsersPercentage")}
              </h4>

              <h2>
                {
                  summary.active_users_percentage
                }
                %
              </h2>

              <p>
                {t("appUsageReport.activeUsersPercentageDesc")}
              </p>

            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="last-update">

        <CalendarDays size={18} />

        <span>
          {t("appUsageReport.lastUpdated")}:{" "}

          {lastUpdated
            ? new Date(
                lastUpdated
              ).toLocaleString()
            : "--"}
        </span>

      </div>

    </div>
  );
}

export default AppUsageReport;
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";

import { COMPLAINTS_REPORT } from "../../../api/api";
import {
  Filter,
  CalendarDays,
  ShieldAlert,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  CircleDot,
  UserRound,
} from "lucide-react";

function ComplaintsReport() {

const [loading, setLoading] =
  useState(false);

const [summary, setSummary] =
  useState({
    total_complaints: 0,
    open_complaints: 0,
    in_progress_complaints: 0,
    closed_complaints: 0,
    most_common_complaint_type: "",
    complaints_vs_rides_ratio: 0,
  });
 const [success, setSuccess] =
    useState("");

  const [err, setErr] = useState("");
const [complaints, setComplaints] =
  useState([]);

const [breakdown, setBreakdown] =
  useState({
    by_status: [],
    by_type: [],
    by_complainant_type: [],
    by_day: [],
  });

const [filters, setFilters] =
  useState({
    from_date: "",
    to_date: "",
    complainant_type: "",
    complaint_status: "",
    complaint_type: "",
    user_role: "admin",
    employee_governorates: "",
  });



const fetchReport = async () => {

  try {

    setLoading(true);

    const response = await Axios.get(
      COMPLAINTS_REPORT,
      {
        params: {
          from_date:
            filters.from_date || null,

          to_date:
            filters.to_date || null,

          complainant_type:
            filters.complainant_type ||
            null,

          complaint_status:
            filters.complaint_status ||
            null,

          complaint_type:
            filters.complaint_type ||
            null,

          user_role:
            filters.user_role ||
            "admin",

          employee_governorates:
            filters.user_role ===
            "employee"
              ? filters.employee_governorates
              : null,
        },
      }
    );

    const data =
      response.data.data;

    setSummary(data.summary);

    setBreakdown(data.breakdown);

    setComplaints(
      data.complaints_list || []
    );

    console.log(
      "Complaints Report:",
      response.data
    );

  } catch (error) {

    console.log(
      "Complaints Error:",
      error.response?.data ||
        error
    );

  } finally {

    setLoading(false);

  }
};



useEffect(() => {

  fetchReport();

}, []);



  return (
    <div className="complaints-report">

      {/* HEADER */}

      <div className="report-header">
        <h2>Complaints Report</h2>

       
      </div>

      {/* FILTERS */}

  
{/* FILTERS */}

<div className="app-filters-box">

  <div className="app-filters-grid">

    {/* FROM DATE */}

    <div className="app-filter-item">

      <label>From Date</label>

      <input
        type="date"
        value={filters.from_date}
        onChange={(e) =>
          setFilters({
            ...filters,
            from_date:
              e.target.value,
          })
        }
      />

    </div>

    {/* TO DATE */}

    <div className="app-filter-item">

      <label>To Date</label>

      <input
        type="date"
        value={filters.to_date}
        onChange={(e) =>
          setFilters({
            ...filters,
            to_date:
              e.target.value,
          })
        }
      />

    </div>

    {/* COMPLAINANT TYPE */}

    <div className="app-filter-item">

      <label>
        Complainant Type
      </label>

      <select
        value={
          filters.complainant_type
        }
        onChange={(e) =>
          setFilters({
            ...filters,
            complainant_type:
              e.target.value,
          })
        }
      >

        <option value="">
          All
        </option>

        <option value="passenger">
          Passenger
        </option>

        <option value="driver">
          Driver
        </option>

      </select>

    </div>

    {/* STATUS */}

    <div className="app-filter-item">

      <label>Status</label>

      <select
        value={
          filters.complaint_status
        }
        onChange={(e) =>
          setFilters({
            ...filters,
            complaint_status:
              e.target.value,
          })
        }
      >

        <option value="">
          All
        </option>

        <option value="open">
          Open
        </option>

        <option value="in_progress">
          In Progress
        </option>

        <option value="closed">
          Closed
        </option>

      </select>

    </div>

    {/* TYPE */}

    <div className="app-filter-item">

      <label>
        Complaint Type
      </label>

      <select
        value={
          filters.complaint_type
        }
        onChange={(e) =>
          setFilters({
            ...filters,
            complaint_type:
              e.target.value,
          })
        }
      >

        <option value="">
          All
        </option>

        <option value="ride">
          Ride
        </option>

        <option value="driver">
          Driver
        </option>

        <option value="passenger">
          Passenger
        </option>

        <option value="payment">
          Payment
        </option>

        <option value="system">
          System
        </option>

      </select>

    </div>

    {/* USER ROLE */}

    <div className="app-filter-item">

      <label>User Role</label>

      <select
        value={filters.user_role}
        onChange={(e) =>
          setFilters({
            ...filters,
            user_role:
              e.target.value,
          })
        }
      >

        <option value="admin">
          Admin
        </option>

        <option value="employee">
          Employee
        </option>

      </select>

    </div>

    {/* EMPLOYEE GOVERNORATES */}

    {filters.user_role ===
      "employee" && (

      <div className="app-filter-item">

        <label>
          Employee Governorates
        </label>

        <input
          type="text"
          placeholder="1,2,3"
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

    {/* BUTTON */}

    <button
      className="app-apply-btn"
      onClick={fetchReport}
    >

      {loading
        ? "Loading..."
        : "Apply Filters"}

    </button>

  </div>

</div>


{/* BREAKDOWN SECTION */}

<div className="breakdown-grid">
{/* BY STATUS */}

<div className="breakdown-card">

  <div className="breakdown-header">
    <h3>Complaints By Status</h3>
  </div>

  <div className="breakdown-list">

    {breakdown.by_status.map((item, index) => (

      <div className="breakdown-item" key={index}>

        <div className="item-top">

          <span>{item.status}</span>

          <div className="item-right">
            <span>{item.count}</span>
            <strong>{item.percentage}%</strong>
          </div>

        </div>

        <div className="progress-bar">

          <div
            className={`progress ${item.color}`}
            style={{ width: `${item.percentage}%` }}
          ></div>

        </div>

      </div>

    ))}

  </div>

</div>

{/* BY TYPE */}

<div className="breakdown-card">

  <div className="breakdown-header">
    <h3>Complaints By Type</h3>
  </div>

  <div className="breakdown-list">

    {breakdown.by_type.map((item, index) => (

      <div className="breakdown-item" key={index}>

        <div className="item-top">

          <span>{item.type}</span>

          <div className="item-right">
            <span>{item.count}</span>
            <strong>{item.percentage}%</strong>
          </div>

        </div>

        <div className="progress-bar">

          <div
            className={`progress ${item.color}`}
            style={{ width: `${item.percentage}%` }}
          ></div>

        </div>

      </div>

    ))}

  </div>

</div>

{/* BY COMPLAINANT TYPE */}

<div className="breakdown-card full-width">

  <div className="breakdown-header">
    <h3>Complaints By Complainant Type</h3>
  </div>

  <div className="breakdown-list">

    {breakdown.by_complainant_type.map((item, index) => (

      <div className="breakdown-item" key={index}>

        <div className="item-top">

          <span>{item.complainant_type}</span>

          <div className="item-right">
            <span>{item.count}</span>
            <strong>{item.percentage}%</strong>
          </div>

        </div>

        <div className="progress-bar">

          <div
            className={`progress ${item.color}`}
            style={{ width: `${item.percentage}%` }}
          ></div>

        </div>

      </div>

    ))}

  </div>

</div>

{/* BY DAY */}

<div className="breakdown-card full-width">

  <div className="breakdown-header">
    <h3>Complaints Activity By Day</h3>
  </div>

  <div className="days-chart">

    {breakdown.by_day.map((item, index) => (

      <div className="chart-item" key={index}>

        <div className="chart-column">

          <div
            className="chart-bar"
            style={{
              height: `${item.complaints_count * 60}px`,
            }}
          >
            {item.complaints_count}
          </div>

        </div>

        <p>{item.date}</p>

      </div>

    ))}

  </div>

</div>
  

</div>
      {/* SUMMARY */}

      <div className="summary-grid">

        <div className="summary-card">
          <div className="icon purple">
            <ShieldAlert size={24} />
          </div>

          <div>
            <h4>Total Complaints</h4>
            <h2>{summary.total_complaints}</h2>
            <p>All complaints received</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon red">
            <Clock3 size={24} />
          </div>

          <div>
            <h4>Open Complaints</h4>
            <h2>{summary.open_complaints}</h2>
            <p>Waiting for resolution</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon orange">
            <LoaderCircle size={24} />
          </div>

          <div>
            <h4>In Progress</h4>
            <h2>{summary.in_progress_complaints}</h2>
            <p>Currently processing</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon green">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <h4>Closed Complaints</h4>
            <h2>{summary.closed_complaints}</h2>
            <p>Resolved complaints</p>
          </div>
        </div>

      </div>

      {/* EXTRA INFO */}

      <div className="extra-stats">

        <div className="extra-card">

          <div className="extra-icon">
            <AlertTriangle size={22} />
          </div>

          <div>
            <h4>Most Common Complaint</h4>
            <p>{summary.most_common_complaint_type}</p>
          </div>

        </div>

        <div className="extra-card">

          <div className="extra-icon blue">
            <CircleDot size={22} />
          </div>

          <div>
            <h4>Complaints / Rides Ratio</h4>
            <p>{summary.complaints_vs_rides_ratio}%</p>
          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-box">

        <div className="table-header">
          <h3>Complaints List</h3>
        </div>

        <table>

          <thead>
            <tr>
              <th>#</th>
              <th>Complainant</th>
              <th>Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>

            {complaints.map((item) => (
              <tr key={item.complaint_id}>

                <td>{item.complaint_id}</td>

                <td>
                  <div className="user-cell">
                    <UserRound size={16} />
                    {item.complainant_name}
                  </div>
                </td>

                <td>
                  <span className="type-badge">
                    {item.complaint_type}
                  </span>
                </td>

                <td>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </td>

                <td className="desc">
                  {item.description}
                </td>

                <td>{item.created_at}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ComplaintsReport;
import "./Reports.css";
import { useEffect, useState } from "react";

import {
  Download,
  Filter,
  Clock3,
  Play,
 CheckCircle2,
  XCircle,
  Car,
  Users,
} from "lucide-react";

import { Axios } from "../../../api/axios";

import {
  GET_GOVERNORATES,
  TRIPS_BY_GOVERNORATES,
} from "../../../api/api";

function ActivityReport() {
  const [loading, setLoading] =
    useState(false);

  const [governorates, setGovernorates] =
    useState([]);

  const [reportData, setReportData] =
    useState(null);

  const [success, setSuccess] =
    useState("");

  const [err, setErr] =
    useState("");

  const [filters, setFilters] =
    useState({
      date_from: "",
      date_to: "",
      start_governorate_id: "",
      end_governorate_id: "",
    });

  // ================= GET GOVERNORATES =================

  const fetchGovernorates =
    async () => {
      try {
        const res =
          await Axios.get(
            GET_GOVERNORATES
          );

        console.log(
          "Governorates:",
          res.data
        );

        setGovernorates(
          res.data.data.items || []
        );
      } catch (err) {
        console.log(err);
      }
    };

  // ================= GET REPORT =================

  const fetchReport = async () => {
    setLoading(true);

    try {
      const params = {};

      if (filters.date_from)
        params.date_from =
          filters.date_from;

      if (filters.date_to)
        params.date_to =
          filters.date_to;

      if (
        filters.start_governorate_id
      )
        params.start_governorate_id =
          filters.start_governorate_id;

      if (
        filters.end_governorate_id
      )
        params.end_governorate_id =
          filters.end_governorate_id;

      const res = await Axios.get(
        TRIPS_BY_GOVERNORATES,
        {
          params,
        }
      );

      console.log(
        "Trips By Governorates Response:",
        res.data
      );

      setReportData(res.data.data);

      setSuccess(
        res.data?.message ||
          "Report loaded successfully"
      );

      setErr("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.log(err);

      setErr(
        err.response?.data
          ?.message ||
          "Failed to load report"
      );

      setSuccess("");

      setTimeout(() => {
        setErr("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGovernorates();

    fetchReport();
  }, []);

  // ================= APPLY FILTER =================

  const applyFilters = () => {
    fetchReport();
  };

  // ================= SUMMARY =================

  const summary =
    reportData?.summary || {};

  const stats = [
    {
      title: "Total Trips",
      value:
        summary.total_trips || 0,
      desc: "All trips",
      icon: <Car size={20} />,
      color: "purple",
    },

    {
      title: "Pending",
      value:
        summary.pending_trips || 0,
      desc: "Pending trips",
      icon: (
        <Clock3 size={20} />
      ),
      color: "orange",
    },

    {
      title: "Active",
      value:
        summary.active_trips || 0,
      desc: "Active trips",
      icon: <Play size={20} />,
      color: "green",
    },

    {
      title: "Completed",
      value:
        summary.completed_trips || 0,
      desc: "Completed trips",
      icon: (
        <CheckCircle2 size={20} />
      ),
      color: "blue",
    },

    {
      title: "Cancelled",
      value:
        summary.canceled_trips || 0,
      desc: "Cancelled trips",
      icon: (
        <XCircle size={20} />
      ),
      color: "red",
    },

    {
      title: "Bookings_Count",
      value:
        summary.bookings_count || 0,
      desc: "Total bookings",
      icon: <Users size={20} />,
      color: "purple",
    },
     
  ];

  // ================= START GOVERNORATES =================

  const startBars =
    reportData?.by_start_governorate ||
    [];


  // ================= END GOVERNORATES =================

  const endBars =
    reportData?.by_end_governorate ||
    [];

  return (
    <>
      {/* SUCCESS */}

      {success && (
        <span className="success">
          {success}
        </span>
      )}

      {/* ERROR */}

      {err && (
        <span className="error">
          {err}
        </span>
      )}

      {/* FILTERS */}

      <div className="filters">
        <FilterInput
          label="From Date"
          type="date"
          value={filters.date_from}
          onChange={(e) =>
            setFilters({
              ...filters,
              date_from:
                e.target.value,
            })
          }
        />

        <FilterInput
          label="To Date"
          type="date"
          value={filters.date_to}
          onChange={(e) =>
            setFilters({
              ...filters,
              date_to:
                e.target.value,
            })
          }
        />

        {/* START GOVERNORATE */}

        <FilterInput
          label="Start Governorate"
          type="select"
          value={
            filters.start_governorate_id
          }
          onChange={(e) =>
            setFilters({
              ...filters,
              start_governorate_id:
                e.target.value,
            })
          }
          options={governorates}
        />

        {/* END GOVERNORATE */}

        <FilterInput
          label="End Governorate"
          type="select"
          value={
            filters.end_governorate_id
          }
          onChange={(e) =>
            setFilters({
              ...filters,
              end_governorate_id:
                e.target.value,
            })
          }
          options={governorates}
        />

        <button
          className="apply-btn"
          onClick={applyFilters}
        >
          <Filter size={16} />

          Apply Filters
        </button>
      </div>

      {/* STATS */}

      <div className="stats-grid">
        {stats.map(
          (item, index) => (
            <div
              className="stat-card"
              key={index}
            >
              <div
                className={`icon-circle ${item.color}`}
              >
                {item.icon}
              </div>

              <h2>
                {item.value}
              </h2>

              <p>{item.title}</p>

              <span>
                {item.desc}
              </span>
            </div>
          )
        )}
      </div>

    
      {/* START TABLE */}
<div className="table-box">
  <div className="table-header">
    <h3>
      Start Governorates
      Activity
    </h3>
  </div>

  <table>
    <thead>
       <tr>
        <th>#</th>
        <th>Governorate</th>
        <th>Total Trips</th>
        <th>pending</th>
         <th>Active</th>
        <th>Completed</th>
        <th>Cancelled</th>
        <th>Bookings</th>
        <th>Activity</th>
      </tr>
    </thead>

    <tbody>
      {startBars.map(
        (item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            <td>
              {
                item
                  .governorate
                  ?.name
              }
            </td>

            <td>
              {item.total_trips}
            </td>
 <td>
              {
                item.pending_trips
              }
            </td>
             <td>
              {
                item.active_trips
              }
            </td>
            <td>
              {
                item.completed_trips
              }
            </td>

            <td>
              {
                item.canceled_trips
              }
            </td>

            <td>
              {
                item.bookings_count
              }
            </td>

            <td>
              <div className="activity-cell">
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.activity_percentage}%`,
                    }}
                  ></div>
                </div>

                <span>
                  {
                    item.activity_percentage
                  }
                  %
                </span>
              </div>
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
</div>

      {/* END TABLE */}

     <div className="table-box">
  <div className="table-header">
    <h3>
      End Governorates
      Activity
    </h3>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Governorate</th>
        <th>Total Trips</th>
        <th>pending</th>
         <th>Active</th>
        <th>Completed</th>
        <th>Cancelled</th>
        <th>Bookings</th>
        <th>Activity</th>
      </tr>
    </thead>

    <tbody>
      {endBars.map(
        (item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>

            <td>
              {
                item
                  .governorate
                  ?.name
              }
            </td>

            <td>
              {item.total_trips}
            </td>
 <td>
              {
                item.pending_trips
              }
            </td>
             <td>
              {
                item.active_trips
              }
            </td>
            <td>
              {
                item.completed_trips
              }
            </td>

            <td>
              {
                item.canceled_trips
              }
            </td>

            <td>
              {
                item.bookings_count
              }
            </td>

            <td>
              <div className="activity-cell">
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.activity_percentage}%`,
                    }}
                  ></div>
                </div>

                <span>
                  {
                    item.activity_percentage
                  }
                  %
                </span>
              </div>
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>

  {loading && (
    <p className="loading-text">
      Loading...
    </p>
  )}
</div>
    </>
  );
}

export default ActivityReport;

/* ================= COMPONENTS ================= */

function FilterInput({
  label,
  type,
  value,
  onChange,
  options = [],
}) {
  return (
    <div className="filter-box">
      <label>{label}</label>

      {type === "date" ? (
        <input
          type="date"
          value={value}
          onChange={onChange}
        />
      ) : (
        <select
          value={value}
          onChange={onChange}
        >
          <option value="">
            All
          </option>

          {options.map((item) => (
            <option
              key={item.id}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

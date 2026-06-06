import {
  Filter,
  Users,
  Car,
  CheckCircle2,
  XCircle,
  Star,
  Activity,
  Download,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Axios } from "../../../api/axios";

import {
  DRIVER_PERFORMANCE_REPORT,
  DRIVER,
   GET_GOVERNORATES,
} from "../../../api/api";

function DriversPerformance() {

  const [loading, setLoading] =
    useState(false);

  const [reportData, setReportData] =
    useState([]);
const [success, setSuccess] =
    useState("");

  const [err, setErr] = useState("");
  const [driversList, setDriversList] =
    useState([]);

  const [filters, setFilters] =
    useState({
      from_date: "",
      to_date: "",
      driver_id: "",
      governorate_id: "",
    });

 

const fetchReport = async () => {

  setLoading(true);

  try {

    const response = await Axios.get(
      DRIVER_PERFORMANCE_REPORT,
      {
        params: {
          from_date:
            filters.from_date || null,

          to_date:
            filters.to_date || null,

          driver_id:
            filters.driver_id || null,

          governorate_id:
            filters.governorate_id ||
            null,
        },
      }
    );

    /* PRINT RESPONSE */

    console.log(
      "Driver Performance Response:",
      response.data
    );

    setReportData(
      response.data.data
        .driver_reports || []
    );
setSuccess(
  response.data?.message ||
    "Report loaded successfully"
);

setErr("");

setTimeout(() => {
  setSuccess("");
}, 3000);
  } catch (error) {
setErr(
  error.response?.data?.message ||
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
const [governorates, setGovernorates] =
  useState([]);
 

  const fetchDrivers = async () => {

    try {

      const res = await Axios.get(
        DRIVER
      );

      setDriversList(
        res.data.data.data || []
      );

    } catch (error) {

      console.log(error);

      setDriversList([]);

    }
  };
 const fetchGovernorates = async () => {

  try {

    const res = await Axios.get(
      GET_GOVERNORATES
    );

    console.log(
      "Governorates:",
      res.data
    );

    setGovernorates(
      res.data.data.items || []
    );

  } catch (error) {

    console.log(error);

    setGovernorates([]);
  }
};
useEffect(() => {

  fetchReport();

  fetchDrivers();

  fetchGovernorates();

}, []);
  

  const totalDrivers =
    reportData.length;

  const totalRides =
    reportData.reduce(
      (acc, item) =>
        acc +
        item.summary.total_rides,
      0
    );

  const completedRides =
    reportData.reduce(
      (acc, item) =>
        acc +
        item.summary
          .completed_rides,
      0
    );

  const activeDrivers =
    reportData.filter(
      (item) =>
        item.summary.active_rides >
        0
    ).length;

  const averageCancellation =
    reportData.length > 0
      ? (
          reportData.reduce(
            (acc, item) =>
              acc +
              item.summary
                .cancellation_rate,
            0
          ) / reportData.length
        ).toFixed(1)
      : 0;

  const averageRating =
    reportData.length > 0
      ? (
          reportData.reduce(
            (acc, item) =>
              acc +
              parseFloat(
                item.driver_info
                  .current_rating
              ),
            0
          ) / reportData.length
        ).toFixed(1)
      : 0;

  const stats = [
    {
      title: "Total Drivers",
      value: totalDrivers,
      desc: "Registered drivers",
      icon: <Users size={20} />,
      color: "purple",
    },

    {
      title: "Total Rides",
      value: totalRides,
      desc: "All rides",
      icon: <Car size={20} />,
      color: "blue",
    },

    {
      title: "Completed",
      value: completedRides,
      desc: "Completed rides",
      icon: (
        <CheckCircle2 size={20} />
      ),
      color: "green",
    },

    {
      title: "Active Drivers",
      value: activeDrivers,
      desc: "Currently active",
      icon: (
        <Activity size={20} />
      ),
      color: "orange",
    },

    {
      title:
        "Cancellation Rate",
      value: `${averageCancellation}%`,
      desc: "Average cancel rate",
      icon: <XCircle size={20} />,
      color: "red",
    },

    {
      title: "Average Rating",
      value: averageRating,
      desc: "Driver rating",
      icon: <Star size={20} />,
      color: "yellow",
    },
  ];



  const topDrivers = [...reportData]
    .sort(
      (a, b) =>
        b.summary.total_rides -
        a.summary.total_rides
    )
    .slice(0, 5)
    .map((item) => ({
      name:
        item.driver_info.name,

      rides:
        item.summary.total_rides,

      height: `${
        item.summary.total_rides * 2
      }px`,
    }));


  const completed =
    reportData.reduce(
      (acc, item) =>
        acc +
        item.summary
          .completed_rides,
      0
    );

  const pending =
    reportData.reduce(
      (acc, item) =>
        acc +
        item.summary.pending_rides,
      0
    );

  const active =
    reportData.reduce(
      (acc, item) =>
        acc +
        item.summary.active_rides,
      0
    );

  const cancelled =
    reportData.reduce(
      (acc, item) =>
        acc +
        item.summary
          .cancelled_by_driver +
        item.summary
          .cancelled_by_passenger,
      0
    );

  return (
    <div className="drivers-page">

      {/* FILTERS */}
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
      <div className="filters">

        <FilterDate
          label="From Date"
          value={filters.from_date}
          onChange={(e) =>
            setFilters({
              ...filters,
              from_date:
                e.target.value,
            })
          }
        />

        <FilterDate
          label="To Date"
          value={filters.to_date}
          onChange={(e) =>
            setFilters({
              ...filters,
              to_date:
                e.target.value,
            })
          }
        />
<FilterInput
  label="Governorate"
  value={filters.governorate_id}
  onChange={(e) =>
    setFilters({
      ...filters,
      governorate_id:
        e.target.value,
    })
  }
  options={[
    {
      label:
        "All Governorates",
      value: "",
    },

    ...(Array.isArray(
      governorates
    )
      ? governorates.map(
          (item) => ({
            label: item.name,
            value: item.id,
          })
        )
      : []),
  ]}
/>
        <FilterInput
          label="Driver"
          value={filters.driver_id}
          onChange={(e) =>
            setFilters({
              ...filters,
              driver_id:
                e.target.value,
            })
          }
          options={[
            {
              label:
                "All Drivers",
              value: "",
            },

            ...(Array.isArray(
              driversList
            )
              ? driversList.map(
                  (driver) => ({
                    label:
                      driver.full_name,

                    value:
                      driver.user_id,
                  })
                )
              : []),
          ]}
        />

        <button
          className="apply-btn"
          onClick={fetchReport}
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

      {/* CHARTS */}

      <div className="charts">

        {/* BAR CHART */}

        <div className="chart-box">

          <div className="chart-header">

            <h3>
              Top Performing Drivers
            </h3>

          </div>

          <div className="bar-chart">

            {topDrivers.map(
              (
                driver,
                index
              ) => (

                <div
                  className="bar-item"
                  key={index}
                >

                  <span>
                    {
                      driver.rides
                    }
                  </span>

                  <div
                    className="bar"
                    style={{
                      height:
                        driver.height,
                    }}
                  ></div>

                  <p>
                    {
                      driver.name
                    }
                  </p>

                </div>
              )
            )}

          </div>

        </div>

        {/* DONUT */}

        <div className="chart-box">

          <h3 className="donut-title">
            Ride Status
            Distribution
          </h3>

          <div className="donut-chart">

            <div className="donut-center">

              <h2>
                {totalRides}
              </h2>

              <p>
                Total Rides
              </p>

            </div>

          </div>

          <div className="legend">

            <Legend
              color="#22c55e"
              text="Completed"
              value={completed}
            />

            <Legend
              color="#f59e0b"
              text="Pending"
              value={pending}
            />

            <Legend
              color="#3b82f6"
              text="Active"
              value={active}
            />

            <Legend
              color="#ef4444"
              text="Cancelled"
              value={cancelled}
            />

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-box">

        <div className="table-header">

          <h3>
            Detailed Driver
            Performance
          </h3>

          <button className="download-btn">

            <Download size={18} />

          </button>

        </div>

        <table>

          <thead>

            <tr>

              <th>#</th>

              <th>Driver</th>

              <th>
                Governorate
              </th>

              <th>Rating</th>

              <th>Pending</th>

              <th>Active</th>

              <th>Completed</th>

              <th>
                Cancel Driver
              </th>

              <th>
                Cancel Passenger
              </th>

              <th>
                Cancellation Rate
              </th>

              <th>
                Performance
              </th>

              <th>
                Total Rides
              </th>

            </tr>

          </thead>

    <tbody>

  {loading ? (

    <tr>

      <td
        colSpan="12"
        style={{
          textAlign: "center",
        }}
      >
        Loading...
      </td>

    </tr>

  ) : reportData.length > 0 ? (

    reportData.map(
      (driver, index) => (

        <tr
          key={
            driver.driver_info.id
          }
        >

          {/* رقم */}

          <td>{index + 1}</td>

          {/* driver */}

          <td>
            {
              driver.driver_info.name
            }
          </td>

          {/* governorate */}

          <td>
            {
              driver.driver_info
                .governorate
            }
          </td>

          {/* rating */}

          <td>
            ⭐{" "}
            {
              driver.driver_info
                .current_rating
            }
          </td>

          {/* pending */}

          <td>
            {
              driver.summary
                .pending_rides
            }
          </td>

          {/* active */}

          <td>
            {
              driver.summary
                .active_rides
            }
          </td>

          {/* completed */}

          <td>
            {
              driver.summary
                .completed_rides
            }
          </td>

          {/* cancel_by_driver */}

          <td>
            {
              driver.summary
                .cancelled_by_driver
            }
          </td>

          {/* cancel_by_passenger */}

          <td>
            {
              driver.summary
                .cancelled_by_passenger
            }
          </td>

          {/* cancellation_rate */}

          <td>
            {
              driver.summary
                .cancellation_rate
            }
            %
          </td>

          {/* performance */}

          <td>

            <span
              className={`performance-badge ${driver.summary.performance_classification.toLowerCase()}`}
            >
              {
                driver.summary
                  .performance_classification
              }
            </span>

          </td>

          {/* total_rides */}

          <td>
            {
              driver.summary
                .total_rides
            }
          </td>

        </tr>
      )
    )

  ) : (

    <tr>

      <td
        colSpan="12"
        style={{
          textAlign: "center",
        }}
      >
        No Data Found
      </td>

    </tr>

  )}

</tbody>

        </table>

      </div>

    </div>
  );
}

export default DriversPerformance;



function FilterInput({
  label,
  options,
  value,
  onChange,
}) {

  return (
    <div className="filter-box">

      <label>{label}</label>

      <select
        value={value}
        onChange={onChange}
      >

        {options.map(
          (item, index) => (

            <option
              key={index}
              value={item.value}
            >
              {item.label}
            </option>
          )
        )}

      </select>

    </div>
  );
}

function FilterDate({
  label,
  value,
  onChange,
}) {

  return (
    <div className="filter-box">

      <label>{label}</label>

      <input
        type="date"
        value={value}
        onChange={onChange}
      />

    </div>
  );
}

function Legend({
  color,
  text,
  value,
}) {

  return (
    <div className="legend-item">

      <div className="legend-left">

        <div
          className="legend-color"
          style={{
            background: color,
          }}
        ></div>

        <span>{text}</span>

      </div>

      <span>{value}</span>

    </div>
  );
}
import "./DriverEarnings.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";

import {
  DRIVER,
  DRIVER_EARNINGS_REPORT,
} from "../../../api/api";
export default function DriverEarnings() {
  const [loading, setLoading] =
  useState(false);
  

const [driversList, setDriversList] =
  useState([]);

const [reportData, setReportData] =
  useState(null);
  const income = reportData?.summary?.total_trip_income || 0;
const commission = reportData?.summary?.total_commission_deducted || 0;
const profit = reportData?.summary?.total_net_driver_profit || 0;

const max = Math.max(income, commission, profit, 1);

const scale = (v) => (v / max) * 220;
const [showSource, setShowSource] = useState(false);
const [filters, setFilters] =
  useState({
    driver_name: "",
    date_from: "",
    date_to: "",
  });
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
const fetchReport = async () => {

  setLoading(true);

  try {

    const res = await Axios.get(
      DRIVER_EARNINGS_REPORT,
      {
        params: {
          driver_name:
            filters.driver_name ||
            null,

          date_from:
            filters.date_from ||
            null,

          date_to:
            filters.date_to ||
            null,
        },
      }
    );

    console.log(res.data);

    setReportData(
      res.data.data
    );

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};
useEffect(() => {

  fetchDrivers();

  fetchReport();

}, []);
  return (
    <div className="earnings-page">

      {/* Filters */}
    <div className="filters">


  <div className="filter-box">
    <label>From Date</label>

    <input
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
  </div>

  <div className="filter-box">
    <label>To Date</label>

    <input
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
  </div>

  <div className="filter-box">
    <label>Driver</label>

 <select
  value={filters.driver_name}
  onChange={(e) =>
    setFilters({
      ...filters,
      driver_name: e.target.value,
    })
  }
>
  <option value="">All Drivers</option>

  {driversList.map((driver) => (
    <option
      key={driver.id}
      value={driver.id}
    >
      {driver.full_name}
    </option>
  ))}
</select>
  </div>
  <button
    className="apply-btn"
    onClick={fetchReport}
  >
    Apply Filters
  </button>

</div>

      {/* Summary Cards */}

      <div className="stats-grid">

        <div className="stat-card">
          <h2>
  {reportData?.summary
    ?.drivers_count || 0}
</h2>
          <p>Drivers</p>
        </div>

        <div className="stat-card success">
        <h2>
  {reportData?.summary
    ?.total_completed_trips || 0}
</h2>
          <p>Completed Trips</p>
        </div>

        <div className="stat-card blue">
        <h2>
  $
  {reportData?.summary
    ?.total_trip_income || 0}
</h2>
          <p>Total Income</p>
        </div>

        <div className="stat-card danger">
       <h2>
  $
  {reportData?.summary
    ?.total_commission_deducted || 0}
</h2>
          <p>Commission</p>
        </div>

        <div className="stat-card green">
       <h2>
  $
  {reportData?.summary
    ?.total_net_driver_profit || 0}
</h2>
          <p>Net Profit</p>
        </div>

      </div>

      {/* Chart + Info */}

      <div className="content-grid">

        <div className="chart-card">
          <h3>Driver Earnings Overview</h3>

       <div className="bars">

  <div className="bar-wrapper">
    <div
      className="bar income"
      style={{ height: `${scale(income)}px` }}
    />
    <span>Total Income</span>
  </div>

  <div className="bar-wrapper">
    <div
      className="bar commission"
      style={{ height: `${scale(commission)}px` }}
    />
    <span>Commission</span>
  </div>

  <div className="bar-wrapper">
    <div
      className="bar profit"
      style={{ height: `${scale(profit)}px` }}
    />
    <span>Net Profit</span>
  </div>

</div>
        </div>

     <div className="info-card">
  <h3>Report Information</h3>

  <div className="info-row">
    <span>Included Statuses</span>
    <strong>
      {reportData?.source?.included_trip_statuses?.join(", ") || "-"}
    </strong>
  </div>

  <div className="info-row">
    <span>Excluded Statuses</span>
    <strong>
      {reportData?.source?.excluded_trip_statuses?.join(", ") || "-"}
    </strong>
  </div>

  <div className="info-row">
    <span>Income Field</span>
    <strong>
      {reportData?.source?.income_field || "-"}
    </strong>
  </div>

  <div className="info-row">
    <span>Commission Field</span>
    <strong>
      {reportData?.source?.commission_field || "-"}
    </strong>
  </div>

  <div className="info-row">
    <span>Net Profit Field</span>
    <strong>
      {reportData?.source?.net_profit_field || "-"}
    </strong>
  </div>

  <div className="info-row">
    <span>Date Field</span>
    <strong>
      {reportData?.source?.date_field || "-"}
    </strong>
  </div>

  <div className="info-row">
    <span>Generated At</span>
    <strong>
      {reportData?.generated_at
        ? new Date(reportData.generated_at).toLocaleString()
        : "-"}
    </strong>
  </div>
</div>

      </div>

      {/* Table */}

      <div className="table-card">

        <h3>Drivers Earnings Details</h3>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Driver</th>
              <th>Phone</th>
              <th>Total Trips</th>
              <th>Total Income</th>
              <th>Commission</th>
              <th>Net Profit</th>
            </tr>
          </thead>

      <tbody>

{loading ? (

<tr>
  <td colSpan="7">
    Loading...
  </td>
</tr>

) : (

reportData?.items?.map(
(item,index) => (

<tr key={item.driver.id}>

<td>{index + 1}</td>

<td>
  {item.driver.full_name}
</td>

<td>
  {item.driver.phone}
</td>

<td>
  {item.total_trips}
</td>

<td>
  {item.total_trip_income}
</td>

<td>
  {item.commission_deducted}
</td>

<td className="profit-text">
  {item.net_profit}
</td>

</tr>

))
)}

</tbody>
        </table>

      </div>

    </div>
  );
}
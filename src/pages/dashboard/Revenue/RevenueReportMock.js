import "./DriverEarnings.css";
import { useEffect, useState } from "react";
import { Axios } from "../../../api/axios";
import { Revenue } from "../../../api/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function RevenueReportMock() {

  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const [filters, setFilters] = useState({
    period: "",
    date_from: "",
    date_to: "",
  });

  
  // const fetchReport = async () => {
  //   try {
  //     setLoading(true);

  //     const res = await Axios.get(
  //       Revenue,
  //       {
  //         params: {
  //           period: filters.period,
  //           date_from: filters.date_from,
  //           date_to: filters.date_to,
  //         },
  //       }
  //     );

  //     setReportData(res.data.data);
  //   } catch (err) {
  //     console.error("Revenue API error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchReport();
  // }, []);
  const fetchReport = async () => {
  
    setLoading(true);
  
    try {
  
      const res = await Axios.get(
        Revenue,
        {
           
          params: {
            period: filters.period,
            date_from: filters.date_from,
            date_to: filters.date_to,
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
  

  
    fetchReport();
  
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!reportData) return <div>No Data</div>;

  const { summary, period, source, chart } = reportData || {};

const chartData = (chart || []).map((item) => ({
  date: item.label,
  revenue: item.total_revenue,
}));
  return (
    <div className="earnings-page">

      {/* FILTERS */}
      <div className="filters">

       
<div className="filter-box">
          <label>From Date</label>
          <input
            type="date"
            value={filters.date_from}
            onChange={(e) =>
              setFilters({ ...filters, date_from: e.target.value })
            }
          />
        </div>
        <div className="filter-box">
          
          <label>To Date</label>
          <input
            type="date"
            value={filters.date_to}
            onChange={(e) =>
              setFilters({ ...filters, date_to: e.target.value })
            }
          />
        </div>
 
        <div className="filter-box">
  <label>Period</label>

  <select
    value={filters.period}
    onChange={(e) =>
      setFilters({ ...filters, period: e.target.value })
    }
  >
    <option value="custom">Custom</option>
    <option value="daily">Daily</option>
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
  </select>
</div>
        <button className="apply-btn" onClick={fetchReport}>
          Apply Filters
        </button>
      </div>

      {/* SUMMARY */}
      <div className="stats-grid">

        <div className="stat-card">
          <h2>{summary.total_revenue}</h2>
          <p>Total Revenue</p>
        </div>

        <div className="stat-card ">
          <h2>{summary.completed_trips_count}</h2>
          <p>Completed Trips</p>
        </div>

        <div className="stat-card blue">
          <h2>{summary.total_gross_revenue}</h2>
          <p>Gross Revenue</p>
        </div>

        <div className="stat-card danger">
          <h2>{summary.total_commissions}</h2>
          <p>Commission</p>
        </div>

        <div className="stat-card green">
          <h2>{summary.total_wallet_deductions}</h2>
          <p>Wallet Deductions</p>
        </div>

        <div className="stat-card">
          <h2>{summary.average_daily_revenue}</h2>
          <p>Avg Daily</p>
        </div>

      </div>

      {/* CHART */}
      <div className="content-grid">

<div className="chart-card">
    <h3>Revenue Trend</h3>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#4f46e5"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
        {/* INFO */}
        <div className="info-card">
          <h3>Report Information</h3>

          <div className="info-row">
            <span>Type</span>
            <strong>{period.type}</strong>
          </div>

          <div className="info-row">
            <span>Date Range</span>
            <strong>
              {period.date_from} → {period.date_to}
            </strong>
          </div>

          <div className="info-row">
            <span>Grouping</span>
            <strong>{period.grouping}</strong>
          </div>

          <div className="info-row">
            <span>Included Statuses</span>
            <strong>
              {source.included_trip_statuses.join(", ")}
            </strong>
          </div>

          <div className="info-row">
            <span>Excluded Statuses</span>
            <strong>
              {source.excluded_trip_statuses.join(", ")}
            </strong>
          </div>

          <div className="info-row">
            <span>Revenue Field</span>
            <strong>{source.revenue_field}</strong>
          </div>

          <div className="info-row">
            <span>Wallet Source</span>
            <strong>{source.wallet_deductions_source}</strong>
          </div>
        </div>

      </div>

      {/* TABLE */}
      <div className="table-card">

        <h3>Full Breakdown</h3>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Revenue</th>
              <th>Trips</th>
              <th>Commissions</th>
              <th>Wallet</th>
              <th>Gross</th>
            </tr>
          </thead>

          <tbody>
            {chart.map((row, i) => (
              <tr key={i}>
                <td>{row.label}</td>
                <td>{row.total_revenue}</td>
                <td>{row.completed_trips_count}</td>
                <td>{row.total_commissions}</td>
                <td>{row.total_wallet_deductions}</td>
                <td>{row.total_gross_revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
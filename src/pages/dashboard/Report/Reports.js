import "./Reports.css";
import {
  Bell,
  Download,
  Filter,
  Clock3,
  Play,
  CheckCircle2,
  XCircle,
  Car,
  Users,
} from "lucide-react";

function ReportsSection() {
  const stats = [
    {
      title: "Total Trips",
      value: "12,458",
      desc: "100% of total",
      icon: <Car size={20} />,
      color: "purple",
    },
    {
      title: "Pending",
      value: "1,245",
      desc: "10% of total",
      icon: <Clock3 size={20} />,
      color: "orange",
    },
    {
      title: "Active",
      value: "2,341",
      desc: "18.8% of total",
      icon: <Play size={20} />,
      color: "green",
    },
    {
      title: "Completed",
      value: "7,654",
      desc: "61.4% of total",
      icon: <CheckCircle2 size={20} />,
      color: "blue",
    },
    {
      title: "Cancelled",
      value: "1,218",
      desc: "9.8% of total",
      icon: <XCircle size={20} />,
      color: "red",
    },
    {
      title: "Total Bookings",
      value: "15,862",
      desc: "100% of total",
      icon: <Users size={20} />,
      color: "purple",
    },
  ];

  const bars = [
    { city: "Damascus", value: 3250, height: "240px" },
    { city: "Aleppo", value: 2105, height: "180px" },
    { city: "Homs", value: 1842, height: "160px" },
    { city: "Latakia", value: 1356, height: "120px" },
    { city: "Hama", value: 1105, height: "100px" },
    { city: "Deir Ez-Zor", value: 800, height: "80px" },
  ];

  return (
    <div className="reports-page">

      {/* HEADER */}

      <div className="topbar">

        <div>
          <h1>Reports & Analytics</h1>   
        </div>

       

      </div>

      {/* TABS */}

      <div className="tabs">

        <button className="tab active">
          Activity by Governorate
        </button>

        <button className="tab">
          Drivers Performance
        </button>

        <button className="tab">
          Complaints
        </button>

        <button className="tab">
          App Usage
        </button>

      </div>

      {/* FILTERS */}

      <div className="filters">

        <FilterInput label="Time Period" type="select" />

        <FilterInput label="From Date" type="date" />

        <FilterInput label="To Date" type="date" />

        <FilterInput label="Governorate" type="select" />

        <FilterInput
          label="Departure Governorate"
          type="select"
        />

        <FilterInput
          label="Arrival Governorate"
          type="select"
        />

        <button className="apply-btn">
          <Filter size={16} />
          Apply Filters
        </button>

      </div>

      {/* STATS */}

      <div className="stats-grid">

        {stats.map((item, index) => (
          <div className="stat-card" key={index}>

            <div className={`icon-circle ${item.color}`}>
              {item.icon}
            </div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

            <span>{item.desc}</span>

          </div>
        ))}

      </div>

      {/* CHARTS */}

      <div className="charts">

        {/* BAR CHART */}

        <div className="chart-box">

          <div className="chart-header">

            <h3>Trips by Governorate</h3>

            <select>
              <option>Total Trips</option>
            </select>

          </div>

          <div className="bar-chart">

            {bars.map((bar, index) => (
              <div className="bar-item" key={index}>

                <span>{bar.value}</span>

                <div
                  className="bar"
                  style={{ height: bar.height }}
                ></div>

                <p>{bar.city}</p>

              </div>
            ))}

          </div>

        </div>

        {/* DONUT */}

        <div className="chart-box">

          <h3 className="donut-title">
            Activity Share
          </h3>

          <div className="donut"></div>

          <div className="legend">

            <Legend
              color="#5b8cff"
              text="Damascus"
              value="26.1%"
            />

            <Legend
              color="#7c3aed"
              text="Aleppo"
              value="16.9%"
            />

            <Legend
              color="#00d084"
              text="Homs"
              value="14.8%"
            />

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="table-box">

        <div className="table-header">

          <h3>Detailed Activity by Governorate</h3>

          <button className="download-btn">
            <Download size={18} />
          </button>

        </div>

        <table>

          <thead>

            <tr>

              <th>#</th>
              <th>Governorate</th>
              <th>Total Trips</th>
              <th>Pending</th>
              <th>Active</th>
              <th>Completed</th>
              <th>Cancelled</th>
              <th>Bookings</th>
              <th>Activity</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>1</td>
              <td>Damascus</td>
              <td>3250</td>
              <td>320</td>
              <td>612</td>
              <td>2015</td>
              <td>303</td>
              <td>4120</td>

              <td>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{ width: "26%" }}
                  ></div>

                </div>

              </td>

            </tr>

            <tr>

              <td>1</td>
              <td>Damascus</td>
              <td>3250</td>
              <td>320</td>
              <td>612</td>
              <td>2015</td>
              <td>303</td>
              <td>4120</td>

              <td>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{ width: "26%" }}
                  ></div>

                </div>

              </td>

            </tr>
            
            <tr>

              <td>1</td>
              <td>Damascus</td>
              <td>3250</td>
              <td>320</td>
              <td>612</td>
              <td>2015</td>
              <td>303</td>
              <td>4120</td>

              <td>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{ width: "26%" }}
                  ></div>

                </div>

              </td>

            </tr>
            <tr>

              <td>1</td>
              <td>Damascus</td>
              <td>3250</td>
              <td>320</td>
              <td>612</td>
              <td>2015</td>
              <td>303</td>
              <td>4120</td>

              <td>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{ width: "26%" }}
                  ></div>

                </div>

              </td>

            </tr>
            <tr>

              <td>1</td>
              <td>Damascus</td>
              <td>3250</td>
              <td>320</td>
              <td>612</td>
              <td>2015</td>
              <td>303</td>
              <td>4120</td>

              <td>

                <div className="progress">

                  <div
                    className="progress-fill"
                    style={{ width: "26%" }}
                  ></div>

                </div>

              </td>

            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReportsSection;

/* COMPONENTS */

function FilterInput({ label, type }) {
  return (
    <div className="filter-box">

      <label>{label}</label>

      {type === "date" ? (
        <input type="date" />
      ) : (
        <select>
          <option>All</option>
        </select>
      )}

    </div>
  );
}

function Legend({ color, text, value }) {
  return (
    <div className="legend-item">

      <div className="legend-left">

        <div
          className="legend-color"
          style={{ background: color }}
        ></div>

        <span>{text}</span>

      </div>

      <span>{value}</span>

    </div>
  );
}
import { useState, useEffect } from "react";
import { Axios } from "../../../api/axios";

import {
  RATINGS_LIST,
  RATINGS_DETAILS,
  TOGGLE_RATING_VISIBILITY,
  LOW_RATED_DRIVERS,
} from "../../../api/api";

import { IMAGE_BASE } from "../../../api/api";
import "./ViewRating.css";

export default function ViewRating() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [ratingsList, setRatingsList]   = useState([]);
  const [details, setDetails]           = useState(null);
  const [lowRatedDrivers, setLowRatedDrivers] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [filters, setFilters]           = useState({
    user_type: "passenger",
    from_date: "",
    to_date:   "",
    number:    "",
  });

  const getRatingsList = async () => {
    try {
      setLoading(true);
      const params = { user_type: filters.user_type };
      if (filters.from_date) params.from_date = filters.from_date;
      if (filters.to_date)   params.to_date   = filters.to_date;
      if (filters.number)    params.number     = filters.number;
      const res = await Axios.get(RATINGS_LIST, { params });
      setRatingsList(res.data.data.items || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getRatingDetails = async (userId, userType) => {
  try {
    setLoading(true);

    const res = await Axios.get(RATINGS_DETAILS, {
      params: {
        user_type: userType,
        user_id: userId,
      },
    });

    setDetails(res.data.data);
    setSelectedUser(res.data.data.items[0]?.author);

  } catch (err) {
    console.log(err.response?.data || err);
  } finally {
    setLoading(false);
  }
};

  const getLowRatedDrivers = async () => {
    try {
      const res = await Axios.get(LOW_RATED_DRIVERS);
      setLowRatedDrivers(res.data.data.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVisibility = async (ratingId) => {
    try {
      await Axios.patch(TOGGLE_RATING_VISIBILITY(ratingId));
      if (details?.filters?.user_id) {
        getRatingDetails(details.filters.user_id, details.filters.user_type);
      }
      getRatingsList();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRatingsList();
    getLowRatedDrivers();
  }, []);

  return (
    <div className="vr-page">

      <div className="vr-page-header">
        <h2>Ratings Management</h2>
      </div>

      {/* Filters */}
      <div className="vr-filters-bar">
        <select
          value={filters.user_type}
          onChange={(e) => setFilters({ ...filters, user_type: e.target.value })}
        >
          <option value="passenger">Passenger</option>
          <option value="driver">Driver</option>
        </select>

        <input
          type="date"
          value={filters.from_date}
          onChange={(e) => setFilters({ ...filters, from_date: e.target.value })}
        />

        <input
          type="date"
          value={filters.to_date}
          onChange={(e) => setFilters({ ...filters, to_date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={filters.number}
          onChange={(e) => setFilters({ ...filters, number: e.target.value })}
        />

        <button onClick={getRatingsList}>Search</button>
      </div>

      {/* Low Rated Drivers */}
      <div className="vr-low-rated-card">
        <h3>Low Rated Drivers</h3>
        {lowRatedDrivers.length === 0 ? (
          <p>No Low Rated Drivers</p>
        ) : (
          lowRatedDrivers.map((driver) => (
            <div key={driver.user_id} className="vr-user-card">
              <h4>{driver.full_name}</h4>
              <p>Rating: {driver.rating}</p>
            </div>
          ))
        )}
      </div>

      {/* Main Layout */}
      <div className="vr-layout">

        {/* Sidebar */}
        <div className="vr-sidebar">
          <h3>Ratings List</h3>
          {ratingsList.map((item) => (
            <div
              key={item.rating_id}
              className="vr-user-card"
              onClick={() => getRatingDetails(item.user_id, item.user_type)}
            >
              <p>{item.number}</p>
              <span className={item.is_visible ? "vr-badge-visible" : "vr-badge-hidden"}>
                {item.rating_status}
              </span>
              <div>
                <h4>{item.username}</h4>
                <small>{item.rate_date}</small>
              </div>
              <div>{"⭐".repeat(item.stars)}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="vr-content">
          {!selectedUser ? (
            <div className="vr-empty-state">Select User To View Details</div>
          ) : (
            <>
              {/* Stats */}
              <div className="vr-stats-grid">
                <div className="vr-stat-card">
                  <span>Average Rating</span>
                  <h2>{details?.summary?.average_rating}</h2>
                </div>
                <div className="vr-stat-card">
                  <span>Total Ratings</span>
                  <h2>{details.summary.total_ratings}</h2>
                </div>
                <div className="vr-stat-card">
                  <span>Visible</span>
                  <h2>{details.summary.visible_ratings_count}</h2>
                </div>
                <div className="vr-stat-card">
                  <span>Hidden</span>
                  <h2>{details.summary.hidden_ratings_count}</h2>
                </div>
              </div>

              {/* Profile */}
              <div className="vr-profile-card">
                <img
                  src={
                    details?.items?.[0]?.rated_user?.driver_profile?.personal_photo
                      ? `${IMAGE_BASE}/${details.items[0].rated_user.driver_profile.personal_photo}`
                      : "https://ui-avatars.com/api/?name=User"
                  }
                  alt=""
                />
                <div>
                  <h3>{details?.items?.[0]?.rated_user?.full_name}</h3>
                  <p>{details?.items?.[0]?.rated_user?.phone}</p>
                  <p>{details?.items?.[0]?.rated_user?.email}</p>
                  <p>Rating: {details?.items?.[0]?.rated_user?.rating}</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="vr-breakdown-card">
                <h3>Ratings Breakdown</h3>
                <div className="vr-breakdown-grid">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star}>
                      {"⭐".repeat(star)} {star} ({details?.summary?.breakdown?.[String(star)]})
                    </div>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="vr-table-card">
                <h3>Ratings History</h3>
                <table className="vr-table">
                  <thead>
                    <tr>
                      <th>Stars</th>
                      <th>Classification</th>
                      <th>Comment</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details?.items?.map((rating) => (
                      <tr key={rating.rating_id}>
                        <td>{"⭐".repeat(rating.stars)}</td>
                        <td>{rating.classification}</td>
                        <td>{rating.comment}</td>
                        <td>{rating.created_at}</td>
                        <td>
                          <span className={rating.is_visible ? "vr-badge-visible" : "vr-badge-hidden"}>
                            {rating.is_visible ? "Visible" : "Hidden"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="vr-toggle-btn"
                            onClick={() => toggleVisibility(rating.rating_id)}
                          >
                            Toggle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

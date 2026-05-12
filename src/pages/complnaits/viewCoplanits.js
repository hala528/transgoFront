import { useEffect, useState } from "react";

import {
  Card,
  Badge,
  Button,
  Form,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

import {
  faTriangleExclamation,
  faUser,
  faCalendar,
  faFilter,
  faInbox,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

import "./style.css";

import {
  beasURL,
  GET_COMPLAINTS,
} from "../../api/api";
import { Axios } from "../../api/axios";
import { Link } from "react-router-dom";

export default function Complaints() {

  // STATES
  const [complaints, setComplaints] = useState([]);

  const [summary, setSummary] = useState({});
  const [pagination, setPagination] = useState({});

  const [loading, setLoading] = useState(false);

  // FILTERS
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  // FETCH COMPLAINTS
  const fetchComplaints = async () => {

    try {

      setLoading(true);

      const params = {};

      // SEARCH
      if (search) {
        params.search = search;
      }

      // STATUS
      if (statusFilter) {
        params.status = statusFilter;
      }

      // ROLE
      if (roleFilter) {
        params.complainant_role =
          roleFilter;
      }

      // FROM DATE
      if (fromDate) {
        params.from_date = fromDate;
      }

      // TO DATE
      if (toDate) {
        params.to_date = toDate;
      }

      const response = await Axios.get(
        `${beasURL}/${GET_COMPLAINTS}`,
        {
          params,
        }
      );

      console.log(response.data);

      setComplaints(
        response.data.data.items || []
      );

      setSummary(
        response.data.data.summary || {}
      );

      setPagination(
        response.data.data.pagination || {}
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // FETCH ON FILTER CHANGE
  useEffect(() => {

    fetchComplaints();

  }, [
    search,
    statusFilter,
    roleFilter,
    fromDate,
    toDate,
  ]);

  // STATUS COLORS
  const getStatusVariant = (status) => {

    switch (status) {

      case "new":
        return "danger";

      case "in_progress":
        return "warning";

      case "completed":
        return "success";

      default:
        return "secondary";
    }
  };

  // RESET FILTERS
  const resetFilters = () => {

    setSearch("");

    setStatusFilter("");

    setRoleFilter("");

    setFromDate("");

    setToDate("");
  };

  return (

    <div className="w-100 p-3">

      <div className="complaints-page">

        {/* HEADER */}
        <div className="complaints-header mb-4">

          <div>
            <h2>
              Complaints Dashboard
            </h2>

            <p>
              Manage and monitor all
              complaints
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="complaints-stats">

          <div className="complaint-stat-card">

            <span>
              Total Complaints
            </span>

            <h3>
              {
                summary.complaint_count || 0
              }
            </h3>

          </div>

          <div className="complaint-stat-card">

            <span>
              Current Page
            </span>

            <h3>
              {
                pagination.current_page ||
                1
              }
            </h3>

          </div>

          <div className="complaint-stat-card">

            <span>
              Per Page
            </span>

            <h3>
              {
                pagination.per_page || 0
              }
            </h3>

          </div>

          <div className="complaint-stat-card">

            <span>
              Filtered Results
            </span>

            <h3>
              {complaints.length}
            </h3>

          </div>

        </div>

        {/* FILTERS */}
        <Card className="filters-card p-3 mb-4">

          <div className="filters-header mb-3">

            <FontAwesomeIcon
              icon={faFilter}
            />

            <span className="ms-2">
              Filters
            </span>

          </div>

          <Row className="g-3">

            {/* SEARCH */}
            <Col md={3}>

              <Form.Control
               style={{
                color: "white",
              background: "rgba(255,255,255,0.08)",
              }}
                type="text"
                placeholder="Search by code..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </Col>

            {/* STATUS */}
            <Col md={2}>

              <Form.Select
               style={{
                color: "white",
              background: "rgba(255,255,255,0.08)",
              }}
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Status
                </option>

                <option value="new">
                  New
                </option>

                <option value="in_progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>

              </Form.Select>

            </Col>

            {/* ROLE */}
            <Col md={2}>

              <Form.Select
               style={{
                color: "white",
              background: "rgba(255,255,255,0.08)",
              }}
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(
                    e.target.value
                  )
                }
              >

                <option value="">
                  All Roles
                </option>

                <option value="driver">
                  Driver
                </option>

                <option value="passenger">
                  Passenger
                </option>

              </Form.Select>

            </Col>

            {/* FROM DATE */}
            <Col md={2}>

              <Form.Control
              style={{
                color: "white",
              background: "rgba(255,255,255,0.08)",
              }}
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setFromDate(
                    e.target.value
                  )
                  
                }
              />

            </Col>

            {/* TO DATE */}
            <Col md={2}>

              <Form.Control
               style={{
                color: "white",
              background: "rgba(255,255,255,0.08)",
              }}
                type="date"
                value={toDate}
                onChange={(e) =>
                  setToDate(
                    e.target.value
                  )
                }
              />

            </Col>

            {/* RESET */}
            <Col md={1}>

              <Button
                variant="secondary"
                className="w-100"
                onClick={resetFilters}
              >

                <FontAwesomeIcon
                  icon={faRotate}
                />

              </Button>

            </Col>

          </Row>

        </Card>

        {/* LOADING */}
        {
          loading ? (

            <div className="text-center mt-5">

              <Spinner
                animation="border"
                variant="primary"
              />

            </div>

          ) : complaints.length > 0 ? (

            // LIST
            <Row className="g-4">

              {
                complaints.map((item) => (

                  <Col
                    lg={6}
                    md={6}
                    sm={12}
                    key={
                      item.complaint_id
                    }
                  >

                    <Card className="complaint-card h-100">

                      {/* TOP */}
                      <div className="complaint-top">

                        <div>

                          <h5>
                            {
                              item.complaint_code
                            }
                          </h5>

                          <span className="complaint-type">

                            {
                              item.complaint_type
                            }

                          </span>

                        </div>

                        <Badge
                          bg={getStatusVariant(
                            item.status
                          )}
                        >

                          {item.status}

                        </Badge>

                      </div>

                      {/* BODY */}
                      <div className="complaint-body">

                        <div className="complaint-info">

                          <FontAwesomeIcon
                            icon={faUser}
                          />

                          <span>
                            {
                              item.complainant_name
                            }
                          </span>

                        </div>

                        <div className="complaint-info">

                          <FontAwesomeIcon
                            icon={
                              faTriangleExclamation
                            }
                          />

                          <span>
                            {
                              item.complainant_role
                            }
                          </span>

                        </div>

                        <div className="complaint-info">

                          <FontAwesomeIcon
                            icon={
                              faCalendar
                            }
                          />

                          <span>

                            {
                              new Date(
                                item.created_at
                              ).toLocaleString()
                            }

                          </span>

                        </div>

                      </div>

                      {/* ACTIONS */}
                     <div className="complaint-actions mt-3">

  <Link
  
  to={`${item.complaint_id}`}
>
  

    <Button
      variant="primary"
      style={{
        background:
          "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))",
      }}
    >
      View Details
    </Button>

  </Link>

</div>

                    </Card>

                  </Col>

                ))
              }

            </Row>

          ) : (

            // EMPTY STATE
            <div className="empty-state text-center mt-5">

              <FontAwesomeIcon
                icon={faInbox}
                size="3x"
              />

              <h4 className="mt-3">

                No Complaints Found

              </h4>

            </div>

          )
        }

      </div>

    </div>
  );
}
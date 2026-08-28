


import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t,i18n } = useTranslation();

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
    i18n.language
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
              {t("complaintsList.pageTitle")}
            </h2>

            <p>
              {t("complaintsList.pageSubtitle")}
            </p>
          </div>

        </div>

      

        {/* FILTERS */}
        <Card className="filters-card p-3 mb-4">

          <div className="filters-header mb-3">

            <FontAwesomeIcon
              icon={faFilter}
            />

            <span className="ms-2">
              {t("complaintsList.filters")}
            </span>

          </div>

          <Row className="g-4">

            {/* SEARCH */}
           

            {/* STATUS */}
            <Col md={3}>

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
                  {t("complaintsList.allStatus")}
                </option>

                <option value="new">
                  {t("complaintDetails.new")}
                </option>

                <option value="in_progress">
                  {t("complaintsReport.inProgress")}
                </option>

                <option value="completed">
                  {t("complaintDetails.completed")}
                </option>

              </Form.Select>

            </Col>

            {/* ROLE */}
            <Col md={3}>

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
                  {t("complaintsList.allRoles")}
                </option>

                <option value="driver">
                  {t("notifi.driver")}
                </option>

                <option value="passenger">
                  {t("notifi.passenger")}
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

                          {item.status_display}

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
                              item.complainant_role_display
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
      {t("booking.details")}
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

                {t("complaintsList.noComplaintsFound")}

              </h4>

            </div>

          )
        }

      </div>

    </div>
  );
}
import { useEffect, useMemo, useState } from "react";

import {
  Card,
  Badge,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";

import {
  faTriangleExclamation,
  faUser,
  faCalendar,
  faFilter,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";

export default function Complaints() {

  const [complaints, setComplaints] = useState([]);

  const [summary, setSummary] = useState({});
  const [pagination, setPagination] = useState({});
  const [filtersData, setFiltersData] = useState({});
  const [timestamp, setTimestamp] = useState("");

  // FILTERS
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // MOCK API
  useEffect(() => {

    const response = {
      success: true,
      message: "تم جلب الشكاوى بنجاح.",
      data: {
        filters: {
          status: "",
          complainant_role: "",
          complaint_type: "",
          from_date: "",
          to_date: "",
          per_page: 15
        },
        pagination: {
          total: 1,
          per_page: 15,
          current_page: 1,
          last_page: 1
        },
        summary: {
          complaint_count: 1
        },
        items: [
          {
            complaint_id: 1,
            complaint_code: "CMP-0DD14405",
            complaint_type: "technical",
            status: "new",
            complainant_name: "seba",
            complainant_role: "driver",
            created_at: "2026-05-11T00:44:42+00:00"
          }
        ]
      },
      status_code: 200,
      timestamp: "2026-05-11T00:46:04+00:00"
    };

    setComplaints(response.data.items);
    setSummary(response.data.summary);
    setPagination(response.data.pagination);
    setFiltersData(response.data.filters);
    setTimestamp(response.timestamp);

  }, []);

  // FILTERED DATA
  const filteredComplaints = useMemo(() => {

    return complaints.filter((item) => {

      const matchesSearch =
        item.complaint_code
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "" ||
        item.status === statusFilter;

      const matchesType =
        typeFilter === "" ||
        item.complaint_type === typeFilter;

      const matchesRole =
        roleFilter === "" ||
        item.complainant_role === roleFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesRole
      );

    });

  }, [
    complaints,
    search,
    statusFilter,
    typeFilter,
    roleFilter
  ]);

  // STATUS COLOR
  const getStatusVariant = (status) => {

    switch (status) {
      case "new":
        return "danger";

      case "pending":
        return "warning";

      case "resolved":
        return "success";

      default:
        return "secondary";
    }
  };

  return (
   <div className="w-100 p-2">
    <div className="complaints-page">

      {/* HEADER */}
      <div className="complaints-header">

        <div>
          <h2>Complaints Dashboard</h2>
          <p>
            Manage and monitor all complaints
          </p>
        </div>

        

      </div>

      {/* STATS */}
      <div className="complaints-stats">

        <div className="complaint-stat-card">
          <span>Total Complaints</span>
          <h3>{summary.complaint_count || 0}</h3>
        </div>

        <div className="complaint-stat-card">
          <span>Current Page</span>
          <h3>{pagination.current_page || 1}</h3>
        </div>

        <div className="complaint-stat-card">
          <span>Per Page</span>
          <h3>{pagination.per_page || 0}</h3>
        </div>

        <div className="complaint-stat-card">
          <span>Filtered Results</span>
          <h3>{filteredComplaints.length}</h3>
        </div>

      </div>

      {/* FILTERS */}
      <Card className="filters-card">

        <div className="filters-header">
          <FontAwesomeIcon icon={faFilter} />
          <span>Filters</span>
        </div>

        <Row className="g-3">

          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search by code..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{color: "white",}}
            />
          </Col>

          <Col md={3}>
            <Form.Select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
            >
              <option value="">All Types</option>
              <option value="technical">
                Technical
              </option>
            </Form.Select>
          </Col>

          <Col md={3}>
            <Form.Select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
            >
              <option value="">All Roles</option>
              <option value="driver">
                Driver
              </option>
            </Form.Select>
          </Col>

        </Row>

      </Card>

      {/* LIST */}
      <div className="complaints-grid">

        {
          filteredComplaints.length > 0 ? (

            filteredComplaints.map((item) => (

              <Card
                key={item.complaint_id}
                className="complaint-card"
              >

                {/* TOP */}
                <div className="complaint-top">

                  <div>

                    <h5>
                      {item.complaint_code}
                    </h5>

                    <span className="complaint-type">
                      {item.complaint_type}
                    </span>

                  </div>

                  <Badge
                    bg={getStatusVariant(item.status)}
                  >
                    {item.status}
                  </Badge>

                </div>

                {/* BODY */}
                <div className="complaint-body">

                  <div className="complaint-info">
                    <FontAwesomeIcon icon={faUser} />
                    <span>
                      {item.complainant_name}
                    </span>
                  </div>

                  <div className="complaint-info">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                    />
                    <span>
                      {item.complainant_role}
                    </span>
                  </div>

                  <div className="complaint-info">
                    <FontAwesomeIcon
                      icon={faCalendar}
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
                <div className="complaint-actions">

                  <Button variant="light">
                    View Details
                  </Button>

                </div>

              </Card>

            ))

          ) : (

            <div className="empty-state">

              <FontAwesomeIcon
                icon={faInbox}
                size="3x"
              />

              <h4>No Complaints Found</h4>

            </div>

          )
        }

      </div>

    </div>
    </div>
  );
}
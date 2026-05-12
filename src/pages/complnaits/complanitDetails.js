//ComplanitDetails
import { useEffect, useState } from "react";

import {
  Card,
  Row,
  Col,
  Badge,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";

import {
  faUser,
  faPhone,
  faCalendar,
  faCircleInfo,
  faClockRotateLeft,
  faFileCircleExclamation,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams } from "react-router-dom";





import "./detailcom.css";
import { Axios } from "../../api/axios";
import { beasURL, GET_COMPLAINT_DETAILS , UPDATE_COMPLAINT_STATUS } from "../../api/api";

export default function ComplanitDetails() {

  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [complaint, setComplaint] =
    useState(null);

  const [status, setStatus] =
    useState("");

  // FETCH DETAILS
  useEffect(() => {

    fetchComplaintDetails();

  }, []);

  const fetchComplaintDetails = async () => {

    try {

      setLoading(true);

      const response =
        await Axios.get(
          `${beasURL}/${GET_COMPLAINT_DETAILS(id)}`
        );

      console.log(response.data);

      setComplaint(response.data.data);

      setStatus(
        response.data.data
          .complaint_info.status
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // UPDATE STATUS
  const updateStatus = async () => {

  try {

    setLoading(true);

    const response = await Axios.patch(
      `${beasURL}/${UPDATE_COMPLAINT_STATUS(id)}`,
      {
        status: status,
      }
    );

    console.log(response.data);

    // تحديث البيانات مباشرة بعد التعديل
    setComplaint(response.data.data);

    setStatus(
      response.data.data
        .complaint_info.status
    );

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }
};
const getStatusVariant = (
  status
) => {

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

  if (loading) {

    return (

      <div className="text-center mt-5">

        <Spinner
          animation="border"
          variant="primary"
        />

      </div>

    );
  }

  return (
    <div className="w-100 ">

    <div className="complaint-details-page p-4">

      {/* HEADER */}
      <div className="details-header mb-4">

        <div>

          <h2>
            Complaint Details
          </h2>

          <p>
            Detailed information about
            the complaint
          </p>

        </div>

        <Badge
          bg={getStatusVariant(
            complaint.complaint_info
              .status
          )}
          className="status-badge"
        >

          {
            complaint.complaint_info
              .status
          }

        </Badge>

      </div>

      <Row className="g-4">

        {/* LEFT SIDE */}
        <Col lg={8}>

          {/* COMPLAINT INFO */}
          <Card className="details-card p-4 mb-4">

            <div className="card-title-custom">

              <FontAwesomeIcon
                icon={
                  faFileCircleExclamation
                }
              />

              <span>
                Complaint Information
              </span>

            </div>

            <Row className="mt-4">

              <Col md={6}>

                <div className="info-box">

                  <span>
                    Complaint Code
                  </span>

                  <h6>
                    {
                      complaint
                        .complaint_info
                        .complaint_code
                    }
                  </h6>

                </div>

              </Col>

              <Col md={6}>

                <div className="info-box">

                  <span>
                    Complaint Type
                  </span>

                  <h6>
                    {
                      complaint
                        .complaint_info
                        .complaint_type
                    }
                  </h6>

                </div>

              </Col>

              <Col md={6}>

                <div className="info-box">

                  <span>
                    Created At
                  </span>

                  <h6>

                    {
                      new Date(
                        complaint
                          .complaint_info
                          .created_at
                      ).toLocaleString()
                    }

                  </h6>

                </div>

              </Col>

              <Col md={6}>

                <div className="info-box">

                  <span>
                    Resolved At
                  </span>

                  <h6>

                    {
                      complaint
                        .complaint_info
                        .resolved_at
                        ? new Date(
                            complaint
                              .complaint_info
                              .resolved_at
                          ).toLocaleString()
                        : "Not Resolved Yet"
                    }

                  </h6>

                </div>

              </Col>

            </Row>

          </Card>

          {/* DESCRIPTION */}
          <Card className="details-card p-4 mb-4">

            <div className="card-title-custom">

              <FontAwesomeIcon
                icon={faCircleInfo}
              />

              <span>
                Complaint Description
              </span>

            </div>

            <div className="description-box mt-4">

              {
                complaint
                  .complaint_content
                  .description
              }

            </div>

          </Card>

          {/* PROCESSING LOG */}
          <Card className="details-card p-4">

            <div className="card-title-custom">

              <FontAwesomeIcon
                icon={
                  faClockRotateLeft
                }
              />

              <span>
                Processing Log
              </span>

            </div>

            <div className="timeline mt-4">

              {
                complaint.processing_log.map(
                  (log, index) => (

                    <div
                      className="timeline-item"
                      key={index}
                    >

                      <div className="timeline-dot" />

                      <div className="timeline-content">

                        <h6>

                          {
                            log.new_status
                          }

                        </h6>

                        <p>
                          {log.notes}
                        </p>

                        <small>

                          By {
                            log.changed_by
                          } •{" "}

                          {
                            new Date(
                              log.changed_at
                            ).toLocaleString()
                          }

                        </small>

                      </div>

                    </div>

                  )
                )
              }

            </div>

          </Card>

        </Col>

        {/* RIGHT SIDE */}
       <Col lg={4} className="d-flex flex-column gap-4">

          {/* USER INFO */}
          <Card className="details-card p-4 ">

            <div className="card-title-custom">

              <FontAwesomeIcon
                icon={faUser}
              />

              <span>
                Complainant Info
              </span>

            </div>

            <div className="user-info mt-4">

              <div className="user-info-item">

                <FontAwesomeIcon
                  icon={faUser}
                />

                <span>

                  {
                    complaint
                      .complainant_info
                      .full_name
                  }

                </span>

              </div>

              <div className="user-info-item">

                <FontAwesomeIcon
                  icon={faPhone}
                />

                <span>

                  {
                    complaint
                      .complainant_info
                      .phone
                  }

                </span>

              </div>

              <div className="user-info-item">

                <FontAwesomeIcon
                  icon={faCalendar}
                />

                <span>

                  {
                    complaint
                      .complainant_info
                      .role
                  }

                </span>

              </div>

            </div>

          </Card>

          {/* UPDATE STATUS */}
          <Card className="details-card p-4">

            <div className="card-title-custom">

              <FontAwesomeIcon
                icon={faCheck}
              />

              <span>
                Update Status
              </span>

            </div>

            <Form.Select
              className="mt-4"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >

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

            <Button
  className="w-100 mt-3"
  onClick={updateStatus}
  disabled={loading}
  style={{
    background:
      "linear-gradient(90deg, var(--primary-blue), var(--primary-purple))",
    border: "none",
  }}
>
  {
    loading ? (
      <Spinner
        animation="border"
        size="sm"
      />
    ) : (
      "Save Status"
    )
  }
</Button>

          </Card>

        </Col>

      </Row>

    </div>
        </div>
  );
}
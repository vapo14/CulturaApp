import React from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "react-query";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import YarnRating from "./YarnRating";
import "../css/review.css";
import xIcon from "../assets/icons/x-icon.svg";

export default function Review() {
  const { id } = useParams();

  let getReviewById = async (id) => {
    let data = await axiosInstance.get("/review", { params: { reviewId: id } });
    return data.data;
  };

  const review = useQuery("review", () => getReviewById(id));
  if (review.isLoading) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Spinner
                style={{
                  width: "8rem",
                  height: "8rem",
                  backgroundColor: "#FF9900",
                }}
                animation="grow"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (review.isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>An error was encountered</Alert.Heading>
                <p>{review.error.message}</p>
                <hr />
                <p className="mb-0">
                  Make sure you have an active internet connection, if the
                  problem persists delete cookies and try again.
                </p>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={12}>
            <Card key={review.data._id} className="big-review-card">
              <Link to="/home">
                {" "}
                <div className="main-exit-button">
                  <img src={xIcon} alt="close button" style={{}} />
                </div>
              </Link>

              <Card.Img
                variant="top"
                src={review.data.imgURI}
                className="big-review-img"
              />
              <Card.Body>
                <Card.Title>{review.data.title}</Card.Title>
                <YarnRating rating={review.data.yarnRating} />
                <footer className="blockquote-footer">
                  {review.data.ownerUsername}
                </footer>
                <Card.Text>{review.data.content}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "react-query";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import YarnRating from "./YarnRating";
import "../css/review.css";
import xIcon from "../assets/icons/x-icon.svg";
import CreateComment from "./CreateComment";

export default function Topic() {
  const { id } = useParams();

  let getTopicById = async (id) => {
    let data = await axiosInstance.get("/topic", { params: { topicId: id } });
    return data.data;
  };

  const topic = useQuery("topic", () => getTopicById(id));
  if (topic.isLoading) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <Spinner
                style={{
                  width: "8rem",
                  height: "8rem",
                  backgroundColor: "#ff8a5b",
                }}
                animation="grow"
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  if (topic.isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>An error was encountered</Alert.Heading>
                <p>{topic.error.message}</p>
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
            <Card key={topic.data._id} className="big-review-card">
              <Link to="/home">
                {" "}
                <div className="main-exit-button">
                  <img src={xIcon} alt="close button" style={{}} />
                </div>
              </Link>
              <Card.Img
                variant="top"
                src={topic.data.imgURI}
                className="big-review-img"
              />
              <Card.Body>
                <Card.Title>{topic.data.title}</Card.Title>
                <footer className="blockquote-footer">
                  {new Date(topic.data.published).toDateString()}
                </footer>
                <Card.Text>{topic.data.content}</Card.Text>
                <CreateComment></CreateComment>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

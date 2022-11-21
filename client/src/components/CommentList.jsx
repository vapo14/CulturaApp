import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import "../css/commentList.css";

export default function CommentList() {
  const { id } = useParams();
  let getCommentsByTopicId = async (id) => {
    let data = await axiosInstance.get("/comments", { params: { id } });
    return data.data;
  };

  const comments = useQuery("comments", () => getCommentsByTopicId(id));

  if (comments.isLoading) {
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

  if (comments.isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>An error was encountered</Alert.Heading>
                <p>{comments.error.message}</p>
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

  if (comments.data.length === 0) {
    return (
      <Alert key={"warning"} variant={"warning"}>
        Este tema aún no tiene comentarios. Sé el primero en dar tu opinión!
      </Alert>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          {comments.data.map((comment) => {
            return (
              <Card key={comment._id} className="commentCard">
                <Card.Text>{comment.content}</Card.Text>
                <footer className="blockquote-footer">
                  {comment.createdByUsername}
                  <br />
                  {new Date(comment.postedDate).toDateString()}
                </footer>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

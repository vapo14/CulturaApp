import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
  Toast,
} from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import "../css/commentList.css";
import { useQueryClient } from "react-query";

export default function CommentList() {
  const [DeleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const { UserData } = useAuth();
  const { id } = useParams();
  const queryClient = useQueryClient();
  let getCommentsByTopicId = async (id) => {
    let data = await axiosInstance.get("/comments", { params: { id } });
    return data.data;
  };

  const comments = useQuery("comments", () => getCommentsByTopicId(id));
  const deleteCommentMutation = useMutation((commentId) => {
    return axiosInstance.delete("/comments", {
      params: {
        commentId: commentId,
        topicId: id,
      },
    });
  });

  const handleDelete = (commentId) => {
    setDeleteButtonDisabled(true);
    deleteCommentMutation.mutate(commentId);
    setTimeout(() => {
      setDeleteButtonDisabled(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        refetchType: "active",
      });
    }, 1000);
  };

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
      <Toast
        onClose={() => deleteCommentMutation.reset()}
        show={deleteCommentMutation.isSuccess}
        delay={4000}
        className="main-success-toast"
        style={{ position: "fixed", top: "4rem" }}
        autohide
      >
        <Toast.Body>Tu comentario fue eliminado! 😁</Toast.Body>
      </Toast>
      <Toast
        onClose={() => deleteCommentMutation.reset()}
        show={deleteCommentMutation.isError}
        delay={4000}
        className="main-error-toast"
        style={{ position: "fixed", top: "4rem" }}
        autohide
      >
        <Toast.Body>
          Tu comentario no se pudo eliminar 😔. Intenta de nuevo.
        </Toast.Body>
      </Toast>
      <Container>
        <Row>
          {comments.data.map((comment) => {
            return (
              <Card key={comment._id} className="commentCard">
                <Card.Text>{comment.content}</Card.Text>
                <footer className="blockquote-footer">
                  {comment.createdByUsername}
                  <br />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {new Date(comment.postedDate).toDateString()}
                    {comment.createdById === UserData.userId ? (
                      <Button
                        className="main-button main-delete-button"
                        style={{
                          maxHeight: "3rem",
                          maxWidth: "fit-content",
                          marginTop: "1rem",
                        }}
                        onClick={() => handleDelete(comment._id)}
                        disabled={DeleteButtonDisabled}
                      >
                        Eliminar
                      </Button>
                    ) : null}
                  </div>
                </footer>
              </Card>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

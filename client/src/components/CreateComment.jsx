import React from "react";
import "../css/createComment.css";
import Form from "react-bootstrap/Form";
import { Button, Alert, Toast } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function CreateComment() {
  const { id } = useParams();
  const { UserData } = useAuth();
  const [CommentContent, setCommentContent] = useState("");
  const [ButtonDisabled, setButtonDisabled] = useState(false);
  const postComment = useMutation((newComment) => {
    return axiosInstance.post("/comments", newComment);
  });
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    setButtonDisabled(true);
    let comment = {
      content: CommentContent,
      username: UserData.username,
      userId: UserData.userId,
      topicId: id,
    };

    postComment.mutate(comment);
    setTimeout(() => {
      setCommentContent("");
      setButtonDisabled(false);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        refetchType: "active",
      });
    }, 1000);
  };

  return (
    <div className="create-comment-container">
      <Toast
        onClose={() => postComment.reset()}
        show={postComment.isSuccess}
        delay={4000}
        className="main-success-toast"
        style={{ position: "absolute", top: "-1rem" }}
        autohide
      >
        <Toast.Body>Tu comentario fue agregado! 😁</Toast.Body>
      </Toast>
      <Toast
        onClose={() => postComment.reset()}
        show={postComment.isError}
        delay={4000}
        className="main-error-toast"
        style={{ position: "absolute", top: "-1rem" }}
        autohide
      >
        <Toast.Body>
          Tu comentario no se pudo agregar 😔. Asegurate que no esté vacío e
          intenta de nuevo.
        </Toast.Body>
      </Toast>
      <Form.Control
        as="textarea"
        placeholder="Escribe tu comentario"
        className="create-comment-textarea"
        value={CommentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        required={true}
      />
      <Button
        className="main-button"
        onClick={handleSubmit}
        disabled={ButtonDisabled}
      >
        {!ButtonDisabled ? "Enviar" : "Enviando..."}
      </Button>
    </div>
  );
}

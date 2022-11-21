import React from "react";
import "../css/createComment.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useMutation } from "react-query";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
export default function CreateComment() {
  const { id } = useParams();
  const { UserData } = useAuth();
  const [CommentContent, setCommentContent] = useState("");
  const postComment = useMutation((newComment) => {
    return axiosInstance.post("/comments", newComment);
  });

  const handleSubmit = () => {
    let comment = {
      content: CommentContent,
      username: UserData.username,
      userId: UserData.userId,
      topicId: id,
    };

    postComment.mutate(comment);
  };

  return (
    <div className="create-comment-container">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        className="create-comment-textarea"
        value={CommentContent}
        onChange={(e) => setCommentContent(e.target.value)}
      />
      <Button className="main-button" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}

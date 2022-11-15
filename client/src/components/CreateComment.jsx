import React from "react";
import "../css/createComment.css";
import Form from "react-bootstrap/Form";
import { FloatingLabel, Button } from "react-bootstrap";

export default function CreateComment() {
  return (
    <div className="create-comment-container">
      <Form.Control
        as="textarea"
        placeholder="Leave a comment here"
        className="create-comment-textarea"
      />
      <Button className="main-button">Submit</Button>
    </div>
  );
}

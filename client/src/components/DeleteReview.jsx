import { React, useState } from "react";
import {
  Modal,
  Button,
  Container,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import { useMutation } from "react-query";
import successIcon from "../assets/icons/success.svg";
import failedIcon from "../assets/icons/failed.svg";

export default function DeleteReview(props) {
  const { setShowConfirmDeleteModal, reviewId } = props;
  const deleteReviewMutation = useMutation((reviewId) => {
    return axiosInstance.delete(`/review/${reviewId}`);
  });

  const handleDeleteReview = () => {
    console.log(`deleting ${reviewId}`);
    deleteReviewMutation.mutate(reviewId);
  };

  if (deleteReviewMutation.isLoading) {
    return (
      <div>
        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Deleting...</h2>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else if (deleteReviewMutation.isSuccess) {
    return (
      <div>
        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Your review was deleted successfully!</h2>
              <Image
                src={successIcon}
                style={{
                  width: "10rem",
                  height: "10rem",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else if (deleteReviewMutation.isError) {
    return (
      <div>
        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Review deletion failed. Please try again.</h2>
              <Image
                src={failedIcon}
                style={{
                  width: "10rem",
                  height: "10rem",
                }}
              />
              <p>{deleteReviewMutation.error}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="main-button main-delete-button"
            onClick={handleDeleteReview}
            disabled={deleteReviewMutation.isLoading}
          >
            Delete
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

import { React, useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../api/axiosInstance";
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import YarnRating from "./YarnRating";
import LikeAndSave from "./LikeAndSave";
import { Link } from "react-router-dom";
import spoiler_alert from "../assets/icons/spoiler_alert.png";
import useAuth from "../hooks/useAuth";
import DeleteReview from "./DeleteReview";
import sleepCat from "../assets/imgs/sleeping_cat.png";

export default function SavedReviews() {
  const [ShowConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState("");

  const userReviews = useQuery("userReviews", async () => {
    const data = await axiosInstance.get("/reviews/user");
    return data.data;
  });

  const { UserData } = useAuth();

  if (userReviews.isLoading) {
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

  if (userReviews.isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>An error was encountered</Alert.Heading>
                <p>{userReviews.error.message}</p>
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
      <Modal
        show={ShowConfirmDeleteModal}
        onHide={() => setShowConfirmDeleteModal(false)}
      >
        <DeleteReview
          setShowConfirmDeleteModal={setShowConfirmDeleteModal}
          reviewId={selectedReviewId}
        ></DeleteReview>
      </Modal>
      <Container className="review-container">
        <Row>
          <Col md={12}>
            {userReviews.data.map((review) => {
              return (
                <Card key={review._id} className="grow">
                  <Card.Img variant="top" src={review.imgURI} />
                  <Card.Body>
                    <div className="card-body-custom-container">
                      <div className="card-left-side">
                        <Card.Title>
                          {review.title}
                          {review.isSpoiler ? (
                            <Image
                              src={spoiler_alert}
                              fluid
                              className="spoiler-alert-image"
                            />
                          ) : (
                            ""
                          )}
                        </Card.Title>
                        <YarnRating rating={review.yarnRating} />
                        <footer className="blockquote-footer">
                          {review.ownerUsername}
                        </footer>
                        <Card.Text>
                          {review.content.slice(0, 100) + " ..."}
                        </Card.Text>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Link to={`/review/${review._id}`}>
                            <Button
                              className="main-button"
                              id="read-more-button"
                            >
                              Read more
                            </Button>
                          </Link>
                          <Button
                            className="main-button main-delete-button"
                            onClick={() => {
                              setSelectedReviewId(review._id);
                              setShowConfirmDeleteModal(true);
                            }}
                          >
                            Delete Review
                          </Button>
                        </div>
                      </div>
                      <div className="card-right-side">
                        <LikeAndSave
                          isLiked={review.userLikes.includes(UserData.userId)}
                          reviewId={review._id}
                          likeCount={review.likeCount}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
            {userReviews.data.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "2rem",
                }}
              >
                <Image src={sleepCat} alt="sleeping cat" width="60%"></Image>
                <p style={{ color: "#505050" }}>
                  Looks like there are no reviews yet! Press the + button to
                  create one!
                </p>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

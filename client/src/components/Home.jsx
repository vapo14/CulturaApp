import { React } from "react";
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
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/reviews.css";
import LikeAndSave from "./LikeAndSave";
import useAuth from "../hooks/useAuth";
import sleepCat from "../assets/imgs/sleeping_cat.png";

export default function Home() {
  const { isLoading, isError, error, data } = useQuery("topics", async () => {
    const data = await axiosInstance.get("/topics");
    return data.data;
  });
  const { UserData } = useAuth();

  if (isLoading) {
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
  if (isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col>
              <Alert variant="danger">
                <Alert.Heading>An error was encountered</Alert.Heading>
                <p>{error.message}</p>
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
      <Container className="review-container">
        <Row>
          <Col md={12}>
            {data.map((review) => {
              return (
                <Card key={review._id} className="grow">
                  <Card.Body>
                    <div className="card-body-custom-container">
                      <div className="card-left-side">
                        <Card.Title>{review.title}</Card.Title>
                        <footer
                          className="small"
                          style={{ color: "#333333a1" }}
                        >
                          Publicado: {new Date(review.published).toDateString()}
                        </footer>
                        <Card.Text style={{ margin: "2rem 0 2rem" }}>
                          {review.content.slice(0, 100) + " ..."}
                        </Card.Text>
                        <Link to={`/topic/${review._id}`}>
                          <Button className="main-button" id="read-more-button">
                            Leer más
                          </Button>
                        </Link>
                      </div>
                      <div className="card-right-side">
                        <LikeAndSave
                          isLiked={review.userLikes.includes(UserData.userId)}
                          reviewId={review._id}
                          likeCount={review.likeCount}
                        />
                        <div className="comment-container">
                          <button className={"comment-button"}>
                            <span className="comment-icon">
                              <div className="heart-animation-1"></div>
                              <div className="heart-animation-2"></div>
                            </span>
                            {review.commentCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
            {data.length === 0 ? (
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

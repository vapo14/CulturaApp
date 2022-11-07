import { React, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  Toast,
  Spinner,
  Image,
} from "react-bootstrap";
import "../css/postReview.css";
import SearchMovie from "./SearchMovie";
import YarnRating from "./YarnRating";
import axiosInstance from "../api/axiosInstance";
import { useMutation } from "react-query";
import successIcon from "../assets/icons/success.svg";
import failedIcon from "../assets/icons/failed.svg";

export default function PostReview(props) {
  const [ShowErrorAlert, setShowErrorAlert] = useState(false);
  const [MovieData, setMovieData] = useState({
    title: "",
    content: "",
    imgURI: "",
    isSpoiler: false,
  });

  const postReview = useMutation((newReview) => {
    return axiosInstance.post("/reviews/upload", newReview);
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setShowErrorAlert(false);
    setMovieData({
      ...MovieData,
    });
    if (
      MovieData.movieId === "" ||
      !MovieData.movieId ||
      MovieData.yarnRating === 0 ||
      !MovieData.yarnRating
    ) {
      setShowErrorAlert(true);
      return;
    } else {
      postReview.mutate(MovieData);
    }
    console.log(MovieData);
  };

  if (postReview.isLoading) {
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
  } else if (postReview.isSuccess) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Your review was submitted successfully!</h2>
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
  } else if (postReview.isError) {
    return (
      <div>
        <Container style={{ marginTop: "20rem" }}>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h2>Review submission failed. Please try again.</h2>
              <Image
                src={failedIcon}
                style={{
                  width: "10rem",
                  height: "10rem",
                }}
              />
              <p>{postReview.error}</p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Row>
            <Toast
              onClose={() => setShowErrorAlert(false)}
              show={ShowErrorAlert}
              className="main-error-toast post-error-toast"
            >
              <Toast.Header>
                <strong className="me-auto">Check your data</strong>
              </Toast.Header>
              <Toast.Body>
                Oops, looks like you are missing some details for your movie
                review.
              </Toast.Body>
            </Toast>
          </Row>
          <Row>
            <Col md={6}>
              <SearchMovie
                setMovieData={setMovieData}
                MovieData={MovieData}
              ></SearchMovie>
            </Col>
            <Col md={6}>
              <Form
                className="post-main-form"
                onSubmit={(e) => handlePostSubmit(e)}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Review title"
                    onChange={(e) =>
                      setMovieData({ ...MovieData, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <YarnRating
                  select
                  setMovieData={setMovieData}
                  MovieData={MovieData}
                ></YarnRating>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="This review contains spoilers"
                    style={{ marginTop: "2rem", marginBottom: "2rem" }}
                    value={MovieData.isSpoiler}
                    onChange={() =>
                      setMovieData({
                        ...MovieData,
                        isSpoiler: !MovieData.isSpoiler,
                      })
                    }
                  />
                  <Form.Label>Content</Form.Label>
                  <FormControl
                    as="textarea"
                    aria-label="content"
                    className="post-review-textarea"
                    placeholder="Write your review here!"
                    onChange={(e) =>
                      setMovieData({ ...MovieData, content: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Button className="main-button" type="submit">
                  Post
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

import { React, useState, useEffect } from "react";
import { Form, Image, ListGroup } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";
import "../css/searchMovie.css";

export default function SearchMovie(props) {
  const [SearchData, setSearchData] = useState({ slug: "", results: [] });
  const [SelectedMovieIdx, setSelectedMovieIdx] = useState();

  useEffect(() => {
    //api call
    if (SearchData.slug !== "") {
      const timeoutID = setTimeout(async () => {
        const handleAPICall = async () => {
          const data = await axiosInstance.get("/search", {
            params: { q: SearchData.slug },
          });
          setSearchData({ ...SearchData, results: data.data });
        };
        await handleAPICall();
      }, 500);
      return () => clearTimeout(timeoutID);
    } else {
      setSearchData({ ...SearchData, results: [], slug: "" });
      props.setMovieData({ ...props.MovieData, movieId: "" });
    }
  }, [SearchData.slug]);

  const handleSelectMovie = (movieId, imgURI, idx) => {
    props.setMovieData({ ...props.MovieData, movieId, imgURI });
    setSelectedMovieIdx(idx);
    console.log("selected: ", props.MovieData);
  };

  return (
    <div className="main-search-movie-container">
      <Form.Label>Search Movie</Form.Label>
      <Form.Control
        type="search"
        placeholder="Movie name"
        id="search-movie-bar"
        onChange={(e) => setSearchData({ ...SearchData, slug: e.target.value })}
      />
      <ListGroup as="ol" numbered className="search-results-list">
        {SearchData.results.map((movie, idx) => {
          return (
            <ListGroup.Item
              as="li"
              className={
                SelectedMovieIdx === idx
                  ? "d-flex justify-content-between align-items-start selected-movie"
                  : "d-flex justify-content-between align-items-start"
              }
              key={idx}
              onClick={() => handleSelectMovie(movie.id, movie.image, idx)}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{movie.title}</div>
                {movie.description}
              </div>
              <Image
                src={movie.image.replace("original", "50x69")}
                width={50}
                fluid
                rounded
              ></Image>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

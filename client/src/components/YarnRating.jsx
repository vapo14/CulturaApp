import { React, useState } from "react";
import { FormLabel } from "react-bootstrap";
import "../css/yarnRating.css";

export default function YarnRating(props) {
  const [SelectedAmount, setSelectedAmount] = useState(0);

  let rating = [1, 2, 3, 4, 5];

  const handleYarnHover = (e) => {
    setSelectedAmount(parseInt(e.target.id));
  };

  const handleYarnClick = (e) => {
    setSelectedAmount(parseInt(e.target.id));
    props.setMovieData({ ...props.MovieData, yarnRating: SelectedAmount });
  };

  if (props.select) {
    return (
      <div className="yarn-container" style={{ margin: "2rem 0 1rem 0" }}>
        <FormLabel>Select yarn rating: </FormLabel>
        {rating.map((id) => {
          if (id <= SelectedAmount) {
            return (
              <div
                className="yarn select-yarn yarn-active"
                key={id}
                id={id}
                onMouseOver={(e) => handleYarnHover(e)}
                onClick={(e) => handleYarnClick(e)}
              ></div>
            );
          } else {
            return (
              <div
                className="yarn select-yarn"
                key={id}
                id={id}
                onMouseEnter={(e) => handleYarnHover(e)}
              ></div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div className="yarn-container">
      {rating.map((id) => {
        if (id <= props.rating) {
          return <div key={id} className="yarn yarn-active"></div>;
        } else {
          return <div key={id} className="yarn"></div>;
        }
      })}
    </div>
  );
}

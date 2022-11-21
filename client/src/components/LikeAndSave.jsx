import { React, useState } from "react";
import "../css/likeAndSave.css";
import { useMutation } from "react-query";
import axiosInstance from "../api/axiosInstance";

export default function LikeAndSave(props) {
  const [Liked, setLiked] = useState(props.isLiked);
  const [LikeCount, setLikeCount] = useState(props.likeCount);

  const likeReview = useMutation((reviewId) => {
    return axiosInstance.put("/topic/like", null, { params: { reviewId } });
  });

  const handleLikeButton = () => {
    if (Liked) {
      setLikeCount(LikeCount - 1);
    } else {
      setLikeCount(LikeCount + 1);
    }
    setLiked(!Liked);
    likeReview.mutate(props.reviewId);
  };

  return (
    <div className="like-and-save-container">
      <button
        className={`like-button  ${Liked ? "liked" : ""}`}
        onClick={handleLikeButton}
      >
        <span className="like-icon">
          <div className="heart-animation-1"></div>
          <div className="heart-animation-2"></div>
        </span>
        {LikeCount}
      </button>
    </div>
  );
}

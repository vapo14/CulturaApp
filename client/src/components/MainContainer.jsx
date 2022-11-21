import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PostReview from "./PostReview";
import Topic from "./Topic";
import Home from "./Home";
import SavedReviews from "./SavedReviews";
import UserPosts from "./UserPosts";

export default function MainContainer() {
  return (
    <div className="main-app-container">
      <NavBar></NavBar>
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/post" element={<PostReview></PostReview>}></Route>
        <Route path="/saved" element={<SavedReviews></SavedReviews>}></Route>
        <Route path="/topic/:id" element={<Topic></Topic>}></Route>
      </Routes>
    </div>
  );
}

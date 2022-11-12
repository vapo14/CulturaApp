// import express router to configure routes
const router = require("express").Router();

//import passport middleware
const passport = require("passport");
const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");

// import necessary controllers
const userController = require("./controllers/userController");
const topicController = require("./controllers/topicController");

router.get("/", checkAuthenticated, (req, res) => {
  return res.send("hi");
});

// ======= USER ROUTES =======
router.post("/user/create", userController.createUser);

router.post(
  "/user/login",
  checkNotAuthenticated,
  passport.authenticate("local"),
  userController.loginUser
);

router.delete("/user/logout", checkAuthenticated, userController.logoutUser);

router.post(
  "/user/validate",
  checkNotAuthenticated,
  userController.validateUser
);

// ======= REVIEWS ROUTES =======

router.get("/reviews", checkAuthenticated, topicController.getAllReviews);
router.post("/reviews/upload", checkAuthenticated, topicController.postReview);
router.get("/review", checkAuthenticated, topicController.getReviewById);
router.get(
  "/reviews/user",
  checkAuthenticated,
  topicController.getReviewsByUserId
);
router.get(
  "/reviews/filter",
  checkAuthenticated,
  topicController.getReviewsByMovieId
);
router.get(
  "/reviews/liked",
  checkAuthenticated,
  topicController.getReviewsLikedByUser
);

router.put("/review/like", checkAuthenticated, topicController.likeReview);

router.delete("/review/:id", checkAuthenticated, topicController.deleteReview);

module.exports = router;

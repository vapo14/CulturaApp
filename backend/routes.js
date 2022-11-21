// import express router to configure routes
const router = require("express").Router();

//import passport middleware
const passport = require("passport");
const checkAuthenticated = require("./middleware/checkAuthenticated");
const checkNotAuthenticated = require("./middleware/checkNotAuthenticated");

// import necessary controllers
const userController = require("./controllers/userController");
const topicController = require("./controllers/topicController");
const commentController = require("./controllers/commentController");

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

// ======= Topic ROUTES =======

router.get("/topics", checkAuthenticated, topicController.getAllTopics);
router.post("/topics/upload", checkAuthenticated, topicController.postTopic);
router.get("/topic", checkAuthenticated, topicController.getTopicById);
router.get(
  "/topics/liked",
  checkAuthenticated,
  topicController.getTopicsLikedByUser
);

router.put("/topic/like", checkAuthenticated, topicController.likeTopic);

// ======== Comment ROUTES ======

router.post("/comments", checkAuthenticated, commentController.postComment);
router.get(
  "/comments",
  checkAuthenticated,
  commentController.getTopicCommentsByTopicId
);

module.exports = router;

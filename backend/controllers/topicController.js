const topicModel = require("../models/topicModel");

/**
 * get all topics and sort them by date published in ascending order
 * @param {*} req
 * @param {*} res
 */
const getAllTopics = async (req, res) => {
  res.json(await topicModel.find().sort({ published: -1 }));
};

/**
 * Get topic by topic id.
 * @param {*} req
 * @param {*} res
 */
const getTopicById = async (req, res) => {
  res.json(await topicModel.findOne({ _id: req.query.topicId }));
};

/**
 * Get topics that the user has liked/saved
 * @param {*} req
 * @param {*} res
 */
const getTopicsLikedByUser = async (req, res) => {
  res.json(await topicModel.find({ userLikes: req.user._id }));
};

/**
 * Post a new topic using the request body data.
 * @param {*} req
 * @param {*} res
 */
const postTopic = async (req, res) => {
  try {
    let newPost = new topicModel({
      isSpoiler: req.body.isSpoiler,
      movieId: req.body.movieId,
      owner: req.user._id,
      ownerUsername: req.user.username,
      title: req.body.title,
      content: req.body.content,
      yarnRating: req.body.yarnRating,
      likeCount: 0,
      commentCount: 0,
      userLikes: [],
      userSaves: [],
      imgURI: req.body.imgURI,
      published: Date(),
    });

    newPost.save((err) => {
      if (err) return res.status(500).send(`Error creating post, ${err}`);
      return res.status(201).json({ status: "POST_SAVED" });
    });
  } catch (error) {
    return res.status(500).send(`Error creating post, ${error}`);
  }
};

const likeTopic = async (req, res) => {
  let reviewId = req.query.reviewId;
  // determine if the user has already liked the review
  let hasLiked = await topicModel.findOne({
    _id: reviewId,
    userLikes: req.user._id,
  });
  if (hasLiked) {
    try {
      await topicModel.findByIdAndUpdate(reviewId, {
        $pull: { userLikes: req.user._id },
        $inc: { likeCount: -1 },
      });
      return res.status(200).json({ status: "UNLIKED_REVIEW" });
    } catch (err) {
      console.error(err);
      res.json(err);
      return;
    }
  } else {
    try {
      await topicModel.findByIdAndUpdate(reviewId, {
        $push: { userLikes: req.user._id },
        $inc: { likeCount: 1 },
      });
      return res.status(200).json({ status: "LIKED_REVIEW" });
    } catch (err) {
      console.error(err);
      res.json(err);
      return;
    }
  }
};

const deleteTopic = async (req, res) => {
  try {
    await topicModel.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Successfully deleted your review!",
    });
  } catch (err) {
    res.json({
      status: "failed",
      message: "Could not complete operation. Refresh and try again.",
    });
  }
};

module.exports = {
  postTopic,
  deleteTopic,
  getTopicsLikedByUser,
  getAllTopics,
  getTopicById,
  likeTopic,
};

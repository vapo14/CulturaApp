const commentModel = require("../models/commentModel");
const topicModel = require("../models/topicModel");

/**
 * Post a new comment
 * @param {*} req
 * @param {*} res
 */
const postComment = async (req, res) => {
  try {
    let comment = new commentModel({
      content: req.body.content,
      createdByUsername: req.body.username,
      createdById: req.body.userId,
      postedDate: Date(),
      topicId: req.body.topicId,
    });

    await comment.save((err) => {
      if (err) return res.status(500).send(`Error creating comment, ${err}`);
      return res.status(201).json({ status: "COMMENT_POSTED" });
    });

    await topicModel.findByIdAndUpdate(req.body.topicId, {
      $inc: { commentCount: 1 },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error creating comment, ${error}`);
  }
};

/**
 * Get all the comments from a topic id
 * the topic ID is in the query params
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getTopicCommentsByTopicId = async (req, res) => {
  try {
    let topicId = req.query.id;
    let comments = await commentModel.find({
      topicId,
    });
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error creating comment, ${error}`);
  }
};

/**
 * delete a comment by id in query params
 * @param {*} req
 * @param {*} res
 */
const deleteComment = async (req, res) => {
  try {
    await commentModel.findByIdAndDelete(req.query.commentId);
    await topicModel.findByIdAndUpdate(req.query.topicId, {
      $inc: { commentCount: -1 },
    });
    res.status(204).json({
      status: "success",
      message: "Successfully deleted your review!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error deleting comment, ${error}`);
  }
};

module.exports = { postComment, getTopicCommentsByTopicId, deleteComment };

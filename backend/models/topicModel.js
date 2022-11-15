const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      required: true,
    },
    commentCount: {
      type: Number,
      required: true,
    },
    userLikes: {
      type: [String],
      required: true,
    },
    commentIds: {
      type: [String],
      required: true,
    },
    published: {
      type: Date,
      required: true,
    },
  },
  { collection: "Topics" }
);

topicSchema.set("versionKey", false);

module.exports = mongoose.model("Topic", topicSchema);

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    createdByUsername: {
      type: String,
      required: true,
    },
    createdById: {
      type: String,
      required: true,
    },
    postedDate: {
      type: Date,
      required: true,
    },
    topicId: {
      type: String,
      required: true,
    },
  },
  { collection: "Comments" }
);

commentSchema.set("versionKey", false);

module.exports = mongoose.model("Comments", commentSchema);

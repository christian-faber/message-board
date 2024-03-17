const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: String,
  postid: String,
  comment: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };

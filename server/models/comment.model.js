const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  id: String,
  postid: String,
  comment: String,
  likes: Number,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };

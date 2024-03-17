const express = require("express");
const router = express.Router();
const { Post } = require("../models/post.model");

router.get("/", async (req, res) => {
  const allPosts = await Post.find();
  return res.status(200).json(allPosts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  return res.status(200).json(post);
});

router.post("/", async (req, res) => {
  const newPost = new Post({ ...req.body });
  const insertedPost = await newPost.save();
  return res.status(201).json(insertedPost);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Post.updateOne({ id }, req.body);
  const updatedPost = await Post.findById(id);
  return res.status(200).json(updatedPost);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  return res.status(200).json(deletedPost);
});

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const connectionString = process.env.MONGO_URI;
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the database…"))
  .catch((err) => console.log("Connection error:", err));

app.get("/", (req, res, next) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

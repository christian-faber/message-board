const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const connectionString = process.env.MONGO_URI;
// const commentRouter = require("./routers/commentRouter");

//middleware goes before using routes!!!!!!
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("combined"));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

const postRouter = require("./routers/postRouter");
app.use("/posts", postRouter);
// app.use("/comments", commentRouter);

mongoose
  .connect(connectionString)
  .then(() => console.log("Connected to the database…"))
  .catch((err) => console.log("Connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

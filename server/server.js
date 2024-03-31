const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const connectionString = process.env.MONGO_URI;

//middleware goes before using routes!!!!!!
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("combined"));
app.use(express.json());
const PORT = 3000;

const postRouter = require("./routers/postRouter");
app.use("/posts", postRouter);
const userRouter = require("./routers/userRouter");
app.use("/users", userRouter);

mongoose
  .connect(connectionString)
  .then((db) => {
    console.log("Connected to the database…");
    return db;
  })
  .catch((err) => console.log("Connection error:", err));

const checkIsAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    console.log("IN AUTH CALLBACK", {
      err,
      user,
      info,
    });
    if (err) {
      throw new Error(err.message);
    }
    if (!user) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }
    return next();
  })(req, res, next);
};
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new Strategy(options, async (payload, next) => {
    console.log("PAYLOAD", payload);
    // Since we are here, the JWT is valid!
    try {
      // Use the user's ID as the "sub" so we can look it up in the DB when a request comes in
      // (see ./jwt.js where set create the token by passing the userID and set it to the sub property)
      const user = await User.findById(payload.sub);
      if (!user) {
        return next(null, false);
      }
      return next(null, user);
    } catch (error) {
      return next(error);
    }
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const passport = require("passport");
const User = require("../models/user.model");
const { getToken } = require("../lib/jwt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    // use the helper method `authenticate` from the User model (added by passport-local-mongoose plugin)
    // will verify the password and return the user if it's correct
    user.authenticate(password, (err, user, info) => {
      console.log("IN AUTH CALLBACK", {
        err,
        user,
        info,
      });

      if (err) {
        next(err);
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // if the user is authenticated, we generate a token and send it back
      // const token = getToken(user._id, { username, });
      const token = jwt.sign(
        { sub: user._id, ...user },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      res.status(200).json({ data: { thisIsTheJWT: `Bearer ${token}` } });
    });
  } catch (error) {
    next(error);
  }
};

const handleRegister = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
      if (err) {
        next(err);
      }
      // Now that we have stored the user in the DB, we create a JWT and send it back to the client
      // Call the getToken method from the lib/jwt.js file (the one Andrew wrote for this demo)
      const token = getToken(user._id);
      // const token = jwt.sign({ sub: id, ...params }, process.env.JWT_SECRET, {
      //   expiresIn: 3600,
      // });
      res.status(201).json({ data: { thisIsTheJWT: `Bearer ${token}`, user } });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
};

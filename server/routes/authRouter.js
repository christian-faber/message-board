const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyBody = require("../middleware/verifyBody");

router.post("/login", verifyBody, authController.handleLogin);
router.post("/register", verifyBody, authController.handleRegister);

module.exports = router;

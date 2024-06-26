const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.listUsers);
router.get("/:id", userController.getUser);

module.exports = router;

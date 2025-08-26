const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/user/:id", authController.getUser); // Optional: add this route

module.exports = router;
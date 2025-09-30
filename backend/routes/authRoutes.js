const express = require("express");
const {register, login, check, logout} = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/check",authMiddleware, check);
router.post("/logout", logout);

module.exports = router;
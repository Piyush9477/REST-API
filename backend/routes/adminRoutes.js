const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {getAllUsers, getAllNotes, addUser, deleteUser, deleteNote} = require("../controllers/adminController");

router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/notes", authMiddleware, adminMiddleware, getAllNotes);
router.post("/add-user", authMiddleware, adminMiddleware, addUser);
router.delete("/delete-user/:id", authMiddleware, adminMiddleware, deleteUser);
router.delete("/delete-note/:id", authMiddleware, adminMiddleware, deleteNote);

module.exports = router;
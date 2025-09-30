const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {addNote, updateNote, deleteNote, getNotes} = require("../controllers/noteControllers");

router.post("/add", authMiddleware, addNote);
router.put("/update/:id", authMiddleware, updateNote);
router.delete("/delete/:id", authMiddleware, deleteNote);
router.get("/my-notes", authMiddleware, getNotes);

module.exports = router;
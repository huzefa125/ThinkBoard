const express = require("express");
const {createNote,deleteNote,getAllNotes,updateNote,getNoteById} = require("../controllers/notesController.js");

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/:id", getNoteById);

module.exports = router;
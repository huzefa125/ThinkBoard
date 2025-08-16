const express = require("express");
const { CreateNotes, deleteNode, getAllNotes, updateNote,getAllNotesById } = require("../controllers/notesController.js");

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", CreateNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNode);
router.get("/:id",getAllNotesById);
module.exports = router;

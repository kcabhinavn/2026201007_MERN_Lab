const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Note = require("../models/Note");

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const titleTrimmed = typeof title === "string" ? title.trim() : "";
    const contentTrimmed = typeof content === "string" ? content.trim() : "";

    if (!titleTrimmed || !contentTrimmed) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newNote = new Note({ title: titleTrimmed, content: contentTrimmed });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    console.error("[POST /api/notes] Error:", err.message);
    res.status(500).json({ message: "Server error while creating note." });
  }
});

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    console.error("[GET /api/notes] Error:", err.message);
    res.status(500).json({ message: "Server error while fetching notes." });
  }
});

// DELETE /api/notes/:id - delete a note by its MongoDB _id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid note id." });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    console.log(":id")

    res.status(200).json({ message: "Note deleted successfully.", deletedNote });
  } catch (err) {
    console.error("[DELETE /api/notes/:id] Error:", err.message);
    res.status(500).json({ message: "Server error while deleting note." });
  }
});

module.exports = router;

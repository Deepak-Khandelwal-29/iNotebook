const express = require('express')
const {authenticateUser} = require("../middleware/authenticateUser");
const {body, validationResult} = require('express-validator');

const router = express.Router()
const Notes = require('../models/Notes')
const User = require("../models/User");

router.post('/addnotes', authenticateUser, [
    body('title').notEmpty(),
    body('description').isLength({min: 5})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()});
    }
    try {
        const noteData = {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        }
        // Create a new note in the Notes model
        const newNote = new Notes(noteData);
        const savedNote = await newNote.save()

        // Associate the newly created note with the user
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        if (user) {
            user.notes.push(savedNote);
            await user.save();
            res.json({
                message: 'Note added and associated with the user successfully',
                savedNote
            });
        } else {
            res.status(403).json({message: 'User not found'});
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
})


router.get('/allnotes', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password").populate('notes')
        // console.log(user)
        if (user) {
            res.json({notes: user.notes || []});
        } else {
            res.status(403).json({message: 'User not found'});
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error"})
    }

})

router.put('/updatenotes/:noteId', authenticateUser, async (req, res) => {
    try {
        const updatedNote = {
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        }
        const note = await Notes.findByIdAndUpdate(req.params.noteId, updatedNote, {new: true});
        if (note) {
            res.json({
                message: 'Note updated successfully',
                updatedNote
            });
        } else {
            res.status(404).json({message: 'Note not found'});
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal Server Error"})
    }

});

router.delete('/deletenotes/:noteId', authenticateUser, async (req, res) => {
    try {
        const note = await Notes.findByIdAndDelete(req.params.noteId);
        if (note) {
            res.json({message: 'Note Deleted successfully'});
        } else {
            res.status(404).json({message: 'Note not found'});
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: "Internal Server Error"})
    }

});

module.exports = router
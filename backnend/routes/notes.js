const express = require('express');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note')

const router = express.Router();
const JWT_SECRECT = "iamgoodboy%";

//ROUTE 1: get allNotes with help of tokenby using : GET:api/notes/fetchallnotes - login req.
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    })

//ROUTE 2: adding notes with help of user id using : GET:api/notes/addnote - login req.
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid name').isLength({ min: 5 }),
    body('description', 'enter a valid password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let { title, description, tag } = req.body;
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savednote = await note.save();
            res.json(savednote);
        } catch (err) {
            res.status(400).send("sever error");
        }
    })

//ROUTE 3: updating notes with help of user id using : GET:api/notes/updatenote - login req.
router.put('/updatenote/:id', fetchuser,
    async (req, res) => {

        const { title, description, tag } = req.body;
        try {
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //find the note to be update and u

            let note = await Note.findById(req.params.id)
            if (!note) { return res.status(404).send("Not found") };

            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not Allowed")
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (err) {
            res.status(400).send("sever error");
        }

    })

//ROUTE 4: delete notes with of user id and object id using : DELETE:api/notes/deletenote - login req
router.delete('/deletenote/:id', fetchuser,
    async (req, res) => {

        //find the note to be deleted and delete
        try {
            let note = await Note.findById(req.params.id)
            if (!note) { return res.status(404).send("Not found") };

            if (note.user.toString() !== req.user.id) {
                return res.status(404).send("Not Allowed")
            }

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Success": "deleted", note: note });
        }
        catch (err) {
            res.status(400).send("sever error");
        }
    })
module.exports = router;
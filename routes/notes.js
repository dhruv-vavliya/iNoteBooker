
const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const Note = require('../models/Note');


// note : all mentioned activities do only after JWT verification.

// add a note
router.post('/addnote', fetchuser, async (req, res) => {
    try {
        const note = new Note({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        note.save((e) => {
            if (e) return res.json(400, { msg: e });
            res.json(200);
        });
    } catch (e) {
        res.json(400, { msg: e });
    }
})


// get all notes.
router.get('/fetchnotes', fetchuser ,(req, res) => {
    try {
        const notes = Note.find({ user: req.user.id } ,(e ,notes)=>{
            if(e) return res.json(403, { msg: e }); 
            res.json(200, notes);
        } );
    } catch (e) {
        res.json(404, { msg: e });
    }
})


// update a note.
router.put('/updatenote/:id', fetchuser, (req, res) => {
    try {
        Note.findById( req.params.id ,(e ,note)=>{
            if( e || req.user.id !== note.user.toString() ) return res.json(403, { msg: "access denied..." });

            Note.findByIdAndUpdate(req.params.id, req.body, (e, note) => {
                if (e) return res.json(404, { msg: "data not found..." });
                res.json(200);
            });
        } )
    } catch (e) {
        res.json(404, { msg: e });
    }
})


// delete a note
router.delete('/deletenote/:id', fetchuser, (req, res) => {
    try {
        Note.findById( req.params.id ,(e ,note)=>{
            if( e || req.user.id !== note.user.toString() ) return res.json(403, { msg: "access denied..." });

            Note.findByIdAndDelete(req.params.id , (e, note) => {
                if (e) return res.json(404, { msg: "data not found..." });
                res.json(200);
            })
        } )
    }
    catch (e){
        res.json(404, { msg: e });
    }
})


module.exports = router;
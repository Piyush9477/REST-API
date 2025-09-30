const Note = require("../models/Note");

const addNote = async (req, res, next) => {
    try{
        const {title, description} = req.body;
        const {_id} = req.user;
        if(!title){
            const err = new Error("Title is required");
            err.status = 400;
            throw err;
        }
        const newNote = new Note({title, description, createdBy: _id});
        await newNote.save();

        res.status(201).json({message: "Note created successfully"});
    }
    catch(err){
        next(err);
    }
}

const updateNote = async (req, res, next) => {
    try{
        const {title, description} = req.body;
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note){
            const err = new Error("Note not found");
            err.status = 404;
            throw err;
        }
        note.title = title || note.title;
        note.description = description || note.description;
        await note.save();

        res.status(200).json({message: "Note updated successfully", note: note});
    }
    catch(err){
        next(err);
    }
}

const deleteNote = async (req, res, next) => {
    try{
        const {id} = req.params;
        const note = await Note.findById(id);
        if(!note){
            const err = new Error("Note not found");
            err.status = 404;
            throw err;
        }
        await Note.findByIdAndDelete(id);

        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(err){
        next(err);
    }
}

const getNotes = async (req, res, next) => {
    try{
        const {_id} = req.user;
        const notes = await Note.find({createdBy: _id}).populate("createdBy", "name");
        if(!notes || notes.length==0){
            res.status(200).json({ message: "You have not created any notes yet"});
        }
        const formattedNotes = notes.map(note => ({
            id: note._id,
            title: note.title,
            description: note.description,
            createdBy: note.createdBy.name,
            createdAt: note.createdAt
        }));

        res.status(200).json({message: "Got your notes successfully", notes: formattedNotes});
    }
    catch(err){
        next(err);
    }
}

module.exports = {addNote, updateNote, deleteNote, getNotes};
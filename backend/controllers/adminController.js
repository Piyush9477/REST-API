const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Note = require("../models/Note");
const {JWT_SECRET} = process.env;

const getAllUsers = async (req, res, next) => {
    try{
        const {_id: userId} = req.user;
        const users = await User.find({_id: {$ne: userId}}).select("-password");
        if(!users || users.length==0){
            res.status(200).json({ message: "No users registered yet"});
        }
        const formattedUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        }));

        res.status(200).json({message: "Users list", users: formattedUsers});
    }
    catch(err){
        next(err);
    }
}

const getAllNotes = async (req, res, next) => {
    try{
        const notes = await Note.find().populate("createdBy", "name");
        if(!notes || notes.length==0){
            res.status(200).json({ message: "No notes created yet"});
        }
        const formattedNotes = notes.map(note => ({
            id: note._id,
            title: note.title,
            description: note.description,
            createdBy: note.createdBy.name,
            createdAt: note.createdAt
        }));

        res.status(200).json({message: "Notes list", notes: formattedNotes});
    }
    catch(err){
        next(err);
    }
}

const addUser = async (req, res, next) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            const err = new Error("All fields are required");
            err.status = 400;
            throw err;
        }
        let user = await User.findOne({email});
        if (user){
            const err = new Error("User already exists");
            err.status = 400;
            throw err;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({name, email, password: hashedPassword, role});
        await user.save();

        res.status(201).json({message: "User registered successfully"});
    }
    catch(err){
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const {id: userId} = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        if(!deletedUser){
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        await Note.deleteMany({createdBy: userId});

        res.status(200).json({message: "User deleted successfully"});
    }
    catch(err){
        next(err);
    }
}

const deleteNote = async (req, res, next) => {
    try{
        const {id: noteId} = req.params;
        const note = await Note.findById(noteId);
        if (!note) {
            const err = new Error("Note not found");
            err.status = 404;
            throw err;
        }
        await Note.findByIdAndDelete(noteId);

        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch(err){
        next(err);
    }
}

module.exports = {getAllUsers, getAllNotes, addUser, deleteUser, deleteNote};
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {JWT_SECRET} = process.env;

const register = async(req, res, next) => {
    try{
        const {name, email, password, role} = req.body;
        if(!name || !email || !password){
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

const login = async(req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            const err = new Error("All fields are required");
            err.status = 400;
            throw err;
        }
        const user = await User.findOne({email});
        if(!user){
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            const err = new Error("Incorrect password");
            err.status = 400;
            throw err;
        }
        const token = jwt.sign({id: user._id, role: user.role}, JWT_SECRET, {expiresIn: "1d"});
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict"
        });

        res.status(200).json({message: "Login Successful", user: {
            token: token,
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }});
    }
    catch(err){
        next(err);
    }
}

const check = (req, res, next) => {
    try{
        res.status(200).json({ user: req.user });
    }catch(err){
        next(err);
    }
}

const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict"
    });
    res.status(200).json({message: "Logged out successfully"});
}

module.exports = {register, login, check, logout};
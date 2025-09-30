const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try{
        const token  = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
            const err = new Error("No user is logged in. Authorization denied");
            err.status = 401;
            throw err;
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if(!req.user){
            const err = new Error("User not found");
            err.status = 404;
            throw err;
        }

        next();
    }catch(err){
        next(err);
    }
}

module.exports = authMiddleware;
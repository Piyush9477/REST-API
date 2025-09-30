const adminMiddleware = async (req, res, next) => {
    try{
        const role = req.user.role;
        if(role!="Admin"){
            const err = new Error("This functionality is only accessible to admin. Authorization denied");
            err.status = 401;
            throw err;
        }

        next();
    }
    catch(err){
        next(err);
    }
}

module.exports = adminMiddleware;
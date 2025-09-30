const mongoose = require("mongoose");
const {CONNECTION_URL} = process.env;

const connectMongoDb = async() => {
    try{
        await mongoose.connect(CONNECTION_URL);
        console.log("Database Connected Successfully");
    }catch(error){
        console.log("Database connection error: ", error.message);
    }
}

module.exports = connectMongoDb;
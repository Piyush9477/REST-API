const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectMongoDb = require("./init/mongodb");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

//init app
const app = express();

//Database connection
connectMongoDb();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));
app.use(morgan('dev'));

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/note", noteRoutes);
app.use("/api/v1/admin", adminRoutes);

//Error Handler
app.use(errorHandler);

module.exports = app;
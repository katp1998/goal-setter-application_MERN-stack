const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const app = express();

//connecting db
connectDB();

//to use rq/rs body data, we need to add express middleware -- you can use rq.body thanks to this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler); // this will be overriding the express default error handler

app.listen(port, () => console.log(`Server running on ${port}`));

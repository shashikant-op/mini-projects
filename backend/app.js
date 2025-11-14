const express = require("express");

const cookieparser = require("cookie-parser");
const cors = require("cors");

const UserRoutes= require("./routes/userRoutes");
const errormiddleware = require("./middleware/errormiddleware");

const app = express();
app.use(express.json());
app.use(cookieparser());
app.use(cors());

//ROUTES


app.use("/api/v1",UserRoutes);


app.use(errormiddleware);
module.exports = app;
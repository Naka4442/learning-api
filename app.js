const express = require("express");

const userRouter = require("./routes/user"); 

const app = express();

app.use("users/", userRouter);
app.get("/", (req, res) => res.end("I'm working!!!"))

app.listen(1000);
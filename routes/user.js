const { Router } = require("express");
const { all, signup } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.use("/", all);

module.exports = userRouter;
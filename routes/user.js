const { Router } = require("express");
const { all, signup } = require("../controllers/user");

const userRouter = Router();

userRouter.use("/", all);
userRouter.post("/signup", signup);

module.exports = userRouter;
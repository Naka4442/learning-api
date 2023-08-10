const { Router } = require("express");
const { all, signup, signin } = require("../controllers/user");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.use("/", all);

module.exports = userRouter;
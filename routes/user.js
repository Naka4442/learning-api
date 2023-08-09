const { Router } = require("express");
const { all } = require("../controllers/user");

const userRouter = Router();

userRouter.use("/", all);

module.exports = userRouter;
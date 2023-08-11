const { Router } = require("express");
const { me } = require("../controllers/user");

const userRouter = Router();

userRouter.use("/me", me);

module.exports = userRouter;
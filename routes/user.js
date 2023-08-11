const { Router } = require("express");
const { me } = require("../controllers/user");

const userRouter = Router();

userRouter.get("/me", me);

module.exports = userRouter;
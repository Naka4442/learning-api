import { Router } from "express";
import { isAdmin } from "../middlewares/auth";
import { me, all } from "../controllers/user";

const userRouter = Router();

userRouter.get('/me', me);
userRouter.get('/', isAdmin, all);

export default userRouter;
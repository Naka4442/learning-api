import { Router } from "express";
import { isAdmin } from "../middlewares/auth";
import { add, all } from "../controllers/course";

const courseRouter = Router();

courseRouter.post('/', isAdmin, add);
courseRouter.get('/', all);

module.exports = courseRouter;
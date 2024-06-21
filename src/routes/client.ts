import { Router } from "express";
import { add } from "../controllers/client";

const courseRouter = Router();

courseRouter.post('/', add);

export default courseRouter;
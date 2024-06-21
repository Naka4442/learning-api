import { Router } from "express";
import { add, all } from "../controllers/client";

const clientRouter = Router();

clientRouter.post('/', add);
clientRouter.get('/', all);

export default clientRouter;
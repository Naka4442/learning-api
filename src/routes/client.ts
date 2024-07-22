import { Router } from "express";
import { add, all, remove } from "../controllers/client";
import { isAdmin } from "../middlewares/auth";

const clientRouter = Router();

clientRouter.delete('/:id',isAdmin, remove);
clientRouter.post('/',isAdmin, add);
clientRouter.get('/',isAdmin, all);

export default clientRouter;
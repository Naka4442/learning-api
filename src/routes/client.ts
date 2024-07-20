import { Router } from "express";
import { add, all, remove } from "../controllers/client";
import { isAdmin } from "../middlewares/auth";

const clientRouter = Router();

clientRouter.post('/',isAdmin, add);
clientRouter.get('/',isAdmin, all);
clientRouter.delete('/:id',isAdmin, remove);

export default clientRouter;
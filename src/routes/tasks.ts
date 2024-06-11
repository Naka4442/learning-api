import { Router } from "express";
import { add, all } from "../controllers/tasks";
import { isAdmin } from "../middlewares/auth";


const router = Router();

router.post("/", isAdmin, add);
router.get("/", all);

export default router;
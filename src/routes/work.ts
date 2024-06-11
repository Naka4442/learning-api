import { Router } from "express";
import { add, one, all } from "../controllers/work";
import { isAdmin } from "../middlewares/auth";


const router = Router();

router.post("/", isAdmin, add);
router.get("/", all);
router.get("/:id", one);

export default router;
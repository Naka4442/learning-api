import { Router } from "express";
import { add, receiving, addWork, all} from "../controllers/tasks";
import { isAdmin } from "../middlewares/auth";


const router = Router();

router.post("/", isAdmin, add);
// router.get("/", receiving);
// router.post("/", addWork);
// router.get("/", all);

export default router;
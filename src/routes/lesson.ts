import { Router } from 'express';
import { isAdmin } from '../middlewares/auth';
import { getByCourse, getByIndex, add, all } from "../controllers/lesson";

const lessonRouter = Router();

lessonRouter.get('/:coursename', getByCourse);
lessonRouter.get('/:coursename/:index', getByIndex);
// lessonRouter.patch('/:coursename/:index/reaction', lesson.addReaction);
lessonRouter.post('/', isAdmin, add);
lessonRouter.get('/', all);

export default lessonRouter;
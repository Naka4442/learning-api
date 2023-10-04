const { Router } = require('express');
const { isAdmin } = require('../middlewares/auth');
const lesson = require("../controllers/lesson");

const lessonRouter = Router();

lessonRouter.get('/:coursename', lesson.getByCourse);
lessonRouter.get('/:coursename/:index', lesson.getByIndex);
lessonRouter.patch('/:coursename/:index/reaction', lesson.addReaction);
lessonRouter.post('/', isAdmin, lesson.add);
lessonRouter.get('/', lesson.all);

module.exports = lessonRouter;
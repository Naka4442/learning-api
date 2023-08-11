const { Router } = require('express');
const { isAdmin } = require('../middlewares/auth');
const { add, all, getByCourse } = require("../controllers/lesson");

const lessonRouter = Router();

lessonRouter.get('/:course', getByCourse);
lessonRouter.post('/', isAdmin, add);
lessonRouter.get('/', all);

module.exports = lessonRouter;
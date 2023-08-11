const { Router } = require('express');
const { isAdmin } = require('../middlewares/auth');
const { add, all } = require("../controllers/lesson");

const lessonRouter = Router();

lessonRouter.post('/', isAdmin, add);
lessonRouter.get('/', all);

module.exports = lessonRouter;
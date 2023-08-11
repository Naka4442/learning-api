const { Router } = require('express');
const { isAdmin } = require('../middlewares/auth');
const { add } = require("../controllers/lesson");

const lessonRouter = Router();

lessonRouter.post('/', isAdmin, add);

module.exports = lessonRouter;
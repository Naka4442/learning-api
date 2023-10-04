const { Router } = require('express');
const { isAdmin } = require('../middlewares/auth');
const { add, all } = require("../controllers/course");

const courseRouter = Router();

courseRouter.post('/', isAdmin, add);
courseRouter.get('/', all);

module.exports = courseRouter;
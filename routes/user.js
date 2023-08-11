const { Router } = require('express');
const { isAdmin } = require('../middlewares/auth');
const { me, all } = require('../controllers/user');

const userRouter = Router();

userRouter.get('/me', me);
userRouter.get('/', isAdmin, all);

module.exports = userRouter;
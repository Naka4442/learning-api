"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const user_1 = require("../controllers/user");
const userRouter = (0, express_1.Router)();
userRouter.get('/me', user_1.me);
userRouter.get('/', auth_1.isAdmin, user_1.all);
exports.default = userRouter;

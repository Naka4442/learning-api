"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const course_1 = require("../controllers/course");
const courseRouter = (0, express_1.Router)();
courseRouter.post('/', auth_1.isAdmin, course_1.add);
courseRouter.get('/', course_1.all);
exports.default = courseRouter;

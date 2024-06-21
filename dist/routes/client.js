"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../controllers/client");
const courseRouter = (0, express_1.Router)();
courseRouter.post('/', client_1.add);
exports.default = courseRouter;

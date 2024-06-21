"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../controllers/client");
const clientRouter = (0, express_1.Router)();
clientRouter.post('/', client_1.add);
clientRouter.get('/', client_1.all);
exports.default = clientRouter;

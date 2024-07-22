"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../controllers/client");
const auth_1 = require("../middlewares/auth");
const clientRouter = (0, express_1.Router)();
clientRouter.delete('/:id', auth_1.isAdmin, client_1.remove);
clientRouter.post('/', auth_1.isAdmin, client_1.add);
clientRouter.get('/', auth_1.isAdmin, client_1.all);
exports.default = clientRouter;

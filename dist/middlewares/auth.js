"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const secret = process.env.SECRET_KEY || "secret";
    try {
        const payload = (0, jsonwebtoken_1.verify)(token, secret);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Forbidden' });
    }
};
exports.auth = auth;
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    }
    else {
        res.status(403).json({ error: 'Access forbidden' });
    }
};
exports.isAdmin = isAdmin;

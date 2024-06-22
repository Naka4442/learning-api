"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.signin = exports.signup = exports.all = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const user_1 = __importDefault(require("../models/user"));
(0, dotenv_1.config)();
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    res.json({ users });
});
exports.all = all;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.status(400).json({ error: "Нет данных" });
    const { email, password, name } = req.body;
    // Проверка на существование пользователя
    const existingUser = yield user_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "Пользователь с таким email уже существует" });
    }
    // Хэширование и регистрация
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
    const user = new user_1.default({ email, password: hashedPassword, name });
    yield user.save();
    res.status(201).json({ message: "Пользователь успешно создан" });
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.status(400).json({ error: "Нет данных" });
    const { email, password } = req.body;
    // Проверка на существование пользователя
    const user = yield user_1.default.findOne({ email });
    console.log(email, password, user);
    if (!user) {
        return res.status(401).json({ error: "Неверные данные" });
    }
    // Проверка пароля
    const isPasswordValid = yield (0, bcrypt_1.compare)(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Неверные данные" });
    }
    // Создание токена
    const secret = process.env.SECRET_KEY || "secret";
    const token = (0, jsonwebtoken_1.sign)({ id: user._id, name: user.name, email, isAdmin: user.isAdmin }, secret, { expiresIn: "12h" });
    return res.status(200).json({ token });
});
exports.signin = signin;
const me = (req, res) => res.status(200).json(req.user);
exports.me = me;

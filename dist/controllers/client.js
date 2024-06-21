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
exports.all = exports.add = void 0;
const client_1 = __importDefault(require("../models/client"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, phone, from, email, datebirth, cost, description, discord, skype, telegram } = req.body;
    if (!firstname || !phone || !cost) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    const client = new client_1.default({ firstname, lastname, phone, from, email, datebirth, cost, description, discord, skype, telegram });
    yield client.save();
    return res.status(201).json(client);
});
exports.add = add;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clients = yield client_1.default.find();
    res.status(200).json(clients);
});
exports.all = all;

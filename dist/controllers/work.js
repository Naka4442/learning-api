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
exports.all = exports.one = exports.add = void 0;
const work_1 = __importDefault(require("../models/work"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, tasks } = req.body;
    if (!title || !tasks) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    const sameTask = yield work_1.default.findOne({ tasks });
    if (sameTask) {
        return res.status(400).json({ error: 'task already exists' });
    }
    const work = new work_1.default({ title, tasks });
    yield work.save();
    return res.status(201).json(work);
});
exports.add = add;
const one = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const work = yield work_1.default.findById(id);
    if (work)
        return res.status(200).json(work);
    return res.status(404).json({ error: 'work not found' });
});
exports.one = one;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const works = yield work_1.default.find();
    return res.status(200).json(works);
});
exports.all = all;

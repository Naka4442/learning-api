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
exports.all = exports.one = exports.addWork = exports.receiving = exports.add = void 0;
const task_1 = __importDefault(require("../models/task"));
const work_1 = __importDefault(require("../models/work"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, text, themes, examples } = req.body;
    const author = (req.user) ? req.user.id : null;
    if (!author)
        return res.status(403).json({ message: 'forbidden' });
    if (!name || !level || !text || !themes || !examples) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    const task = new task_1.default({ name, level, text, themes, author, examples });
    yield task.save();
    return res.status(201).json(task);
});
exports.add = add;
const receiving = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.default.find();
    res.status(200).json(tasks);
});
exports.receiving = receiving;
const addWork = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, tasks } = req.body;
    if (!name || !tasks) {
        return res.status(400).json({ error: 'missing required fields' });
    }
    const work = new work_1.default({ name, tasks });
    yield work.save();
    return res.status(201).json(work);
});
exports.addWork = addWork;
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

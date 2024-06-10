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
exports.getByIndex = exports.getByCourse = exports.all = exports.add = void 0;
const lesson_1 = __importDefault(require("../models/lesson"));
// import Reaction  from "../models/reaction";
const course_1 = __importDefault(require("../models/course"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        return res.status(400).json({ error: 'Нет данных' });
    const { index, title, coursename } = req.body;
    if (index === undefined || !title || !coursename)
        return res.status(400).json({ error: 'Нет данных' });
    const course = yield course_1.default.findOne({ title: coursename });
    if (!course)
        return res.status(404).json({ error: 'Нет такого курса' });
    const existingLesson = yield lesson_1.default.findOne({ index, title, course });
    if (existingLesson) {
        return res.status(400).json({ error: 'Данный урок уже есть' });
    }
    const lesson = new lesson_1.default({ index, title, course });
    yield lesson.save();
    return res.status(201).json({ message: 'Урок успешно создан' });
});
exports.add = add;
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lessons = yield lesson_1.default.find();
    return res.status(200).json({ lessons });
});
exports.all = all;
const getByCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.coursename.toLowerCase();
    const course = yield course_1.default.findOne({ title });
    if (!course)
        return res.status(404).json({ error: 'Нет такого курса' });
    const lessons = yield lesson_1.default.find({ course });
    res.status(200).json({ lessons });
});
exports.getByCourse = getByCourse;
const getByIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coursename, index } = req.params;
    const course = yield course_1.default.findOne({ title: coursename });
    if (!course)
        return res.status(404).json({ error: 'Нет такого курса' });
    const lesson = yield lesson_1.default.findOne({ course, index });
    if (!lesson)
        return res.status(404).json({ error: 'Нет такого урока' });
    return res.status(200).json(lesson);
});
exports.getByIndex = getByIndex;
// export const addReaction = async (req : Request, res : Response) => {
//     if(!req.user) return res.status(403).json({ error : "Forbidden" });
//     const user = req.user.id;
//     const { id, emoji } = req.body;
//     const lesson = await Lesson.findById(id);
//     if(lesson){
//         if(!lesson.reactions.find( reaction => reaction.user === user )){
//             const reaction = new Reaction({ user, emoji });
//             await reaction.save();
//             lesson.reactions.push(reaction);
//             await lesson.save();
//             return res.status(201).json({ message : 'Реакция успешно добавлена' });
//         }
//         return res.status(409).json({ error : 'Реакция уже была добавлена' });
//     }
//     return res.status(404).json({ error : 'Нет урока' });  
// }

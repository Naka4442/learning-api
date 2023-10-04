import { Request, Response } from "express";

import Lesson, { ILesson }  from "../models/lesson";
// import Reaction  from "../models/reaction";
import Course, { ICourse }  from "../models/course";

export const add = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error: 'Нет данных' });
    
    const { index, title, coursename } = req.body;
    if(index === undefined || !title || !coursename) return res.status(400).json({ error: 'Нет данных' });

    const course : ICourse | null = await Course.findOne({ title : coursename });
    if(!course) return res.status(404).json({ error : 'Нет такого курса' });

    const existingLesson : ILesson | null = await Lesson.findOne({ index, title, course });
    if(existingLesson){
        return res.status(400).json({ error: 'Данный урок уже есть' });
    }

    const lesson : ILesson = new Lesson({ index, title, course });
    await lesson.save();

    return res.status(201).json({ message : 'Урок успешно создан' });
}

export const all = async (req : Request, res : Response) => {
    const lessons : ILesson[] = await Lesson.find();
    return res.status(200).json({ lessons });
}

export const getByCourse = async (req : Request, res : Response) => {
    const title : string = req.params.coursename.toLowerCase();
    const course : ICourse | null = await Course.findOne({ title });
    if(!course) return res.status(404).json({ error : 'Нет такого курса' });
    const lessons : ILesson[] = await Lesson.find({ course });
    res.status(200).json({ lessons });
}

export const getByIndex = async (req : Request, res : Response) => {
    const { coursename, index } = req.params;
    const course : ICourse | null = await Course.findOne({ title : coursename });
    if(!course) return res.status(404).json({ error : 'Нет такого курса' });

    const lesson : ILesson | null = await Lesson.findOne({ course, index });
    if(!lesson) return res.status(404).json({ error : 'Нет такого урока' });

    return res.status(200).json(lesson);
}

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
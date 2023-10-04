import { Request, Response } from "express";
import Course, { ICourse } from "../models/course";

export const add = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error: "Нет данных" });
    
    const { title } = req.body;
    
    const courseExists : ICourse | null = await Course.findOne({ title });
    if(courseExists){
        return res.status(409).json({ error : "Данный курс уже есть" });
    }

    const course : ICourse = new Course({ title });
    await course.save();

    return res.status(201).json({ message : "Курс успешно создан" });
}

export const all = async (req : Request, res : Response) => {
    const courses : ICourse[] = await Course.find();
    res.status(200).json({ courses });
}
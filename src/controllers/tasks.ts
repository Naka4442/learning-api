import { Request, Response } from "express";
import { ObjectId } from "mongoose"

import Task, {ITask} from "../models/task";

export const add = async (req : Request, res : Response) => {
    const { name, level, text, themes, examples } = req.body;

    const author : ObjectId | null = (req.user) ? req.user.id : null;
    if(!author) return res.status(403).json({ message : 'forbidden' });

    if (!name || !level || !text || !themes || !examples) {
        return res.status(400).json({ error : 'missing required fields'});
    }
    const task : ITask | null = new Task({ name, level, text, themes, author, examples });
    await task.save();

    return res.status(201).json(task);
}

export const all = async (req : Request, res : Response) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
}
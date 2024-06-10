import { Request, Response } from "express";
import { ObjectId } from "mongoose"

import Task, {ITask} from "../models/task";
import Work, {IWork} from "../models/work";

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

export const receiving = async (req : Request, res : Response) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
}

export const addWork = async (req : Request, res : Response) => {
    const { name, tasks } = req.body;
    if (!name || !tasks) {
        return res.status(400).json({ error : 'missing required fields'});
    }
    const work : IWork | null = new Work({ name, tasks });
    await work.save();
    return res.status(201).json(work);
}

export const one = async (req : Request, res : Response) => {
    const id : string = req.params.id;
    const work : IWork | null = await Work.findById(id);
        
    if(work) return res.status(200).json(work);

    return res.status(404).json({ error : 'work not found'});
}

export const all = async (req : Request, res : Response) => {
    const works = await Work.find();
    return res.status(200).json(works);
}
import { Request, Response } from "express";

import Work, {IWork} from "../models/work";

export const add = async (req : Request, res : Response) => {
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
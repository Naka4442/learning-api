import { Request, Response } from "express";

import Client, { IClient } from "../models/client";

export const add = async (req : Request, res : Response) => {
    const { firstname, lastname, phone, from, email, datebirth, cost, description, discord, skype, telegram } = req.body;

    if (!firstname || !phone || !cost) {
        return res.status(400).json({ error : 'missing required fields'});
    }
    const client : IClient | null = new Client({ firstname, lastname, phone, from, email, datebirth, cost, description, discord, skype, telegram });
    await client.save();

    return res.status(201).json(client);
}

export const all = async (req : Request, res : Response) => {
    const clients = await Client.find();
    res.status(200).json(clients);
}

export const deleteClient = async (req : Request, res : Response) => {
    const id : string = req.params.id;
    const client : IClient | null = await Client.findByIdAndDelete(id);

    return res.status(200).json(client);
}

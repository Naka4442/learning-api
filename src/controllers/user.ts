import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

import User from "../models/user";

config();

export const all = async (req : Request, res : Response) => {
    const users  = await User.find();
    res.json({ users });
}


export const signup = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error: "Нет данных" });
    
    const { email, password, name } = req.body;
    // Проверка на существование пользователя
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ error: "Пользователь с таким email уже существует" });
    }
    // Хэширование и регистрация
    const hashedPassword = await hash(password, 10);
    const user = new User({ email, password : hashedPassword, name });
    await user.save();

    res.status(201).json({ message : "Пользователь успешно создан" });
}


export const signin = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error: "Нет данных" });

    const { email, password } = req.body;
    // Проверка на существование пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Неверные данные" });
    }
    // Проверка пароля
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Неверные данные" });
    }
    // Создание токена
    const secret = process.env.SECRET_KEY || "secret";
    const token = sign({ id: user._id, name : user.name, email, isAdmin : user.isAdmin }, secret, { expiresIn: "12h" });

    res.status(200).json({ token });
}

export const me = (req : Request, res : Response) => res.status(200).json(req.user);
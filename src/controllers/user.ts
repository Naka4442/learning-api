import { Request, Response } from "express";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

import User from "../models/user";

const all = async (req : Request, res : Response) => {
    const users  = await User.find();
    res.json({ users });
}


const signup = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error: 'Нет данных' });
    
    const { email, password, name } = req.body;
    // Проверка на существование пользователя
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }
    // Хэширование и регистрация
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password : hashedPassword, name });
    await user.save();

    res.status(201).json({ message : 'Пользователь успешно создан' });
}


const signin = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error: 'Нет данных' });

    const { email, password } = req.body;
    // Проверка на существование пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Неверные данные' });
    }
    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверные данные' });
    }
    // Создание токена
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user._id, name : user.name, email, isAdmin : user.isAdmin }, secret, { expiresIn: '12h' });

    res.status(200).json({ token });
}

const me = (req : Request, res : Response) => res.status(200).json(req.user);

module.exports = {
    all,
    signup,
    signin,
    me
}
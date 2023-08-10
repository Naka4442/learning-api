const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const all = async (req, res) => {
    const users = await User.find();
    res.json({ users });
}


const signup = async (req, res) => {
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


const signin = async (req, res) => {
    if(!req.body) return res.status(400).json({ error: 'Нет данных' });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Неверные данные' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверные данные' });
    }

    const secret = process.env.SECRET;
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '12h' });

    res.status(200).json({ token });
}

module.exports = {
    all,
    signup,
    signin
}
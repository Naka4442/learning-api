const User = require('../models/user');
const bcrypt = require('bcrypt');

const all = async (req, res) => {
    const users = await User.find();
    res.json({ users });
}

const signup = async (req, res) => {
    if(!req.body) return response.sendStatus(400);

    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    const { email, password, name } = req.body;
    const hashedPassword = bcrypt.hash(password, 10);
    const user = new User({ email, password : hashedPassword, name });
    await user.save();

    res.status(201).json({ message : 'Пользователь успешно создан' });
}

module.exports = {
    all, signup
}
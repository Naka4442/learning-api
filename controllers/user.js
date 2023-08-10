const User = require("../models/user");

const all = async (req, res) => {
    const users = await User.find();
    res.json({ users });
}

const signup = async (req, res) => {
    if(!req.body) return response.sendStatus(400);

    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();

    res.status(201).json({ message : "Пользователь успешно создан" });
}

module.exports = {
    all, signup
}
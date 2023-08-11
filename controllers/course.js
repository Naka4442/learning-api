const Course = require('../models/course');

const add = async (req, res) => {
    const { title } = req.body;
    
    const courseExists = await Course.findOne({ title });
    if(courseExists){
        return res.status(409).json({ error : 'Данный курс уже есть' });
    }

    const course = new Course({ title });
    await course.save();

    return res.status(201).json({ message : 'Курс успешно создан' });
}

const all = async (req, res) => {
    const courses = await Course.find();
    res.status(200).json({ courses });
}

module.exports = {
    add,
    all
}
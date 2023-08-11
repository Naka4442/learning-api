const Lesson = require('../models/lesson');
const Course = require('../models/course');

const add = async (req, res) => {
    const { index, title } = req.body;
    if(index === undefined || !title) return res.status(400).json({ error: 'Нет данных' });

    const existingLesson = await Lesson.findOne({ index, title });
    if(existingLesson){
        return res.status(400).json({ error: 'Данный урок уже есть' });
    }

    const lesson = new Lesson({ index, title });
    await lesson.save();

    res.status(201).json({ message : 'Урок успешно создан' });
}

const all = async (req, res) => {
    const lessons = await Lesson.find();
    res.status(200).json({ lessons });
}

const getByCourse = async (req, res) => {
    const title = req.params.course.toLowerCase();
    const course = await Course.find({ title });
    const lessons = await Lesson.find({ course });
    res.status(200).json({ lessons });
}

module.exports = {
    add,
    all,
    getByCourse
}
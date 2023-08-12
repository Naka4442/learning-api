const Lesson = require('../models/lesson');
const Course = require('../models/course');
const Reaction = require('../models/reaction');

const add = async (req, res) => {
    const { index, title, coursename } = req.body;
    const course = await Course.findOne({ title : coursename });
    console.log(coursename);
    console.log(`Попытка добавить урок в курс ${course.title}`);
    if(index === undefined || !title) return res.status(400).json({ error: 'Нет данных' });

    const existingLesson = await Lesson.findOne({ index, title, course });
    if(existingLesson){
        return res.status(400).json({ error: 'Данный урок уже есть' });
    }

    const lesson = new Lesson({ index, title, course });
    await lesson.save();

    return res.status(201).json({ message : 'Урок успешно создан' });
}

const all = async (req, res) => {
    const lessons = await Lesson.find();
    return res.status(200).json({ lessons });
}

const getByCourse = async (req, res) => {
    const title = req.params.coursename.toLowerCase();
    const course = await Course.find({ title });
    if(!course) return res.status(404).json({ error : 'Нет такого курса' });
    const lessons = await Lesson.find({ course });
    res.status(200).json({ lessons });
}

const getByIndex = async (req, res) => {
    const { coursename, index } = req.params;
    const course = await Course.find({ title : coursename });
    if(!course) return res.status(404).json({ error : 'Нет такого курса' });

    const lesson = await Lesson.findOne({ course, index });
    if(!lesson) return res.status(404).json({ error : 'Нет такого урока' });

    return res.status(200).json(lesson);
}

const addReaction = async (req, res) => {
    const user = req.user.id;
    const { id, emoji } = req.body;
    
    const lesson = await Lesson.findById(id);
    if(lesson){
        if(!lesson.reactions.find( reaction => reaction.user === user )){
            const reaction = new Reaction({ user, emoji });
            await reaction.save();
            lesson.reactions.push(reaction);
            await lesson.save();
            return res.status(201).json({ message : 'Реакция успешно добавлена' });
        }
        return res.status(409).json({ error : 'Реакция уже была добавлена' });
    }
    return res.status(404).json({ error : 'Нет урока' });  
}

module.exports = {
    add,
    all,
    getByCourse,
    addReaction,
    getByIndex
}
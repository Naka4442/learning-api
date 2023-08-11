const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Lesson = new Schema({
    index : {
        type : Number,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    reactions : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }]
})

module.exports = mongoose.model('Lesson', Lesson);
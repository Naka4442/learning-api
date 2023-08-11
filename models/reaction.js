const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reaction = new Schema({
    emoji : {
        type : String,
        required : true,
        length : 1
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Reaction', Reaction);
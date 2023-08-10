const { Schema } = require("mongoose");

const user = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("User", user);
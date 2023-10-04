import mongoose, { Schema, Document } from "mongoose";

interface ILesson extends Document {
    index : number,
    title : string,
    course : Schema.Types.ObjectId,
    reactions : Schema.Types.ObjectId[]
}

const LessonSchema = new Schema({
    index : {
        type : Number,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    course : {
        type : Schema.Types.ObjectId,
        ref : 'Course'
    },
    reactions : [{
        type : Schema.Types.ObjectId,
        ref : 'Reaction'
    }]
})

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);

export default Lesson;
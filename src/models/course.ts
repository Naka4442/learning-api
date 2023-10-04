import mongoose, { Schema, Document } from "mongoose";

interface ICourse extends Document {
    title : string
}

const CourseSchema = new Schema({
    title : {
        type : String,
        required : true
    }
});

const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
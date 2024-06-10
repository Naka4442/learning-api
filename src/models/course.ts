import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
    title : string
}

const CourseSchema = new Schema<ICourse>({
    title : {
        type : String,
        required : true
    }
});

const Course = mongoose.model<ICourse>("Course", CourseSchema);

export default Course;
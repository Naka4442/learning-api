import mongoose, { Schema, Document } from "mongoose";


export interface ITask extends Document {
    title: string,
    level: number,
    text: string,
    themes: string[],
    author: Schema.Types.ObjectId,
    examples: Array<{ input: string, output: string }>
}
const TaskSchema = new Schema<ITask>({
    title : {
        type : String, 
        minLength : 5,
        maxLength : 50,
    },
    level : {
        type : Number, 
        min : 1,
        max : 10
    },
    text : {
        type : String, 
        minLength : 10,
        maxLength : 5000,
    },
    examples : [{
        input : {
            type : String, 
            maxLength : 1000,
        },
        output : {
            type : String, 
            maxLength : 1000,
        }
    }],
    themes : [{
        type : String, 
        minLength : 5,
        maxLength : 50,
    }],
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
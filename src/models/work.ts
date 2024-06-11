import mongoose, { Schema, Document } from "mongoose";


export interface IWork extends Document {
    title: string,
    tasks: [{ type : mongoose.Types.ObjectId, ref: 'Task' }],
}
const WorkSchema = new Schema<IWork>({
    title : {
        type : String, 
        minLength : 5,
        maxLength : 100,
    },
    tasks : [{
        type : mongoose.Types.ObjectId,
        ref: 'Task'
    }]
})

const Work = mongoose.model<IWork>("Work", WorkSchema);

export default Work;
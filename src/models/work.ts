import mongoose, { Schema, Document } from "mongoose";


export interface IWork extends Document {
    name: string,
    tasks: [{ type : mongoose.Types.ObjectId, ref: 'Task' }],
}
const WorkSchema = new Schema<IWork>({
    name : {
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
import mongoose, { Schema, Document } from "mongoose";

export interface IReaction extends Document {
    emoji : string,
    user : Schema.Types.ObjectId
}
const ReactionSchema = new Schema<IReaction>({
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


const Reaction = mongoose.model<IReaction>("Reaction", ReactionSchema);

export default Reaction;
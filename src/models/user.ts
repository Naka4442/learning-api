import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email : string,
    password : string,
    name : string,
    isAdmin : boolean
}

const UserSchema = new Schema<IUser>({
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
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    }
})

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
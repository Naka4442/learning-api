import mongoose, { Schema, Document } from "mongoose";

export interface IClient extends Document {
    firstname : string,
    lastname : string, 
    phone : number,
    from: string,
    email : string,
    datebirth : Date, 
    cost: number,
    description: string,
    discord: string,
    skype : string,
    telegram : string
}

const ClientSchema = new Schema<IClient>({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
    },
    phone : {
        type : Number,
        required : true,
        maxLength : 11,
    },
    from : {
        type : String,
    },
    email : {
        type : String,
    },
    datebirth : {
        type : Date,
    },
    cost : {
        type : Number,
        required : true
    },
    description : {
        type : String,
    },
    discord : {
        type : String,
    },
    skype : {
        type : String,
    },
    telegram : {
        type : String,
    }
});

const Client = mongoose.model<IClient>("Course", ClientSchema);

export default Client;
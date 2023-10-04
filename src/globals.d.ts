import { ObjectId } from "mongoose";

declare global {
    export interface PayloadUser{
        id : ObjectId,
        name : string,
        isAdmin : boolean
      }
      
      namespace Express{
          export interface Request {
            user? : PayloadUser
          }
      }
}
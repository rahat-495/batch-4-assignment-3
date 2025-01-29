
import { model, Schema } from "mongoose";
import { TUser } from "./user.interfaces";

const userSchema = new Schema<TUser>({
    name : {
        type : String ,
        required : true ,
    },
    email : {
        type : String ,
        unique : true ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
    },
    role : {
        type : String ,
        required : true ,
        enum : [ "admin" , "user" ] ,
    },
    isBlocked : {
        type : Boolean ,
        default : false ,
    },
},{
    timestamps : true ,
})

export const usersModel = model<TUser>('User', userSchema) ;

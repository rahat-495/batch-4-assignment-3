
import { model, Schema } from "mongoose";
import bcript from "bcrypt";
import { TUser } from "./user.interfaces";
import config from "../../config";

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
        select : 0 ,
    },
    role : {
        type : String ,
        default : "user" ,
        enum : [ "admin" , "user" ] ,
    },
    isBlocked : {
        type : Boolean ,
        default : false ,
    },
},{
    timestamps : true ,
})

userSchema.pre("save" , async function(next){
    const user = this ;
    user.password = await bcript.hash(user.password , Number(config.bcryptSaltRounds)) ;
    next() ;
})

userSchema.post("save" , async function(doc , next){
    doc.password = "" ,
    next();
})

export const usersModel = model<TUser>('User', userSchema) ;

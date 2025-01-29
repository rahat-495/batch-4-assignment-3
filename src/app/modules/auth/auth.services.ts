
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { TUser } from "../user/user.interfaces"
import { usersModel } from "../user/user.model";
import { TLogin } from "./auth.interfaces";
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;

const registerUserIntoDb = async (paylaod : TUser) => {
    const isUserAlreadyAxist = await usersModel.findOne({email : paylaod.email}) ;
    if(isUserAlreadyAxist){
        throw new AppError(500 , "This user is already exist !") ;
    }
    const user = await usersModel.create(paylaod) ;
    if(user){
        const result = { _id : user?._id , name : user?.name , email : user?.email } ;
        return result ;
    }
}

const loginUser = async (payload : TLogin) => {
    const isUserAxist = await usersModel.findOne({email : payload.email}) ;
    if(!isUserAxist){
        throw new AppError(404 , "User not found !") ;
    }

    const isBlocked = isUserAxist?.isBlocked ;
    if(isBlocked){
        throw new AppError(403 , "User is blocked !") ;
    }

    const isPasswordMatched = await bcrypt.compare(payload.password , isUserAxist?.password) ;
    if(!isPasswordMatched){
        throw new AppError(401 , "Password is not matched !") ;
    }

    const jwtPayload = { email : isUserAxist?.email , role : isUserAxist?.role } ;
    const token = jwt.sign(jwtPayload , config.jwtAccessSecret as string , { expiresIn : "365d" }) ;
    return {token} ;
}

export const authServices = {
    loginUser ,
    registerUserIntoDb ,
}

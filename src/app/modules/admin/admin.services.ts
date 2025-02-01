
import AppError from "../../errors/AppErrors";
import { usersModel } from "../user/user.model";
import httpStatus from "http-status";

const blockUserIntoDb = async (id : string) => {
    const isUserAxist = await usersModel.findById(id) ;
    if(!isUserAxist){
        throw new AppError(404 , "User Not Fount !") ;
    }
    if(isUserAxist?.role === "admin"){
        throw new AppError(httpStatus.UNAUTHORIZED , "You can't block a admin !") ;
    }
    const result = await usersModel.findByIdAndUpdate(id , {isBlocked : true} , {new : true}) ;
    return result ;
}

export const adminServices = {
    blockUserIntoDb
}

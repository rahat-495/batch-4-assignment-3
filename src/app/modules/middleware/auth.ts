
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TUserRole } from "../user/user.interfaces";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status" ;
import jwt, { JwtPayload } from "jsonwebtoken" ;
import config from "../../config";
import { usersModel } from "../user/user.model";

const auth = (...requiredRoles : TUserRole[]) => {
    return catchAsync(async (req : Request , res : Response , next : NextFunction) => {
        const token = req.headers.authorization ;
        
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are not authorized !") ;
        }
        
        const decoded = jwt.verify(token as string , config.jwtAccessSecret as string) as JwtPayload ;
        const role = decoded.role ;
        const user = await usersModel.findOne({email : decoded.email}) ;

        if(!user){
            throw new AppError(404 , "The user is not found !") ;
        }

        const userStatus = user?.isBlocked ;
        if(userStatus){
            throw new AppError(400 , "The user is already blocked !") ;
        }

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(httpStatus.UNAUTHORIZED , "You are unauthorized !") ;
        }

        req.user = decoded as JwtPayload ;

        next() ;
    })
}

export default auth ;

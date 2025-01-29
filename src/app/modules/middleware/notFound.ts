
import { NextFunction, Request, Response } from "express";

const notFound = (req : Request , res : Response , next : NextFunction) : any => {
    return res.status(404).json({
        success : false ,
        message : 'API Not Found !' ,
        error : "",
    });
}

export default notFound ;
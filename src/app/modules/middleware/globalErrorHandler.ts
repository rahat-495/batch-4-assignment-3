
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../../interfaces/error";

const globalErrorHandler : ErrorRequestHandler = (err , req , res , next) : any => {
    let statusCode = err.status || 500 ;
    let message = err.message || "Some thing went wrong !" ;
    let errorSources : TErrorSources = [{ path : "" , message : "Some thing went wrong !" }] ;

    return res.status(statusCode).json({
        success : false ,
        message ,
        errorSources ,
        error : err ,
        stack : err.stack ,
    })
}

export default globalErrorHandler ;

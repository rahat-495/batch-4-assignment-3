
import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../../interfaces/error";
import { ZodError } from "zod";
import handleZodError from "../../errors/HandleZodError";
import handleValidationError from "../../errors/HandleValidationError";
import handleCastError from "../../errors/handleCastError";
import handleDuplicateError from "../../errors/handleDuplicateError";
import AppError from "../../errors/AppErrors";

const globalErrorHandler : ErrorRequestHandler = (err , req , res , next) : any => {
    let statusCode = err.status || 500 ;
    let message = err.message || "Some thing went wrong !" ;
    let errorSources : TErrorSources = [{ path : "" , message : "Some thing went wrong !" }] ;

    if(err instanceof ZodError){
        const simplifiedError = handleZodError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;
    }
    else if(err.name === "ValidationError"){
        const simplifiedError = handleValidationError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }
    else if(err.name === "CastError"){
        const simplifiedError = handleCastError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }
    else if(err.code === 11000){
        const simplifiedError = handleDuplicateError(err) ;
        statusCode = simplifiedError.statusCode ;
        message = simplifiedError.message ;
        errorSources = simplifiedError.errorSources ;    
    }
    else if(err instanceof AppError){
        statusCode = err.statusCode ;
        message = err.message ;
        errorSources = [{ path : "" , message : err.message }] ;    
    }
    else if(err instanceof Error){
        message = err.message ;
        errorSources = [{ path : "" , message : err.message }] ;    
    }

    return res.status(statusCode).json({
        success : false ,
        message ,
        statusCode ,
        error : err ,
        stack : err.stack ,
    })
}

export default globalErrorHandler ;

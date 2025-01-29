
import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interfaces/error";

const handleCastError = (err: mongoose.Error.CastError) : TGenericErrorResponse => {
    const statusCode = 400 ;
    const errorSources = [{ path : err.path , message : err.message }] ;
    return {
        statusCode ,
        message : "Invalid Id" ,
        errorSources ,
    }
}

export default handleCastError;


import config from "../../config";
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const registerUser = catchAsync(async (req , res) => {
    const result = await authServices.registerUserIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 201 , success : true , message : "User registered successfully"}) ;
    }
});

const loginUser = catchAsync(async (req , res) => {
    const result = await authServices.loginUser(req.body) ;
    res.cookie("token" , result.token , { secure : config.nodeEnv === "production" , httpOnly : true}) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 200 , success : true , message : "Login successful"}) ;
    }
});

export const authControllers = {
    loginUser ,
    registerUser ,
}

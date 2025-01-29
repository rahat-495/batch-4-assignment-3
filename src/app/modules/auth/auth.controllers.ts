
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.services";

const registerUser = catchAsync(async (req , res) => {
    const result = await authServices.registerUserIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 201 , success : true , message : "User registered successfully"}) ;
    }
});

export const authControllers = {
    registerUser ,
}

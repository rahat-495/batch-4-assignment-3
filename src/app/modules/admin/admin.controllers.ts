
import catchAsync from "../../utils/catchAsync"
import { adminServices } from "./admin.services";

const blockUser = catchAsync(async (req , res) => {
    const result = await adminServices.blockUserIntoDb(req.params.userId) ;
    if(result){
        res.status(200).json({
            success : true ,
            message : "User blocked successfully" ,
            statusCode : 200 ,
        })
    }
})

const deleteBlog = catchAsync(async (req , res) => {
    const result = await adminServices.deleteblogIntoDb(req.params.id) ;
    if(result){
        res.status(200).json({
            success : true ,
            message : "Blog deleted successfully" ,
            statusCode : 200 ,
        })
    }
})

export const adminControllers = {
    blockUser ,
    deleteBlog ,
}

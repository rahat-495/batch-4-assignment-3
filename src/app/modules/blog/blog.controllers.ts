import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.services";

const createBlog = catchAsync(async (req , res) => {
    const result = await blogServices.createBlogIntoDb(req.body , req.user) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 201 , success : true , message : "Blog created successfully"}) ;
    }
})

const updateBlog = catchAsync(async (req , res) => {
    const result = await blogServices.updateBlogFromDb(req.params.id , req.body , req.user) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 201 , success : true , message : "Blog updated successfully"}) ;
    }
})

export const blogControllers = {
    createBlog ,
    updateBlog ,
}

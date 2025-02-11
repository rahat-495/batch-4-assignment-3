import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.services";

const getAllBlogs = catchAsync(async (req , res) => {
    const result = await blogServices.getAllBlogsFromDb(req.query) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 201 , success : true , message : "Blogs fetched successfully"}) ;
    }
})

const createBlog = catchAsync(async (req , res) => {
    const result = await blogServices.createBlogIntoDb(req.body , req.user) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 201 , success : true , message : "Blog created successfully"}) ;
    }
})

const updateBlog = catchAsync(async (req , res) => {
    const result = await blogServices.updateBlogFromDb(req.params.id , req.body , req.user) ;
    if(result){
        sendResponse<object>(res , { data : result , statusCode : 200 , success : true , message : "Blog updated successfully"}) ;
    }
})

const deleteBlog = catchAsync(async (req , res) => {
    const result = await blogServices.deleteBlogFromDb(req.params.id , req.user) ;
    if(result){
        res.status(200).json({
            success : true ,
            message : "Blog deleted successfully" ,
        })
    }
})

export const blogControllers = {
    createBlog ,
    updateBlog ,
    deleteBlog ,
    getAllBlogs ,
}

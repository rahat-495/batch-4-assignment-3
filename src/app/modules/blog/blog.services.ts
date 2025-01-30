
import AppError from "../../errors/AppErrors";
import { usersModel } from "../user/user.model";
import { TBlogs } from "./blog.interfaces"
import httpStatus from "http-status";
import { blogsModel } from "./blog.model";
import { JwtPayload } from "jsonwebtoken";

const createBlogIntoDb = async (payload : TBlogs , token : JwtPayload) => {
    const isUserAxist = await usersModel.findOne({email : token?.email}) ;
    if(!isUserAxist){
        throw new AppError(httpStatus.NOT_FOUND , "User not found !") ;
    }
    payload.author = isUserAxist?._id ;
    const blog = await blogsModel.create(payload) ;
    const result = await blogsModel.findById(blog?._id).populate("author").select("-createdAt -updatedAt -__v") ;
    return result ;
}

const updateBlogFromDb = async (blogId : string , payload : TBlogs , token : JwtPayload) => {
    const isUserAxist = await usersModel.findOne({email : token?.email}) ;
    if(!isUserAxist){
        throw new AppError(httpStatus.NOT_FOUND , "User not found !") ;
    }

    const isBlogAxist = await blogsModel.findById(blogId) ;
    if(!isBlogAxist){
        throw new AppError(httpStatus.NOT_FOUND , "Blog not found !") ;
    }
    
    const result = await blogsModel.findByIdAndUpdate(blogId , payload , {new : true}).select("-createdAt -updatedAt -__v").populate("author") ;
    return result ;
}

export const blogServices = {
    createBlogIntoDb ,
    updateBlogFromDb ,
}

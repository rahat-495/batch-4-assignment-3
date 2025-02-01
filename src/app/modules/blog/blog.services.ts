
import AppError from "../../errors/AppErrors";
import { usersModel } from "../user/user.model";
import { TBlogs } from "./blog.interfaces"
import httpStatus from "http-status";
import { blogsModel } from "./blog.model";
import { JwtPayload } from "jsonwebtoken";

const getAllBlogsFromDb = async (query : Record<string , unknown>) => {
    const searchAbleFields = ['title' , 'content'] ;
    
    let search = "" ;
    if(query?.search){
        search = query.search as string ;
    }
    
    let filterId = "" ;
    if(query?.filter){
        filterId = query.filter as string ;
    }
    
    let sort = "-createdAt" ;
    if(query?.filter){
        sort = query.sortBy as string ;
    }
    
    let sortOrder = "desc" ;
    if(query?.filter){
        sortOrder = query.sortOrder as "asc" | "desc" ;
    }

    const queryConditions : any = {
        $or: searchAbleFields.map((field) => ({
            [field]: { $regex: search, $options: "i" }
        }))
    }

    if(filterId){
        queryConditions.author = filterId ;
    }

    const result = await blogsModel.find(queryConditions).populate("author").select("-createdAt -updatedAt -__v").sort({[sort] : sortOrder === "asc" ? 1 : -1}) ;
    return result ;
}

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

const deleteBlogFromDb = async (id : string) => {
    const isBlogAxist = await blogsModel.findById(id) ;
    if(!isBlogAxist){
        throw new AppError(httpStatus.NOT_FOUND , "Blog not found !") ;
    }
    const result = await blogsModel.findByIdAndDelete(id) ;
    return result ;
}

export const blogServices = {
    createBlogIntoDb ,
    updateBlogFromDb ,
    deleteBlogFromDb ,
    getAllBlogsFromDb ,
}


import { model, Schema } from "mongoose";
import { TBlogs } from "./blog.interfaces";

const blogSchema = new Schema<TBlogs>({
    title : {
        type : String ,
        required : true ,
    },
    content : {
        type : String ,
        required : true ,
    },
    author : {
        type : Schema.Types.ObjectId ,
        ref : "User" ,
    },
    isPublished : {
        type : Boolean ,
        default : false ,
        select : 0 ,
    },
},{
    timestamps : true ,
})

export const blogsModel = model<TBlogs>('blog', blogSchema) ;

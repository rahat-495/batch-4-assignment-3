
import { Router } from "express";
import auth from "../middleware/auth";
import { blogControllers } from "./blog.controllers";
import validateRequest from "../middleware/validateRequest";
import { blogValidations } from "./blog.validation";

const router = Router() ;

router.post('/' , auth("user") , validateRequest(blogValidations.createBlogValidationSchema) , blogControllers.createBlog) ;
router.patch('/:id' , auth("user") , validateRequest(blogValidations.updateBlogValidationSchema) , blogControllers.updateBlog) ;

export const blogRoutes = router ;

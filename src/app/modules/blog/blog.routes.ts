
import { Router } from "express";
import auth from "../middleware/auth";
import { blogControllers } from "./blog.controllers";

const router = Router() ;

router.post('/' , auth("user") , blogControllers.createBlog)

export const blogRoutes = router ;

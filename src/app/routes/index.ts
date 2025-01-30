
import { Router } from "express";
import { authRotues } from "../modules/auth/auth.routes";
import { blogRoutes } from "../modules/blog/blog.routes";

const router = Router() ;

const moduleRoutes = [
    {
        path : '/auth' ,
        route : authRotues ,
    },
    {
        path : '/blogs' ,
        route : blogRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router ;

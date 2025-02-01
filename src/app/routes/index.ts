
import { Router } from "express";
import { authRotues } from "../modules/auth/auth.routes";
import { blogRoutes } from "../modules/blog/blog.routes";
import { adminRoutes } from "../modules/admin/admin.routes";

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
    {
        path : '/admin' ,
        route : adminRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router ;

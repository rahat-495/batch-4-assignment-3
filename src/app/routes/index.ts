
import { Router } from "express";
import { authRotues } from "../modules/auth/auth.routes";

const router = Router() ;

const moduleRoutes = [
    {
        path : '/auth' ,
        route : authRotues ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router ;

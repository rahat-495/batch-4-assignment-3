
import { Router } from "express";
import auth from "../middleware/auth";
import { adminControllers } from "./admin.controllers";

const router = Router() ;

router.patch('/users/:userId/block' , auth("admin") , adminControllers.blockUser)
router.delete('/blogs/:id' , auth("admin") , adminControllers.deleteBlog)

export const adminRoutes = router ;


import { Router } from "express";
import { authControllers } from "./auth.controllers";
import validateRequest from "../middleware/validateRequest";
import { userValidations } from "../user/user.validations";

const router = Router() ;

router.post('/register' , validateRequest(userValidations.registerUserValidationSchema) , authControllers.registerUser) ;

export const authRotues = router ;

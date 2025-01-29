
import { Router } from "express";
import { authControllers } from "./auth.controllers";
import validateRequest from "../middleware/validateRequest";
import { userValidations } from "../user/user.validations";
import { authValidations } from "./auth.validations";

const router = Router() ;

router.post('/register' , validateRequest(userValidations.registerUserValidationSchema) , authControllers.registerUser) ;
router.post('/login' , validateRequest(authValidations.loginUserValidationSchema) , authControllers.loginUser) ;

export const authRotues = router ;

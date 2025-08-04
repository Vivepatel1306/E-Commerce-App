import express from "express"
import {registerController,loginController, hello} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router=express.Router();

//this line means when user register then regiatercontroller method get executd

router.post("/register",registerController)
router.post("/login",loginController)
router.get("/test",requireSignIn,isAdmin,hello)

export default router;
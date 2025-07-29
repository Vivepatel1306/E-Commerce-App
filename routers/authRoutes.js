import express from "express"
import {registerController} from "../controllers/authController.js"

const router=express.Router();

//this line means when user register then regiatercontroller method get executd

router.post("/register",registerController)

export default router;
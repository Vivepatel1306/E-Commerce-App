import express from "express"
import { registerController, loginController, hello, forgotPasswordController, updateProfileController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//this line means when user register then regiatercontroller method get executd

router.post("/register", registerController)
router.post("/login", loginController)
router.post("/forgot-password", forgotPasswordController)
router.get("/test", requireSignIn, isAdmin, hello)
router.get("/auth-user", requireSignIn, ((req, res) => {
    res.status(200).send({ ok: true });
}))
router.get("/admin-auth", requireSignIn,isAdmin, ((req, res) => {
    res.status(200).send({ ok: true });
}))

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router;
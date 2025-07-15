import express from "express";
import { register, login, verifyToken } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/verify", verifyToken);

export default router;

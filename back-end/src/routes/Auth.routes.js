import express from "express";
import AuthController from "../controllers/Auth.controller.js";
import AuthMiddleware from '../middlewares/Auth.middleware.js'
const router = express.Router()

router.get('/login', AuthController.loginGoogle)
router.post('/login', AuthController.login)
router.delete('/logout', AuthMiddleware, AuthController.logout)

export default router
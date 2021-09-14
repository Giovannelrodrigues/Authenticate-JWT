import express from "express";
import UserController from "../controllers/User.controller.js";
import AuthMiddleware from "../middlewares/Auth.middleware.js";
import AdminMiddleware from '../middlewares/Admin.middleware.js'
const router = express.Router()

router.post('/registers', UserController.Store)

router.use(AuthMiddleware)
router.patch('/changeroles', AdminMiddleware, UserController.changeroles)

export default router
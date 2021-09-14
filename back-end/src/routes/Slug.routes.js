import express from "express";
import AuthMiddleware from '../middlewares/Auth.middleware.js'
import AdminMiddleware from '../middlewares/Admin.middleware.js'
import SlugController from '../controllers/Slug.controller.js'
const router = express.Router()

router.get('/', SlugController.index)
router.use(AuthMiddleware)
router.use(AdminMiddleware)
router.post('/create', SlugController.store)
router.delete('/delete', SlugController.destroy)

export default router
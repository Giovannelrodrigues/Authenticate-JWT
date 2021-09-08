import express from 'express'
import multer from 'multer'
import AuthMiddleware from '../middlewares/Auth.middleware.js'
import AdminMiddleware from '../middlewares/Admin.middleware.js'
import ProductController from '../controllers/Product.controller.js'
import configMulter from '../configuration/upload.config.js'
const router = express.Router()
const upload = multer(configMulter)

router.use(AuthMiddleware)
router.use(AdminMiddleware)
router.get('/', ProductController.index)
router.post('/create', upload.any('thumbnail'), ProductController.Store)
router.delete('/delete/:id', ProductController.destroy)
router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
})
export default router
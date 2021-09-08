import express from "express";
import AuthMiddleware from '../middlewares/Auth.middleware.js'
import AdminMiddleware from '../middlewares/Admin.middleware.js'
import SlugController from '../controllers/Slug.controller.js'
const router = express.Router()


router.use(AuthMiddleware)
router.use(AdminMiddleware)
router.get('/', SlugController.index)
router.post('/create', SlugController.store)
router.delete('/delete', SlugController.destroy)

router.use((err, req, res, next) => {
    if(err){
        res.status(400).send({ error: err.message });
    }else{
        next()
    }
    
})
export default router
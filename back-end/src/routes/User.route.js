import express from "express";
import UserController from "../controllers/User.controller.js";
const router = express.Router()

router.post('/registers', UserController.Store)
router.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
})

export default router
import express from "express"
import { addProduct } from "../controllers/productControllers.js"
import authenticate from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/add-product", authenticate, addProduct)

export default router
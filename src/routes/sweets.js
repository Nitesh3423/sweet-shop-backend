import express from "express";
import { addSweet, getAllSweets, searchSweets } from "../controllers/sweetsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);

export default router;

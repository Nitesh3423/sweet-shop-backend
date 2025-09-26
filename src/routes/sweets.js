import express from "express";
import { addSweet,getAllSweets } from "../controllers/sweetsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addSweet);
router.get("/", authMiddleware, getAllSweets);

export default router;

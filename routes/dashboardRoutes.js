import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/stats", authMiddleware, dashboardController.getDashboardStats);

export default router;
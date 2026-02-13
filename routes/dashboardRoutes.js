import express from "express";
import dashboardController from "../controllers/dashboardController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/stats:
 *      get:
 *          summary: Get dashboard stats
 *          tags: [Dashboard]
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Dashboard stats
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *              500: 
 *                  description: Internal server error
 */
router.get("/stats", authMiddleware, dashboardController.getDashboardStats);

export default router;
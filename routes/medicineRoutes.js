import express from 'express';
import validate from "../middleware/validateMiddleware.js";
import { medicineSchema } from "../validation/medicineValidation.js";
const router = express.Router();
import medicineController from '../controllers/medicineController.js';  
import authMiddleware from '../middleware/authMiddleware.js';
import authorizeRoles  from '../middleware/roleMiddleware.js';

/**
 * @swagger
 * /api/medicines:
 *   post:
 *     summary: Add a new medicine
 *     description: Create a new medicine record (Admin only)
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicine'
 *           example: 
 *              name: Paracetamol
 *              manufacturer: Cipla
 *              price: 50
 *              quantity: 20
 *              expiryDate: 2026-12-31
 *              category: Tablet
 *              lowStockThreshold: 5
 *     responses:
 *       201:
 *         description: Medicine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, authorizeRoles("admin"), validate(medicineSchema), medicineController.addMedicine);

/**
 * @swagger
 * /api/medicines:
 *   get:
 *     summary: Get all medicines
 *     tags: [Medicines]
 *     responses:
 *       200:
 *         description: List of medicines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicine'
 *       500:
 *         description: Internal server error
 */
router.get("/", medicineController.getAllMedicines);

router.get("/low-stock", medicineController.getLowStockMedicines);
router.get("/expiring-soon", medicineController.getExpiringMedicines);
router.get("/pagination", medicineController.getMedicinesWithPagination);

/**
 * @swagger
 * /api/medicines/search:
 *   get:
 *     summary: Search medicines by name or category
 *     description: Returns medicines filtered by name and/or category
 *     tags: [Medicines]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *           example: Paracetamol
 *         description: Medicine name to search
 *     responses:
 *       200:
 *         description: List of matching medicines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medicine'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/search", medicineController.searchMedicine);


/**
 * @swagger
 *     /api/medicines/{id}:
 *     get:
 *          summary: Get medicine by ID
 *          tags: [Medicines]
 *          parameters:
 *              - in: path
 *                name: id
 *                required: true
 *                description: Medicine ID
 *                schema:
 *                    type: string
 *          responses:
 *              200:
 *                  description: Medicine details retrieved successfully
 *              404:
 *                  description: Medicine not found
 *              500:
 *                  description: Internal server error
 */
router.get("/:id", medicineController.getMedicineById);


/**
 * @swagger
 * /api/medicines/{id}:
 *  put:
 *     summary: Update medicine by ID
 *     tags: [Medicines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Medicine ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medicine'
 *     responses:
 *       200:
 *         description: Medicine updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authMiddleware, authorizeRoles("admin"), medicineController.updateMedicine);


/**
 * @swagger
 * /api/medicines/{id}:
 *      delete:
 *          summary: Delete medicine by ID
 *          tags: [Medicines]
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              required: true
 *              description: Medicine ID
 *              schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: Medicine deleted successfully
 *              400:
 *                  description: Validation error
 *              401:
 *                  description: Unauthorized
 *              403:
 *                  description: Forbidden - Admin only
 *              404:
 *                  description: Medicine not found
 *              500:
 *                  description: Internal server error
 */
router.delete("/:id", authMiddleware, authorizeRoles("admin"), medicineController.deleteMedicine);


export default router;

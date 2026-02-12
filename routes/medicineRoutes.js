import express from 'express';
const router = express.Router();
import medicineController from '../controllers/medicineController.js';  
import authMiddleware from '../middleware/authMiddleware.js';
import authorizeRoles  from '../middleware/roleMiddleware.js';

router.post("/", authMiddleware, authorizeRoles("admin"), medicineController.addMedicine);
router.get("/", medicineController.getAllMedicines);

router.get("/low-stock", medicineController.getLowStockMedicines);
router.get("/expiring-soon", medicineController.getExpiringMedicines);
router.get("/pagination", medicineController.getMedicinesWithPagination);
router.get("/search", medicineController.searchMedicine);


router.get("/:id", medicineController.getMedicineById);
router.put("/:id", authMiddleware, authorizeRoles("admin"), medicineController.updateMedicine);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), medicineController.deleteMedicine);


export default router;

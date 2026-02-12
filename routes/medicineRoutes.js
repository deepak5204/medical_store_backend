import express from 'express';
const router = express.Router();
import medicineController from '../controllers/medicineController.js';  
import authMiddleware from '../middleware/authMiddleware.js';

router.post("/", authMiddleware,medicineController.addMedicine);
router.get("/", medicineController.getAllMedicines);

router.get("/low-stock", medicineController.getLowStockMedicines);
router.get("/expiring-soon", medicineController.getExpiringMedicines);
router.get("/pagination", medicineController.getMedicinesWithPagination);
router.get("/search", medicineController.searchMedicine);


router.get("/:id", medicineController.getMedicineById);
router.put("/:id", medicineController.updateMedicine);
router.delete("/:id", authController, medicineController.deleteMedicine);


export default router;

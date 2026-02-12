import express from 'express';
const router = express.Router();
// const medicineController = require('../controllers/medicineController'); 
import medicineController from '../controllers/medicineController.js';  

router.post("/", medicineController.addMedicine);
router.get("/", medicineController.getAllMedicines);

router.get("/low-stock", medicineController.getLowStockMedicines);
router.get("/expiring-soon", medicineController.getExpiringMedicines);
router.get("/pagination", medicineController.getMedicinesWithPagination);
router.get("/search", medicineController.searchMedicine);


router.get("/:id", medicineController.getMedicineById);
router.put("/:id", medicineController.updateMedicine);
router.delete("/:id", medicineController.deleteMedicine);


export default router;

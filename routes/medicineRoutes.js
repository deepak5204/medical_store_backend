import express from 'express';
const router = express.Router();
// const medicineController = require('../controllers/medicineController'); 
import medicineController from '../controllers/medicineController.js';  

router.post("/", medicineController.addMedicine);
router.get("/", medicineController.getAllMedicines);
router.get("/:id", medicineController.getMedicineById);
router.put("/:id", medicineController.updateMedicine);
router.delete("/:id", medicineController.deleteMedicine);

export default router;

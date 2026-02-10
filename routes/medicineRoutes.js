import express from 'express';
const router = express.Router();
// const medicineController = require('../controllers/medicineController'); 
import medicineController from '../controllers/medicineController.js';  

router.post("/", medicineController.addMedicine);
router.get("/", medicineController.getAllMedicines);

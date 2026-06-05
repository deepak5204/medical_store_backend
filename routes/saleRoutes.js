import express from "express";
import saleController from "../controllers/saleController.js";


const router = express.Router();

router.post("/",  saleController.createSale);

// router.get("/", getSales);

// router.get("/:id", getSaleById);
export default router;
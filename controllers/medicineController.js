import e from "express";
import Medicine from "../models/Medicine.js";  


// Add Medicine
const addMedicine = async (req, res) => {
    
    try {
        let medicines;
        
        console.log("adding new medicine");
    // If array → Bulk insert
    if (Array.isArray(req.body)) {
      medicines = await Medicine.insertMany(req.body);
    } 
    // If object → Single insert
    else {
      medicines = await Medicine.create(req.body);
    }
    res.status(201).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get All Medicines
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Medicine by ID
const getMedicineById = async (req, res) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) {
            const error = new Error("Medicine not found");
            error.statusCode = 404;
            throw error;
            // return res.status(404).json({ message: "Medicine not found" });
        }
        res.json(medicine);
    }
    catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

// Update Medicine
const updateMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const medicine = await Medicine.findByIdAndUpdate(id, req.body, { new: true });
        if (!medicine) {
            const error = new Error("Medicine not found");
            error.statusCode = 404;
            throw error;
            // return res.status(404).json({ message: "Medicine not found" });
        }   
        res.json(medicine);
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

// Delete Medicine
const deleteMedicine = async (req, res) => {
    try {
        const id = req.params.id;
        const medicine = await Medicine.findByIdAndDelete(id);
        if (!medicine) {
            const error = new Error("Medicine not found");
            error.statusCode = 404;
            throw error;
            // return res.status(404).json({ message: "Medicine not found" });
        }
        res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
        
    }
}

// Smart Low Stock Query
const getLowStockMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      $expr: { $lt: ["$quantity", "$lowStockThreshold"] }
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Expiry Alert System - Get medicines expiring in next 30 days
const getExpiringMedicines = async (req, res) => {
  try {
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const medicines = await Medicine.find({
      expiryDate: {
        $gte: today,
        $lte: next30Days
      }
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Medicine
const searchMedicine = async (req, res) => {
  try {
    const keyword = req.query.name || "";    

    const medicines = await Medicine.find({
      name: { $regex: keyword, $options: "i" }
    });
    
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Pagination for Medicines
const getMedicinesWithPagination = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;

    console.log("Page number:", page);

    const limit = 3;
    const skip = (page - 1) * limit;

    const medicines = await Medicine.find()
      .skip(skip)
      .limit(limit);

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export default { addMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine, getLowStockMedicines, getExpiringMedicines, searchMedicine,
    getMedicinesWithPagination
 };
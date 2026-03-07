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


// Get All Medicines + pagination + search
const getAllMedicines = async (req, res) => {
  console.log("get all medicine")

  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const search = req.query.search || ""

    const skip = (page - 1) * limit

    const filter = {
      name: { $regex: search, $options: "i" }
    }

    const totalMedicines = await Medicine.countDocuments(filter)

    const medicines = await Medicine.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    const totalPages = Math.ceil(totalMedicines / limit)

    res.json({
      medicines,
      totalPages,
      currentPage: page
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
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
  console.log("pagination data fatched")
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalMedicines = await Medicine.countDocuments()
    const medicines = await Medicine.find()
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalMedicines / limit)

    res.json({
      medicines,
      totalPages,
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export default { addMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine, getLowStockMedicines, getExpiringMedicines, searchMedicine,
    getMedicinesWithPagination
 };
import e from "express";
import Medicine from "../models/Medicine.js";  


// Add Medicine
const addMedicine = async (req, res) => {
    console.log("adding new medicine");
    
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
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
            return res.status(404).json({ message: "Medicine not found" });
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
            return res.status(404).json({ message: "Medicine not found" });
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
            return res.status(404).json({ message: "Medicine not found" });
        }
        res.json({ message: "Medicine deleted successfully" });
    } catch (error) {
        
    }
}

export default { addMedicine, getAllMedicines, getMedicineById, updateMedicine, deleteMedicine };
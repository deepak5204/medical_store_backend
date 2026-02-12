import Medicine from "../models/Medicine.js";

const getDashboardStats = async (req, res) => {
  try {

    // Total Medicines Count
    const totalMedicines = await Medicine.countDocuments();

    // Low Stock Count
    const lowStockCount = await Medicine.countDocuments({
      $expr: { $lt: ["$quantity", "$lowStockThreshold"] }
    });

    // Expiring Soon (Next 30 Days)
    const today = new Date();
    const next30Days = new Date();
    next30Days.setDate(today.getDate() + 30);

    const expiringSoonCount = await Medicine.countDocuments({
      expiryDate: { $gte: today, $lte: next30Days }
    });

    // Total Inventory Value
    const inventoryValueResult = await Medicine.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } }
        }
      }
    ]);

    const totalInventoryValue =
      inventoryValueResult.length > 0
        ? inventoryValueResult[0].totalValue
        : 0;

    res.json({
      totalMedicines,
      lowStockCount,
      expiringSoonCount,
      totalInventoryValue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getDashboardStats };

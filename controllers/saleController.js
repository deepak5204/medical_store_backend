import Sale from "../models/Sale.js";
import Medicine from "../models/Medicine.js";

const createSale = async (req, res) => {
    console.log("Creating sale with data:");
    try {
         const { items } = req.body;

         if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Sale must contain at least one item"
            });
        }

          const saleItems = [];
        let totalAmount = 0;

        for(const item of items) {
            const medicine = await Medicine.findById(item.medicineId);

            if (!medicine) {
                return res.status(404).json({
                    message: `Medicine not found: ${item.medicineId}`
                });
            }

            if (medicine.quantity < item.quantity) {
                return res.status(400).json({
                    message: `${medicine.name} has insufficient stock`
                });
            }

             const subtotal = medicine.price * item.quantity;

             saleItems.push({
                medicineId: medicine._id,
                medicineName: medicine.name,
                quantity: item.quantity,
                price: medicine.price,
                subtotal
            });

            totalAmount += subtotal;

              // Reduce stock
            medicine.quantity -= item.quantity;
            await medicine.save();
        }

         const sale = await Sale.create({
            items: saleItems,
            totalAmount
        });

          return res.status(201).json({
            message: "Sale created successfully",
            sale
        });


    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export default {
    createSale
};
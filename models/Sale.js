const mongoose = require("mongoose");

const saleItemSchema = new mongoose.Schema({
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true
    },

    medicineName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    },

    price: {
        type: Number,
        required: true
    },

    subtotal: {
        type: Number,
        required: true
    }

}, { _id: false });

const saleSchema = new mongoose.Schema({

    items: {
        type: [saleItemSchema],
        required: true,
        validate: {
            validator: items => items.length > 0,
            message: "Sale must contain at least one item"
        }
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Sale", saleSchema);
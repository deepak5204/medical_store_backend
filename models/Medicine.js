import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String
  },
  price: {
    type: Number,
    // required: true
  },
  quantity: {
    type: Number,
    // required: true,
    default: 0
  },
  expiryDate: {
    type: Date
  },
  category: {
    type: String
  },
  lowStockThreshold: {
  type: Number,
  default: 5
}

}, { timestamps: true });

const Medicine = mongoose.model("Medicine", medicineSchema);
export default Medicine;
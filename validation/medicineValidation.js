import Joi from "joi";

// Add / Update Medicine Validation
export const medicineSchema = Joi.object({
  name: Joi.string().required(),
  manufacturer: Joi.string().optional(),
  price: Joi.number().required(),
  quantity: Joi.number().min(0).required(),
  expiryDate: Joi.date().optional(),
  category: Joi.string().optional(),
  lowStockThreshold: Joi.number().min(0).optional()
});

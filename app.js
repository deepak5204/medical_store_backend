import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import db from './config/db.js';
import medicineRoutes from "./routes/medicineRoutes.js";
const app = express();
const PORT = process.env.PORT || 3000;
import authRoutes from "./routes/authRoutes.js";


// Connect to MongoDB
db()

// middle for parse request body( form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/medicines", medicineRoutes);
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        return;
    }
    console.log(`Medical store server is running on port ${PORT}`);
});
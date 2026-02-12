import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "staff"],
        default: "staff"
    }
},
    { timestamps: true })

const User = mongoose.model('User', userSchema);
export default User;
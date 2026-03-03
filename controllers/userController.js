import User from "../models/User.js";

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

export default { getAllUsers };
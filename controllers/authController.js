import User from "../models/User.js"; 
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js"

// Register a new user
const register = async (req, res) => {
     try {
        const { name, email, password } = req.body;

     const hashedPassword = await bcrypt.hash(password, 10);

     const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
}

// Login user and generate token
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export default { register, login };

